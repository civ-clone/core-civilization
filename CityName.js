"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityName = void 0;
class CityName {
    constructor(name, CivilizationType, capital = false) {
        this._capital = false;
        this._name = name;
        this._civilization = CivilizationType;
        this._capital = capital;
    }
    name() {
        return this._name;
    }
    civilization() {
        return this._civilization;
    }
    capital() {
        return this._capital;
    }
}
exports.CityName = CityName;
exports.default = CityName;
//# sourceMappingURL=CityName.js.map