import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import { IConstructor } from '@civ-clone/core-registry/Registry';
import Leader from './Leader';
import Trait from './Trait';

export interface ITraitRegistry extends IEntityRegistry<Trait> {
  getByLeader(LeaderType: typeof Leader): Trait[];
}

export class TraitRegistry
  extends EntityRegistry<Trait>
  implements ITraitRegistry {
  constructor() {
    super(Trait);
  }

  getByLeader(LeaderType: IConstructor<Leader>): Trait[] {
    return this.getBy('leader', LeaderType);
  }
}

export const instance: TraitRegistry = new TraitRegistry();

export default TraitRegistry;
