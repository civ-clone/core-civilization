import { IConstructor } from '@civ-clone/core-registry/Registry';
import {
  ConstructorRegistry,
  IConstructorRegistry,
} from '@civ-clone/core-registry/ConstructorRegistry';
import Civilization from './Civilization';
import Leader from './Leader';
export interface ILeaderRegistry extends IConstructorRegistry<Leader> {
  getByCivilization(
    LeaderCivilization: IConstructor<Civilization>
  ): IConstructor<Leader>[];
}
export declare class LeaderRegistry
  extends ConstructorRegistry<Leader>
  implements ILeaderRegistry {
  constructor();
  getByCivilization(
    LeaderCivilization: IConstructor<Civilization>
  ): IConstructor<Leader>[];
}
export declare const instance: LeaderRegistry;
export default LeaderRegistry;
