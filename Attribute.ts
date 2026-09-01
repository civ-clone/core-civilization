import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import Civilization from './Civilization';

export interface IAttribute extends IDataObject {
  civilization(): typeof Civilization;
  name(): string;
  value(): any;
}

export class Attribute extends DataObject implements IAttribute {
  private _civilization: typeof Civilization;
  private _name: string;
  private _value: any;

  constructor(CivilizationType: typeof Civilization, name: string, value: any) {
    super();

    this._civilization = CivilizationType;
    this._name = name;
    this._value = value;

    this.addKey('name', 'value');
  }

  civilization(): typeof Civilization {
    return this._civilization;
  }

  name(): string {
    return this._name;
  }

  value(): any {
    return this._value;
  }
}

export default Attribute;
