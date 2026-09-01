import Yield from '@civ-clone/core-yield/Yield';
import Leader from './Leader';
export declare class Trait extends Yield {
  private _leader;
  constructor(LeaderType: typeof Leader, value: number);
  leader(): typeof Leader;
}
export default Trait;
