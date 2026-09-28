import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import CityName from './CityName';
import Civilization from './Civilization';
import { instance as rngInstance } from '@civ-clone/core-random';

export interface ICityNameRegistry extends IEntityRegistry<CityName> {
  takeByCivilization(CivilizationType: typeof Civilization): string;
  takeCapitalByCivilization(CivilizationType: typeof Civilization): string;
}

export class CityNameRegistry
  extends EntityRegistry<CityName>
  implements ICityNameRegistry
{
  private _counter: number = 1;
  private _randomNumberGenerator: () => number;

  constructor(randomNumberGenerator: () => number = rngInstance) {
    super(CityName);

    this._randomNumberGenerator = randomNumberGenerator;
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
