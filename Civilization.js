"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Civilization_leader, _Civilization_cityNamesRegistry, _Civilization_attributes;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Civilization = void 0;
const AttributeRegistry_1 = require("./AttributeRegistry");
const CityNameRegistry_1 = require("./CityNameRegistry");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class Civilization extends DataObject_1.DataObject {
    constructor(attributeRegistry = AttributeRegistry_1.instance, cityNamesRegistry = CityNameRegistry_1.instance) {
        super();
        _Civilization_leader.set(this, null);
        _Civilization_cityNamesRegistry.set(this, void 0);
        _Civilization_attributes.set(this, new AttributeRegistry_1.AttributeRegistry());
        __classPrivateFieldSet(this, _Civilization_cityNamesRegistry, cityNamesRegistry, "f");
        __classPrivateFieldGet(this, _Civilization_attributes, "f").register(...attributeRegistry.getByCivilization(this.sourceClass()));
        this.addKey('name', 'leader', 'attributes');
    }
    attributes() {
        return __classPrivateFieldGet(this, _Civilization_attributes, "f").entries();
    }
    name() {
        return this.constructor.name;
    }
    leader() {
        return __classPrivateFieldGet(this, _Civilization_leader, "f");
    }
    setLeader(leader) {
        __classPrivateFieldSet(this, _Civilization_leader, leader, "f");
    }
    getCityName(capital = false) {
        const CivilizationType = this.sourceClass();
        return capital
            ? __classPrivateFieldGet(this, _Civilization_cityNamesRegistry, "f").takeCapitalByCivilization(CivilizationType)
            : __classPrivateFieldGet(this, _Civilization_cityNamesRegistry, "f").takeByCivilization(CivilizationType);
    }
}
exports.Civilization = Civilization;
_Civilization_leader = new WeakMap(), _Civilization_cityNamesRegistry = new WeakMap(), _Civilization_attributes = new WeakMap();
exports.default = Civilization;
//# sourceMappingURL=Civilization.js.map