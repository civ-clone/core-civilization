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
export declare class AttributeRegistry
  extends EntityRegistry<Attribute>
  implements IAttributeRegistry
{
  constructor();
  getByCivilization(CivilizationType: typeof Civilization): Attribute[];
  getByName(name: string): Attribute[];
}
export declare const instance: AttributeRegistry;
export default AttributeRegistry;
