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
export declare class TraitRegistry
  extends EntityRegistry<Trait>
  implements ITraitRegistry
{
  constructor();
  getByLeader(LeaderType: typeof Leader): Trait[];
  getBySubclass(TraitType: typeof Trait): Trait[];
}
export declare const instance: TraitRegistry;
export default TraitRegistry;
