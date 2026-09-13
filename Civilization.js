"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Civilization = void 0;
const AttributeRegistry_1 = require("./AttributeRegistry");
const CityNameRegistry_1 = require("./CityNameRegistry");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class Civilization extends DataObject_1.DataObject {
    constructor(attributeRegistry = AttributeRegistry_1.instance, cityNamesRegistry = CityNameRegistry_1.instance) {
        super();
        this._leader = null;
        this._attributes = new AttributeRegistry_1.AttributeRegistry();
        this._cityNamesRegistry = cityNamesRegistry;
        this._attributes.register(...attributeRegistry.getByCivilization(this.sourceClass()));
        this.addKey('name', 'leader', 'attributes');
    }
    attributes() {
        return this._attributes.entries();
    }
    name() {
        return this.constructor.name;
    }
    leader() {
        return this._leader;
    }
    setLeader(leader) {
        this._leader = leader;
    }
    getCityName(capital = false) {
        const CivilizationType = this.sourceClass();
        return capital
            ? this._cityNamesRegistry.takeCapitalByCivilization(CivilizationType)
            : this._cityNamesRegistry.takeByCivilization(CivilizationType);
    }
}
exports.Civilization = Civilization;
Civilization.transient = ['_cityNamesRegistry', '_attributes'];
exports.default = Civilization;
//# sourceMappingURL=Civilization.js.map