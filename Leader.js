"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Leader_traits;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leader = void 0;
const TraitRegistry_1 = require("./TraitRegistry");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class Leader extends DataObject_1.DataObject {
    constructor(traitRegistry = TraitRegistry_1.instance) {
        super();
        _Leader_traits.set(this, []);
        const traits = traitRegistry.getByLeader(this.sourceClass());
        __classPrivateFieldGet(this, _Leader_traits, "f").push(...traits);
        this.addKey('name');
    }
    static civilization() {
        throw new TypeError('Must be implemented in extending class');
    }
    name() {
        throw new TypeError('Must be implemented in extending class');
    }
    traits() {
        return [...__classPrivateFieldGet(this, _Leader_traits, "f")];
    }
}
exports.Leader = Leader;
_Leader_traits = new WeakMap();
exports.default = Leader;
//# sourceMappingURL=Leader.js.map