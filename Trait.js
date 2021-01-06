"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _leader;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trait = void 0;
const Yield_1 = require("@civ-clone/core-yield/Yield");
class Trait extends Yield_1.default {
    constructor(LeaderType, value) {
        super(value);
        _leader.set(this, void 0);
        __classPrivateFieldSet(this, _leader, LeaderType);
    }
    leader() {
        return __classPrivateFieldGet(this, _leader);
    }
}
exports.Trait = Trait;
_leader = new WeakMap();
exports.default = Trait;
//# sourceMappingURL=Trait.js.map