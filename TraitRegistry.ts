import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Leader from './Leader';
import Trait from './Trait';

export interface ITraitRegistry extends IEntityRegistry<Trait> {
  getByLeader(LeaderType: typeof Leader): Trait[];
  getBySubclass(TraitType: typeof Trait): Trait[];
}

export class TraitRegistry
  extends EntityRegistry<Trait>
  implements ITraitRegistry
{
  constructor() {
    super(Trait);
  }

  getByLeader(LeaderType: typeof Leader): Trait[] {
    return this.getBy('leader', LeaderType);
  }

  getBySubclass(TraitType: typeof Trait): Trait[] {
    return this.filter((trait): boolean => trait instanceof TraitType);
  }
}

export const instance: TraitRegistry = new TraitRegistry();

export default TraitRegistry;
