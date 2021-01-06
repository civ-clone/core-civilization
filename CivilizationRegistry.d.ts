import {
  ConstructorRegistry,
  IConstructorRegistry,
} from '@civ-clone/core-registry/ConstructorRegistry';
import Civilization from './Civilization';
export interface ICivilizationRegistry
  extends IConstructorRegistry<Civilization> {}
export declare class CivilizationRegistry
  extends ConstructorRegistry<Civilization>
  implements ICivilizationRegistry {
  constructor();
}
export declare const instance: CivilizationRegistry;
export default CivilizationRegistry;
