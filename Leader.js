"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _traits;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leader = void 0;
const TraitRegistry_1 = require("./TraitRegistry");
class Leader {
    constructor(traitRegistry = TraitRegistry_1.instance) {
        _traits.set(this, []);
        const traits = traitRegistry.getByLeader(this.constructor);
        __classPrivateFieldGet(this, _traits).push(...traits);
    }
    static civilization() {
        throw new TypeError('Must be implemented in extending class');
    }
    name() {
        throw new TypeError('Must be implemented in extending class');
    }
    traits() {
        return [...__classPrivateFieldGet(this, _traits)];
    }
}
exports.Leader = Leader;
_traits = new WeakMap();
exports.default = Leader;
//# sourceMappingURL=Leader.js.map