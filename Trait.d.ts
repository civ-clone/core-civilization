import Yield from '@civ-clone/core-yield/Yield';
import Leader from './Leader';
export declare class Trait extends Yield {
  #private;
  constructor(LeaderType: typeof Leader, value: number);
  leader(): typeof Leader;
}
export default Trait;
