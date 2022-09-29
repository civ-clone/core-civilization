import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import CityName from './CityName';
import Civilization from './Civilization';

export interface ICityNameRegistry extends IEntityRegistry<CityName> {
  takeByCivilization(CivilizationType: typeof Civilization): string;
  takeCapitalByCivilization(CivilizationType: typeof Civilization): string;
}

export class CityNameRegistry
  extends EntityRegistry<CityName>
  implements ICityNameRegistry
{
  #counter: number = 1;
  #randomNumberGenerator: () => number;

  constructor(
    randomNumberGenerator: () => number = (): number => Math.random()
  ) {
    super(CityName);

    this.#randomNumberGenerator = randomNumberGenerator;
  }

  takeByCivilization(CivilizationType: typeof Civilization): string {
    const [cityName] = this.getBy('civilization', CivilizationType).sort(
      (): number => Math.floor(this.#randomNumberGenerator() * 3) - 1
    );

    if (cityName instanceof CityName) {
      this.unregister(cityName);

      return cityName.name();
    }

    return this.takeUnassociated();
  }

  takeCapitalByCivilization(CivilizationType: typeof Civilization): string {
    const [capitalName] = this.getBy('civilization', CivilizationType)
      .sort((): number => Math.floor(this.#randomNumberGenerator() * 3) - 1)
      .filter((cityName: CityName): boolean => cityName.capital());

    if (capitalName instanceof CityName) {
      this.unregister(capitalName);

      return capitalName.name();
    }

    return this.takeByCivilization(CivilizationType);
  }

  private takeUnassociated(): string {
    const [cityName] = this.getBy('civilization', null).sort(
      (): number => Math.floor(this.#randomNumberGenerator() * 3) - 1
    );

    if (cityName instanceof CityName) {
      this.unregister(cityName);

      return cityName.name();
    }

    return `City #${this.#counter++}`;
  }
}

export const instance: CityNameRegistry = new CityNameRegistry();

export default CityNameRegistry;
