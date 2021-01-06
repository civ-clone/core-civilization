import Civilization from './Civilization';
import Trait from './Trait';
import { TraitRegistry } from './TraitRegistry';
export interface ILeader {
  name(): string;
  traits(): Trait[];
}
export declare class Leader implements ILeader {
  #private;
  constructor(traitRegistry?: TraitRegistry);
  static civilization(): typeof Civilization;
  name(): string;
  traits(): Trait[];
}
export default Leader;
