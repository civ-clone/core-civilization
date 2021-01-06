"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.LeaderRegistry = void 0;
const ConstructorRegistry_1 = require("@civ-clone/core-registry/ConstructorRegistry");
const Leader_1 = require("./Leader");
class LeaderRegistry extends ConstructorRegistry_1.ConstructorRegistry {
    constructor() {
        super(Leader_1.default);
    }
    getByCivilization(LeaderCivilization) {
        // @ts-ignore
        return this.getBy('civilization', LeaderCivilization);
    }
}
exports.LeaderRegistry = LeaderRegistry;
exports.instance = new LeaderRegistry();
exports.default = LeaderRegistry;
//# sourceMappingURL=LeaderRegistry.js.map