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
import { IConstructor } from '@civ-clone/core-registry/Registry';
import Leader from './Leader';
import Attribute from './Attribute';

export interface ICivilization extends IDataObject {
  attributes(): any[];
  name(): string;
  leader(): Leader | null;
  setLeader(leader: Leader): void;
  getCityName(capital: boolean): string;
}

export class Civilization extends DataObject implements ICivilization {
  #leader: Leader | null = null;
  #cityNamesRegistry: CityNameRegistry;
  #attributes = new AttributeRegistry();

  constructor(
    attributeRegistry: AttributeRegistry = attributeRegistryInstance,
    cityNamesRegistry: CityNameRegistry = cityNameRegistryInstance
  ) {
    super();

    this.#cityNamesRegistry = cityNamesRegistry;

    this.#attributes.register(
      ...attributeRegistry.getByCivilization(
        <IConstructor<Civilization>>this.constructor
      )
    );

    this.addKey('name', 'leader', 'attributes');
  }

  attributes(): Attribute[] {
    return this.#attributes.entries();
  }

  name(): string {
    return this.constructor.name;
  }

  leader(): Leader | null {
    return this.#leader;
  }

  setLeader(leader: Leader): void {
    this.#leader = leader;
  }

  getCityName(capital: boolean = false): string {
    const CivilizationType = <typeof Civilization>this.constructor;

    return capital
      ? this.#cityNamesRegistry.takeCapitalByCivilization(CivilizationType)
      : this.#cityNamesRegistry.takeByCivilization(CivilizationType);
  }
}

export default Civilization;
