import Civilization from './Civilization';

export interface ICityName {
  name(): string;
  civilization(): typeof Civilization | null;
}

export class CityName implements ICityName {
  private _name: string;
  private _civilization: typeof Civilization | null;
  private _capital: boolean = false;

  constructor(
    name: string,
    CivilizationType: typeof Civilization | null,
    capital: boolean = false
  ) {
    this._name = name;
    this._civilization = CivilizationType;
    this._capital = capital;
  }

  name(): string {
    return this._name;
  }

  civilization(): typeof Civilization | null {
    return this._civilization;
  }

  capital(): boolean {
    return this._capital;
  }
}

export default CityName;
