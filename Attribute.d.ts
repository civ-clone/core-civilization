import Civilization from './Civilization';
import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
export interface IAttribute extends IDataObject {
  civilization(): typeof Civilization;
  name(): string;
  value(): any;
}
export declare class Attribute extends DataObject implements IAttribute {
  #private;
  constructor(CivilizationType: typeof Civilization, name: string, value: any);
  civilization(): typeof Civilization;
  name(): string;
  value(): any;
}
export default Attribute;
