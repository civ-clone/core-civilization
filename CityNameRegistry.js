"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.CityNameRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const CityName_1 = require("./CityName");
const core_random_1 = require("@civ-clone/core-random");
/**
 * A pool of names: each one is handed out once, and leaves the pool.
 *
 * Plugin imports fill the pool, so it is a definition registry and a save does
 * not carry it. A save carries `taken()` and `counter()` instead, and
 * `restore()` replays them over a freshly filled pool, so a loaded game cannot
 * hand out a name the saved game already used (civ-clone/web-renderer#120).
 */
class CityNameRegistry extends EntityRegistry_1.EntityRegistry {
    constructor(randomNumberGenerator = core_random_1.instance) {
        super(CityName_1.default);
        this._counter = 1;
        this._taken = [];
        this._randomNumberGenerator = randomNumberGenerator;
    }
    /** The next number for a `City #n` name, once every pool is empty. */
    counter() {
        return this._counter;
    }
    /**
     * Take the recorded names out of the pool again, and resume the counter.
     *
     * A record matches on its name *and* its civilization, because names repeat
     * between civilizations; failing that, the same name in the unassociated
     * pool. This replaces what has been taken rather than adding to it, and it
     * keeps a record that matches nothing (a pool this game has already drawn
     * from, or a name a plugin no longer registers), so saving again writes the
     * same list.
     */
    restore(taken, counter) {
        this._taken = taken.map((record) => {
            const [registered] = [
                ...this.getBy('civilization', record.civilization()),
                ...this.getBy('civilization', null),
            ].filter((cityName) => cityName.name() === record.name());
            if (!registered) {
                return record;
            }
            this.unregister(registered);
            return registered;
        });
        this._counter = counter;
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
    /** Every name handed out so far, in the order it was taken. */
    taken() {
        return [...this._taken];
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
        this._taken.push(cityName);
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