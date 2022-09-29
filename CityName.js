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
var _CityName_name, _CityName_civilization, _CityName_capital;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityName = void 0;
class CityName {
    constructor(name, CivilizationType, capital = false) {
        _CityName_name.set(this, void 0);
        _CityName_civilization.set(this, void 0);
        _CityName_capital.set(this, false);
        __classPrivateFieldSet(this, _CityName_name, name, "f");
        __classPrivateFieldSet(this, _CityName_civilization, CivilizationType, "f");
        __classPrivateFieldSet(this, _CityName_capital, capital, "f");
    }
    name() {
        return __classPrivateFieldGet(this, _CityName_name, "f");
    }
    civilization() {
        return __classPrivateFieldGet(this, _CityName_civilization, "f");
    }
    capital() {
        return __classPrivateFieldGet(this, _CityName_capital, "f");
    }
}
exports.CityName = CityName;
_CityName_name = new WeakMap(), _CityName_civilization = new WeakMap(), _CityName_capital = new WeakMap();
exports.default = CityName;
//# sourceMappingURL=CityName.js.map