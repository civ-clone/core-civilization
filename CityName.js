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
var _name, _civilization, _capital;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityName = void 0;
class CityName {
    constructor(name, CivilizationType, capital = false) {
        _name.set(this, void 0);
        _civilization.set(this, void 0);
        _capital.set(this, false);
        __classPrivateFieldSet(this, _name, name);
        __classPrivateFieldSet(this, _civilization, CivilizationType);
        __classPrivateFieldSet(this, _capital, capital);
    }
    name() {
        return __classPrivateFieldGet(this, _name);
    }
    civilization() {
        return __classPrivateFieldGet(this, _civilization);
    }
    capital() {
        return __classPrivateFieldGet(this, _capital);
    }
}
exports.CityName = CityName;
_name = new WeakMap(), _civilization = new WeakMap(), _capital = new WeakMap();
exports.default = CityName;
//# sourceMappingURL=CityName.js.map