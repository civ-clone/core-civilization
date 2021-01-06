import {
  ConstructorRegistry,
  IConstructorRegistry,
} from '@civ-clone/core-registry/ConstructorRegistry';
import Civilization from './Civilization';

export interface ICivilizationRegistry
  extends IConstructorRegistry<Civilization> {}

export class CivilizationRegistry
  extends ConstructorRegistry<Civilization>
  implements ICivilizationRegistry {
  constructor() {
    super(Civilization);
  }
}

export const instance: CivilizationRegistry = new CivilizationRegistry();

export default CivilizationRegistry;
