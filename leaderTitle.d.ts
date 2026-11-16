import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Leader from './Leader';
/**
 * What `leader` is called under `government`: the first `LeaderTitle` rule's answer that isn't empty, or `undefined`
 *  when none gives one, which is always the case with no `LeaderTitle` rules. An empty title is no title.
 */
export declare const leaderTitle: (
  leader: Leader,
  government: DataObject,
  ruleRegistry?: RuleRegistry
) => string | undefined;
export default leaderTitle;
