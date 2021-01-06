import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Attribute from './Attribute';
import Civilization from './Civilization';

export interface IAttributeRegistry extends IEntityRegistry<Attribute> {
  getByCivilization(CivilizationType: typeof Civilization): Attribute[];
  getByName(name: string): Attribute[];
}

export class AttributeRegistry
  extends EntityRegistry<Attribute>
  implements IAttributeRegistry {
  constructor() {
    super(Attribute);
  }

  getByCivilization(CivilizationType: typeof Civilization): Attribute[] {
    return this.getBy('civilization', CivilizationType);
  }

  getByName(name: string): Attribute[] {
    return this.getBy('name', name);
  }
}

export const instance: AttributeRegistry = new AttributeRegistry();

export default AttributeRegistry;
