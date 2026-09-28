"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.CityNameRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const CityName_1 = require("./CityName");
const core_random_1 = require("@civ-clone/core-random");
class CityNameRegistry extends EntityRegistry_1.EntityRegistry {
    constructor(randomNumberGenerator = core_random_1.instance) {
        super(CityName_1.default);
        this._counter = 1;
        this._randomNumberGenerator = randomNumberGenerator;
    }
    takeByCivilization(CivilizationType) {
        const cityName = this.pick(this.getBy('civilization', CivilizationType).filter((cityName) => !cityName.capital()));
        if (cityName) {
            return this.take(cityName);
        }
        return this.takeUnassociated();
    }
    takeCapitalByCivilization(CivilizationType) {
        const capitalName = this.pick(this.getBy('civilization', CivilizationType).filter((cityName) => cityName.capital()));
        if (capitalName) {
            return this.take(capitalName);
        }
        return this.takeByCivilization(CivilizationType);
    }
    /**
     * One draw per pick, whatever the size of the pool. Shuffling with a random
     * comparator made a number of draws that depended on the pool size, so a
     * pool that differed at all sent the whole random stream somewhere else,
     * and the pick was not uniform either.
     */
    pick(cityNames) {
        if (cityNames.length === 0) {
            return null;
        }
        return cityNames[Math.floor(this._randomNumberGenerator() * cityNames.length)];
    }
    take(cityName) {
        this.unregister(cityName);
        return cityName.name();
    }
    takeUnassociated() {
        const cityName = this.pick(this.getBy('civilization', null));
        if (cityName) {
            return this.take(cityName);
        }
        return `City #${this._counter++}`;
    }
}
exports.CityNameRegistry = CityNameRegistry;
exports.instance = new CityNameRegistry();
exports.default = CityNameRegistry;
//# sourceMappingURL=CityNameRegistry.js.map