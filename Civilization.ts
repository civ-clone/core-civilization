import {
  AttributeRegistry,
  instance as attributeRegistryInstance,
} from './AttributeRegistry';
import {
  CityNameRegistry,
  instance as cityNameRegistryInstance,
} from './CityNameRegistry';
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

export class Civilization extends DataObject implements ICivilization {
  private _leader: Leader | null = null;
  private _cityNamesRegistry: CityNameRegistry;
  private _attributes = new AttributeRegistry();

  constructor(
    attributeRegistry: AttributeRegistry = attributeRegistryInstance,
    cityNamesRegistry: CityNameRegistry = cityNameRegistryInstance
  ) {
    super();

    this._cityNamesRegistry = cityNamesRegistry;

    this._attributes.register(
      ...attributeRegistry.getByCivilization(this.sourceClass())
    );

    this.addKey('name', 'leader', 'attributes');
  }

  attributes(): Attribute[] {
    return this._attributes.entries();
  }

  name(): string {
    return this.constructor.name;
  }

  leader(): Leader | null {
    return this._leader;
  }

  setLeader(leader: Leader): void {
    this._leader = leader;
  }

  getCityName(capital: boolean = false): string {
    const CivilizationType = this.sourceClass<typeof Civilization>();

    return capital
      ? this._cityNamesRegistry.takeCapitalByCivilization(CivilizationType)
      : this._cityNamesRegistry.takeByCivilization(CivilizationType);
  }
}

export default Civilization;
