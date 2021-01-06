"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.AttributeRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const Attribute_1 = require("./Attribute");
class AttributeRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(Attribute_1.default);
    }
    getByCivilization(CivilizationType) {
        return this.getBy('civilization', CivilizationType);
    }
    getByName(name) {
        return this.getBy('name', name);
    }
}
exports.AttributeRegistry = AttributeRegistry;
exports.instance = new AttributeRegistry();
exports.default = AttributeRegistry;
//# sourceMappingURL=AttributeRegistry.js.map