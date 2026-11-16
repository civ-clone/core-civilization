import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Leader from './Leader';
/**
 * What `leader` is called under `government`: the first `LeaderTitle` rule's answer, or `undefined` when none gives
 *  one, which is always the case with no `LeaderTitle` rules.
 */
export declare const leaderTitle: (
  leader: Leader,
  government: DataObject,
  ruleRegistry?: RuleRegistry
) => string | undefined;
export default leaderTitle;
