"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderTitle = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const LeaderTitle_1 = require("./Rules/LeaderTitle");
/**
 * What `leader` is called under `government`: the first `LeaderTitle` rule's answer that isn't empty, or `undefined`
 *  when none gives one, which is always the case with no `LeaderTitle` rules. An empty title is no title.
 */
const leaderTitle = (leader, government, ruleRegistry = RuleRegistry_1.instance) => ruleRegistry
    .process(LeaderTitle_1.default, leader, government)
    .find((title) => typeof title === 'string' && title !== '');
exports.leaderTitle = leaderTitle;
exports.default = exports.leaderTitle;
//# sourceMappingURL=leaderTitle.js.map