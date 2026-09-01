"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class Attribute extends DataObject_1.DataObject {
    constructor(CivilizationType, name, value) {
        super();
        this._civilization = CivilizationType;
        this._name = name;
        this._value = value;
        this.addKey('name', 'value');
    }
    civilization() {
        return this._civilization;
    }
    name() {
        return this._name;
    }
    value() {
        return this._value;
    }
}
exports.Attribute = Attribute;
exports.default = Attribute;
//# sourceMappingURL=Attribute.js.map