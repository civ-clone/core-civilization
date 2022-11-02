"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.TraitRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const Trait_1 = require("./Trait");
class TraitRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(Trait_1.default);
    }
    getByLeader(LeaderType) {
        return this.getBy('leader', LeaderType);
    }
    getBySubclass(TraitType) {
        return this.filter((trait) => trait instanceof TraitType);
    }
}
exports.TraitRegistry = TraitRegistry;
exports.instance = new TraitRegistry();
exports.default = TraitRegistry;
//# sourceMappingURL=TraitRegistry.js.map