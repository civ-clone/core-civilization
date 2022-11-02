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
      ...attributeRegistry.getByCivilization(this.sourceClass())
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
    const CivilizationType = this.sourceClass<typeof Civilization>();

    return capital
      ? this.#cityNamesRegistry.takeCapitalByCivilization(CivilizationType)
      : this.#cityNamesRegistry.takeByCivilization(CivilizationType);
  }
}

export default Civilization;
