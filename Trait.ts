import Yield from '@civ-clone/core-yield/Yield';
import Leader from './Leader';

export class Trait extends Yield {
  private _leader: typeof Leader;

  constructor(LeaderType: typeof Leader, value: number) {
    super(value);

    this._leader = LeaderType;
  }

  leader(): typeof Leader {
    return this._leader;
  }
}

export default Trait;
