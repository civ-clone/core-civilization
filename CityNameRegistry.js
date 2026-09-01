"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.CityNameRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const CityName_1 = require("./CityName");
class CityNameRegistry extends EntityRegistry_1.EntityRegistry {
    constructor(randomNumberGenerator = () => Math.random()) {
        super(CityName_1.default);
        this._counter = 1;
        this._randomNumberGenerator = randomNumberGenerator;
    }
    takeByCivilization(CivilizationType) {
        const [cityName] = this.getBy('civilization', CivilizationType).sort(() => Math.floor(this._randomNumberGenerator() * 3) - 1);
        if (cityName instanceof CityName_1.default) {
            this.unregister(cityName);
            return cityName.name();
        }
        return this.takeUnassociated();
    }
    takeCapitalByCivilization(CivilizationType) {
        const [capitalName] = this.getBy('civilization', CivilizationType)
            .sort(() => Math.floor(this._randomNumberGenerator() * 3) - 1)
            .filter((cityName) => cityName.capital());
        if (capitalName instanceof CityName_1.default) {
            this.unregister(capitalName);
            return capitalName.name();
        }
        return this.takeByCivilization(CivilizationType);
    }
    takeUnassociated() {
        const [cityName] = this.getBy('civilization', null).sort(() => Math.floor(this._randomNumberGenerator() * 3) - 1);
        if (cityName instanceof CityName_1.default) {
            this.unregister(cityName);
            return cityName.name();
        }
        return `City #${this._counter++}`;
    }
}
exports.CityNameRegistry = CityNameRegistry;
exports.instance = new CityNameRegistry();
exports.default = CityNameRegistry;
//# sourceMappingURL=CityNameRegistry.js.map