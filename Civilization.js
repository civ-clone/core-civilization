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
var _leader, _cityNamesRegistry, _attributes;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Civilization = void 0;
const AttributeRegistry_1 = require("./AttributeRegistry");
const CityNameRegistry_1 = require("./CityNameRegistry");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class Civilization extends DataObject_1.DataObject {
    constructor(attributeRegistry = AttributeRegistry_1.instance, cityNamesRegistry = CityNameRegistry_1.instance) {
        super();
        _leader.set(this, null);
        _cityNamesRegistry.set(this, void 0);
        _attributes.set(this, new AttributeRegistry_1.AttributeRegistry());
        __classPrivateFieldSet(this, _cityNamesRegistry, cityNamesRegistry);
        __classPrivateFieldGet(this, _attributes).register(...attributeRegistry.getByCivilization(this.constructor));
        this.addKey('name', 'leader', 'attributes');
    }
    attributes() {
        return __classPrivateFieldGet(this, _attributes).entries();
    }
    name() {
        return this.constructor.name;
    }
    leader() {
        return __classPrivateFieldGet(this, _leader);
    }
    setLeader(leader) {
        __classPrivateFieldSet(this, _leader, leader);
    }
    getCityName(capital = false) {
        const CivilizationType = this.constructor;
        return capital
            ? __classPrivateFieldGet(this, _cityNamesRegistry).takeCapitalByCivilization(CivilizationType)
            : __classPrivateFieldGet(this, _cityNamesRegistry).takeByCivilization(CivilizationType);
    }
}
exports.Civilization = Civilization;
_leader = new WeakMap(), _cityNamesRegistry = new WeakMap(), _attributes = new WeakMap();
exports.default = Civilization;
//# sourceMappingURL=Civilization.js.map