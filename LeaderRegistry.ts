import { IConstructor } from '@civ-clone/core-registry/Registry';
import {
  ConstructorRegistry,
  IConstructorRegistry,
} from '@civ-clone/core-registry/ConstructorRegistry';
import Civilization from './Civilization';
import Leader from './Leader';

// TODO: don't use ts-ignore :(

export interface ILeaderRegistry extends IConstructorRegistry<Leader> {
  getByCivilization(
    LeaderCivilization: IConstructor<Civilization>
  ): IConstructor<Leader>[];
}

export class LeaderRegistry
  extends ConstructorRegistry<Leader>
  implements ILeaderRegistry
{
  constructor() {
    super(Leader);
  }

  getByCivilization(
    LeaderCivilization: IConstructor<Civilization>
  ): IConstructor<Leader>[] {
    // @ts-ignore
    return this.getBy('civilization', LeaderCivilization);
  }
}

export const instance: LeaderRegistry = new LeaderRegistry();

export default LeaderRegistry;
