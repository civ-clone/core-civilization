"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trait = void 0;
const Yield_1 = require("@civ-clone/core-yield/Yield");
class Trait extends Yield_1.default {
    constructor(LeaderType, value) {
        super(value);
        this._leader = LeaderType;
    }
    leader() {
        return this._leader;
    }
}
exports.Trait = Trait;
exports.default = Trait;
//# sourceMappingURL=Trait.js.map