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
var _counter, _randomNumberGenerator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.CityNameRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const CityName_1 = require("./CityName");
class CityNameRegistry extends EntityRegistry_1.EntityRegistry {
    constructor(randomNumberGenerator = () => Math.random()) {
        super(CityName_1.default);
        _counter.set(this, 1);
        _randomNumberGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _randomNumberGenerator, randomNumberGenerator);
    }
    takeByCivilization(CivilizationType) {
        const [cityName] = this.getBy('civilization', CivilizationType).sort(() => Math.floor(__classPrivateFieldGet(this, _randomNumberGenerator).call(this) * 3) - 1);
        if (cityName instanceof CityName_1.default) {
            this.unregister(cityName);
            return cityName.name();
        }
        return this.takeUnassociated();
    }
    takeCapitalByCivilization(CivilizationType) {
        const [capitalName] = this.getBy('civilization', CivilizationType)
            .sort(() => Math.floor(__classPrivateFieldGet(this, _randomNumberGenerator).call(this) * 3) - 1)
            .filter((cityName) => cityName.capital());
        if (capitalName instanceof CityName_1.default) {
            this.unregister(capitalName);
            return capitalName.name();
        }
        return this.takeByCivilization(CivilizationType);
    }
    takeUnassociated() {
        var _a;
        const [cityName] = this.getBy('civilization', null).sort(() => Math.floor(__classPrivateFieldGet(this, _randomNumberGenerator).call(this) * 3) - 1);
        if (cityName instanceof CityName_1.default) {
            this.unregister(cityName);
            return cityName.name();
        }
        return `City #${__classPrivateFieldSet(this, _counter, (_a = +__classPrivateFieldGet(this, _counter)) + 1), _a}`;
    }
}
exports.CityNameRegistry = CityNameRegistry;
_counter = new WeakMap(), _randomNumberGenerator = new WeakMap();
exports.instance = new CityNameRegistry();
exports.default = CityNameRegistry;
//# sourceMappingURL=CityNameRegistry.js.map