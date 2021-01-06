import Yield from '@civ-clone/core-yield/Yield';
import Leader from './Leader';

export class Trait extends Yield {
  #leader: typeof Leader;

  constructor(LeaderType: typeof Leader, value: number) {
    super(value);

    this.#leader = LeaderType;
  }

  leader(): typeof Leader {
    return this.#leader;
  }
}

export default Trait;
