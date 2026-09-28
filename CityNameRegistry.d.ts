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
export declare class CityNameRegistry
  extends EntityRegistry<CityName>
  implements ICityNameRegistry
{
  private _counter;
  private _randomNumberGenerator;
  constructor(randomNumberGenerator?: () => number);
  takeByCivilization(CivilizationType: typeof Civilization): string;
  takeCapitalByCivilization(CivilizationType: typeof Civilization): string;
  /**
   * One draw per pick, whatever the size of the pool. Shuffling with a random
   * comparator made a number of draws that depended on the pool size, so a
   * pool that differed at all sent the whole random stream somewhere else,
   * and the pick was not uniform either.
   */
  private pick;
  private take;
  private takeUnassociated;
}
export declare const instance: CityNameRegistry;
export default CityNameRegistry;
