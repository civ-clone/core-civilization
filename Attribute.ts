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

export class Attribute extends DataObject implements IAttribute {
  #civilization: typeof Civilization;
  #name: string;
  #value: any;

  constructor(CivilizationType: typeof Civilization, name: string, value: any) {
    super();

    this.#civilization = CivilizationType;
    this.#name = name;
    this.#value = value;

    this.addKey('name', 'value');
  }

  civilization(): typeof Civilization {
    return this.#civilization;
  }

  name(): string {
    return this.#name;
  }

  value(): any {
    return this.#value;
  }
}

export default Attribute;
