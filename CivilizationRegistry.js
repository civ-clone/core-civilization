"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.CivilizationRegistry = void 0;
const ConstructorRegistry_1 = require("@civ-clone/core-registry/ConstructorRegistry");
const Civilization_1 = require("./Civilization");
class CivilizationRegistry extends ConstructorRegistry_1.ConstructorRegistry {
    constructor() {
        super(Civilization_1.default);
    }
}
exports.CivilizationRegistry = CivilizationRegistry;
exports.instance = new CivilizationRegistry();
exports.default = CivilizationRegistry;
//# sourceMappingURL=CivilizationRegistry.js.map