import { AttributeRegistry } from './AttributeRegistry';
import { CityNameRegistry } from './CityNameRegistry';
import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import Attribute from './Attribute';
import Leader from './Leader';
export interface ICivilization extends IDataObject {
  attributes(): any[];
  name(): string;
  leader(): Leader | null;
  setLeader(leader: Leader): void;
  getCityName(capital: boolean): string;
}
export declare class Civilization extends DataObject implements ICivilization {
  #private;
  constructor(
    attributeRegistry?: AttributeRegistry,
    cityNamesRegistry?: CityNameRegistry
  );
  attributes(): Attribute[];
  name(): string;
  leader(): Leader | null;
  setLeader(leader: Leader): void;
  getCityName(capital?: boolean): string;
}
export default Civilization;
