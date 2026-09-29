import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import CityName from './CityName';
import Civilization from './Civilization';
import { instance as rngInstance } from '@civ-clone/core-random';

export interface ICityNameRegistry extends IEntityRegistry<CityName> {
  counter(): number;
  restore(taken: CityName[], counter: number): void;
  takeByCivilization(CivilizationType: typeof Civilization): string;
  takeCapitalByCivilization(CivilizationType: typeof Civilization): string;
  taken(): CityName[];
}

/**
 * A pool of names: each one is handed out once, and leaves the pool.
 *
 * Plugin imports fill the pool, so it is a definition registry and a save does
 * not carry it. A save carries `taken()` and `counter()` instead, and
 * `restore()` replays them over a freshly filled pool, so a loaded game cannot
 * hand out a name the saved game already used (civ-clone/web-renderer#120).
 */
export class CityNameRegistry
  extends EntityRegistry<CityName>
  implements ICityNameRegistry
{
  private _counter: number = 1;
  private _randomNumberGenerator: () => number;
  private _taken: CityName[] = [];

  constructor(randomNumberGenerator: () => number = rngInstance) {
    super(CityName);

    this._randomNumberGenerator = randomNumberGenerator;
  }

  /** The next number for a `City #n` name, once every pool is empty. */
  counter(): number {
    return this._counter;
  }

  /**
   * Take the recorded names out of the pool again, and resume the counter.
   *
   * A record matches on its name *and* its civilization, because names repeat
   * between civilizations; failing that, the same name in the unassociated
   * pool. A record this registry has already taken is left alone, so
   * restoring into a pool that has been drawn from, or restoring twice, never
   * takes a second name out. This replaces what has been taken rather than
   * adding to it, keeping each record as given (a record that matches nothing,
   * a name a plugin no longer registers, included) so saving again writes the
   * same list. Names taken before and missing from `taken` are not returned
   * to the pool.
   */
  restore(taken: CityName[], counter: number): void {
    const previous = [...this._taken];
    const matches =
      (record: CityName) =>
      (cityName: CityName): boolean =>
        cityName.name() === record.name() &&
        cityName.civilization() === record.civilization();

    this._taken = taken.map((record: CityName): CityName => {
      const index = previous.findIndex(matches(record));

      if (index !== -1) {
        previous.splice(index, 1);

        return record;
      }

      const [registered] = [
        ...this.getBy('civilization', record.civilization()),
        ...this.getBy('civilization', null),
      ].filter(
        (cityName: CityName): boolean => cityName.name() === record.name()
      );

      if (registered) {
        this.unregister(registered);
      }

      return record;
    });

    this._counter = counter;
  }

  takeByCivilization(CivilizationType: typeof Civilization): string {
    const cityName = this.pick(
      this.getBy('civilization', CivilizationType).filter(
        (cityName: CityName): boolean => !cityName.capital()
      )
    );

    if (cityName) {
      return this.take(cityName);
    }

    return this.takeUnassociated();
  }

  takeCapitalByCivilization(CivilizationType: typeof Civilization): string {
    const capitalName = this.pick(
      this.getBy('civilization', CivilizationType).filter(
        (cityName: CityName): boolean => cityName.capital()
      )
    );

    if (capitalName) {
      return this.take(capitalName);
    }

    return this.takeByCivilization(CivilizationType);
  }

  /** Every name handed out so far, in the order it was taken. */
  taken(): CityName[] {
    return [...this._taken];
  }

  /**
   * One draw per pick, whatever the size of the pool. Shuffling with a random
   * comparator made a number of draws that depended on the pool size, so a
   * pool that differed at all sent the whole random stream somewhere else,
   * and the pick was not uniform either.
   */
  private pick(cityNames: CityName[]): CityName | null {
    if (cityNames.length === 0) {
      return null;
    }

    return cityNames[
      Math.floor(this._randomNumberGenerator() * cityNames.length)
    ];
  }

  private take(cityName: CityName): string {
    this.unregister(cityName);
    this._taken.push(cityName);

    return cityName.name();
  }

  private takeUnassociated(): string {
    const cityName = this.pick(this.getBy('civilization', null));

    if (cityName) {
      return this.take(cityName);
    }

    return `City #${this._counter++}`;
  }
}

export const instance: CityNameRegistry = new CityNameRegistry();

export default CityNameRegistry;
