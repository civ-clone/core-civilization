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
  #private;
  constructor(randomNumberGenerator?: () => number);
  takeByCivilization(CivilizationType: typeof Civilization): string;
  takeCapitalByCivilization(CivilizationType: typeof Civilization): string;
  private takeUnassociated;
}
export declare const instance: CityNameRegistry;
export default CityNameRegistry;
