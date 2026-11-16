import DataObject from '@civ-clone/core-data-object/DataObject';
import Leader from '../Leader';
import Rule from '@civ-clone/core-rule/Rule';
/**
 * What `leader` is called under `government`, or `undefined` for no title. The government is any object here: this
 *  package can't depend on `core-government`, which depends on it through `core-player`.
 */
export declare class LeaderTitle extends Rule<
  [leader: Leader, government: DataObject],
  string | undefined
> {}
export default LeaderTitle;
