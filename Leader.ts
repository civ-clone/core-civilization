import Civilization from './Civilization';
import Trait from './Trait';
import {
  TraitRegistry,
  instance as traitRegistryInstance,
} from './TraitRegistry';
import { IConstructor } from '@civ-clone/core-registry/Registry';
import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';

export interface ILeader extends IDataObject {
  name(): string;
  traits(): Trait[];
}

export class Leader extends DataObject implements ILeader {
  #traits: Trait[] = [];

  constructor(traitRegistry: TraitRegistry = traitRegistryInstance) {
    super();

    const traits = traitRegistry.getByLeader(
      <IConstructor<Leader>>this.constructor
    );

    this.#traits.push(...traits);

    this.addKey('name');
  }

  static civilization(): typeof Civilization {
    throw new TypeError('Must be implemented in extending class');
  }

  name(): string {
    throw new TypeError('Must be implemented in extending class');
  }

  traits(): Trait[] {
    return [...this.#traits];
  }
}

export default Leader;
