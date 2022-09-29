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
var _Attribute_civilization, _Attribute_name, _Attribute_value;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class Attribute extends DataObject_1.DataObject {
    constructor(CivilizationType, name, value) {
        super();
        _Attribute_civilization.set(this, void 0);
        _Attribute_name.set(this, void 0);
        _Attribute_value.set(this, void 0);
        __classPrivateFieldSet(this, _Attribute_civilization, CivilizationType, "f");
        __classPrivateFieldSet(this, _Attribute_name, name, "f");
        __classPrivateFieldSet(this, _Attribute_value, value, "f");
        this.addKey('name', 'value');
    }
    civilization() {
        return __classPrivateFieldGet(this, _Attribute_civilization, "f");
    }
    name() {
        return __classPrivateFieldGet(this, _Attribute_name, "f");
    }
    value() {
        return __classPrivateFieldGet(this, _Attribute_value, "f");
    }
}
exports.Attribute = Attribute;
_Attribute_civilization = new WeakMap(), _Attribute_name = new WeakMap(), _Attribute_value = new WeakMap();
exports.default = Attribute;
//# sourceMappingURL=Attribute.js.map