"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leader = void 0;
const TraitRegistry_1 = require("./TraitRegistry");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class Leader extends DataObject_1.DataObject {
    constructor(traitRegistry = TraitRegistry_1.instance) {
        super();
        this._traits = [];
        const traits = traitRegistry.getByLeader(this.sourceClass());
        this._traits.push(...traits);
        this.addKey('name');
    }
    static civilization() {
        throw new TypeError('Must be implemented in extending class');
    }
    name() {
        throw new TypeError('Must be implemented in extending class');
    }
    traits() {
        return [...this._traits];
    }
}
exports.Leader = Leader;
exports.default = Leader;
//# sourceMappingURL=Leader.js.map