import Civilization from './Civilization';

export interface ICityName {
  name(): string;
  civilization(): typeof Civilization | null;
}

export class CityName implements ICityName {
  #name: string;
  #civilization: typeof Civilization | null;
  #capital: boolean = false;

  constructor(
    name: string,
    CivilizationType: typeof Civilization | null,
    capital: boolean = false
  ) {
    this.#name = name;
    this.#civilization = CivilizationType;
    this.#capital = capital;
  }

  name(): string {
    return this.#name;
  }

  civilization(): typeof Civilization | null {
    return this.#civilization;
  }

  capital(): boolean {
    return this.#capital;
  }
}

export default CityName;
