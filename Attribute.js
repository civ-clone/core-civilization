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
var _civilization, _name, _value;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class Attribute extends DataObject_1.DataObject {
    constructor(CivilizationType, name, value) {
        super();
        _civilization.set(this, void 0);
        _name.set(this, void 0);
        _value.set(this, void 0);
        __classPrivateFieldSet(this, _civilization, CivilizationType);
        __classPrivateFieldSet(this, _name, name);
        __classPrivateFieldSet(this, _value, value);
        this.addKey('name', 'value');
    }
    civilization() {
        return __classPrivateFieldGet(this, _civilization);
    }
    name() {
        return __classPrivateFieldGet(this, _name);
    }
    value() {
        return __classPrivateFieldGet(this, _value);
    }
}
exports.Attribute = Attribute;
_civilization = new WeakMap(), _name = new WeakMap(), _value = new WeakMap();
exports.default = Attribute;
//# sourceMappingURL=Attribute.js.map