import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Leader from './Leader';
import LeaderTitle from './Rules/LeaderTitle';

/**
 * What `leader` is called under `government`: the first `LeaderTitle` rule's answer, or `undefined` when none gives
 *  one, which is always the case with no `LeaderTitle` rules.
 */
export const leaderTitle = (
  leader: Leader,
  government: DataObject,
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): string | undefined =>
  ruleRegistry
    .process(LeaderTitle, leader, government)
    .find(
      (title: string | undefined | void): title is string =>
        typeof title === 'string'
    );

export default leaderTitle;
