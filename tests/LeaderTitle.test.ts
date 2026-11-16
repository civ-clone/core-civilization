import Criterion from '@civ-clone/core-rule/Criterion';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Effect from '@civ-clone/core-rule/Effect';
import Leader from '../Leader';
import LeaderTitle from '../Rules/LeaderTitle';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import TraitRegistry from '../TraitRegistry';
import { expect } from 'chai';
import leaderTitle from '../leaderTitle';

class Ruler extends Leader {
  name(): string {
    return 'Ruler';
  }
}

class Despotism extends DataObject {}
class Republic extends DataObject {}

describe('leaderTitle', (): void => {
  const leader = new Ruler(new TraitRegistry());

  it('has no title with no `LeaderTitle` rules, and the name is unchanged', (): void => {
    expect(leaderTitle(leader, new Despotism(), new RuleRegistry())).to.equal(
      undefined
    );
    expect(leader.name()).to.equal('Ruler');
  });

  it('answers the first title the rules give for the government', (): void => {
    const ruleRegistry = new RuleRegistry();

    ruleRegistry.register(
      new LeaderTitle(
        new Criterion((leader, government) => government instanceof Republic),
        new Effect(() => 'title.consul')
      ),
      new LeaderTitle(new Effect(() => undefined)),
      new LeaderTitle(new Effect(() => 'title.chief'))
    );

    expect(leaderTitle(leader, new Republic(), ruleRegistry)).to.equal(
      'title.consul'
    );
    expect(leaderTitle(leader, new Despotism(), ruleRegistry)).to.equal(
      'title.chief'
    );
  });

  it('takes an empty title as no title', (): void => {
    const ruleRegistry = new RuleRegistry();

    ruleRegistry.register(new LeaderTitle(new Effect(() => '')));

    expect(leaderTitle(leader, new Despotism(), ruleRegistry)).to.equal(
      undefined
    );

    ruleRegistry.register(new LeaderTitle(new Effect(() => 'title.chief')));

    expect(leaderTitle(leader, new Despotism(), ruleRegistry)).to.equal(
      'title.chief'
    );
  });
});
