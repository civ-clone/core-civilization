import Civilization from './Civilization';
export interface ICityName {
  name(): string;
  civilization(): typeof Civilization | null;
}
export declare class CityName implements ICityName {
  #private;
  constructor(
    name: string,
    CivilizationType: typeof Civilization | null,
    capital?: boolean
  );
  name(): string;
  civilization(): typeof Civilization | null;
  capital(): boolean;
}
export default CityName;
