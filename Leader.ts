import Civilization from './Civilization';
import Trait from './Trait';
import {
  TraitRegistry,
  instance as traitRegistryInstance,
} from './TraitRegistry';
import { IConstructor } from '@civ-clone/core-registry/Registry';

export interface ILeader {
  name(): string;
  traits(): Trait[];
}

export class Leader implements ILeader {
  #traits: Trait[] = [];

  constructor(traitRegistry: TraitRegistry = traitRegistryInstance) {
    const traits = traitRegistry.getByLeader(
      <IConstructor<Leader>>this.constructor
    );

    this.#traits.push(...traits);
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
