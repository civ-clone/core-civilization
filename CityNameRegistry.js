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
var _CityNameRegistry_counter, _CityNameRegistry_randomNumberGenerator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.CityNameRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const CityName_1 = require("./CityName");
class CityNameRegistry extends EntityRegistry_1.EntityRegistry {
    constructor(randomNumberGenerator = () => Math.random()) {
        super(CityName_1.default);
        _CityNameRegistry_counter.set(this, 1);
        _CityNameRegistry_randomNumberGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _CityNameRegistry_randomNumberGenerator, randomNumberGenerator, "f");
    }
    takeByCivilization(CivilizationType) {
        const [cityName] = this.getBy('civilization', CivilizationType).sort(() => Math.floor(__classPrivateFieldGet(this, _CityNameRegistry_randomNumberGenerator, "f").call(this) * 3) - 1);
        if (cityName instanceof CityName_1.default) {
            this.unregister(cityName);
            return cityName.name();
        }
        return this.takeUnassociated();
    }
    takeCapitalByCivilization(CivilizationType) {
        const [capitalName] = this.getBy('civilization', CivilizationType)
            .sort(() => Math.floor(__classPrivateFieldGet(this, _CityNameRegistry_randomNumberGenerator, "f").call(this) * 3) - 1)
            .filter((cityName) => cityName.capital());
        if (capitalName instanceof CityName_1.default) {
            this.unregister(capitalName);
            return capitalName.name();
        }
        return this.takeByCivilization(CivilizationType);
    }
    takeUnassociated() {
        var _a, _b;
        const [cityName] = this.getBy('civilization', null).sort(() => Math.floor(__classPrivateFieldGet(this, _CityNameRegistry_randomNumberGenerator, "f").call(this) * 3) - 1);
        if (cityName instanceof CityName_1.default) {
            this.unregister(cityName);
            return cityName.name();
        }
        return `City #${__classPrivateFieldSet(this, _CityNameRegistry_counter, (_b = __classPrivateFieldGet(this, _CityNameRegistry_counter, "f"), _a = _b++, _b), "f"), _a}`;
    }
}
exports.CityNameRegistry = CityNameRegistry;
_CityNameRegistry_counter = new WeakMap(), _CityNameRegistry_randomNumberGenerator = new WeakMap();
exports.instance = new CityNameRegistry();
exports.default = CityNameRegistry;
//# sourceMappingURL=CityNameRegistry.js.map