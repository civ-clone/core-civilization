import Civilization from './Civilization';
import Trait from './Trait';
import { TraitRegistry } from './TraitRegistry';
import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
export interface ILeader extends IDataObject {
  name(): string;
  traits(): Trait[];
}
export declare class Leader extends DataObject implements ILeader {
  #private;
  constructor(traitRegistry?: TraitRegistry);
  static civilization(): typeof Civilization;
  name(): string;
  traits(): Trait[];
}
export default Leader;
