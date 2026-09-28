import CityName from '../CityName';
import CityNameRegistry from '../CityNameRegistry';
import Civilization from '../Civilization';
import { expect } from 'chai';

class Greek extends Civilization {}
class English extends Civilization {}

/** A generator that counts its draws, walking a fixed sequence. */
const counting = (
  values: number[] = [0.5]
): { rng: () => number; calls: () => number } => {
  let calls = 0;

  return {
    rng: (): number => values[calls++ % values.length],
    calls: (): number => calls,
  };
};

const pool = (rng: () => number): CityNameRegistry => {
  const registry = new CityNameRegistry(rng);

  registry.register(
    new CityName('Athens', Greek, true),
    new CityName('Sparta', Greek),
    new CityName('Corinth', Greek),
    new CityName('London', English, true),
    new CityName('Athens', English),
    new CityName('Utica', null)
  );

  return registry;
};

describe('CityNameRegistry', (): void => {
  it('should hand out the capital name first, and each name only once', (): void => {
    const registry = pool(counting([0, 0.99]).rng);
    const names = [
      registry.takeCapitalByCivilization(Greek),
      registry.takeCapitalByCivilization(Greek),
      registry.takeCapitalByCivilization(Greek),
      registry.takeCapitalByCivilization(Greek),
      registry.takeCapitalByCivilization(Greek),
    ];

    expect(names[0]).to.equal('Athens');
    expect(names).to.have.members([
      'Athens',
      'Sparta',
      'Corinth',
      'Utica',
      'City #1',
    ]);
  });

  it('should not hand out a capital name for an ordinary city', (): void => {
    const registry = pool(counting([0, 0.99]).rng);

    expect([
      registry.takeByCivilization(Greek),
      registry.takeByCivilization(Greek),
      registry.takeByCivilization(Greek),
    ]).to.have.members(['Sparta', 'Corinth', 'Utica']);
  });

  it('should draw once per name, however big the pool is', (): void => {
    const generator = counting();
    const registry = pool(generator.rng);

    registry.takeCapitalByCivilization(Greek);
    expect(generator.calls()).to.equal(1);

    registry.takeCapitalByCivilization(Greek);
    expect(generator.calls()).to.equal(2);

    registry.takeByCivilization(English);
    expect(generator.calls()).to.equal(3);
  });

  it('should not draw at all once every pool is empty', (): void => {
    const generator = counting();
    const registry = new CityNameRegistry(generator.rng);

    expect(registry.takeByCivilization(Greek)).to.equal('City #1');
    expect(registry.takeByCivilization(Greek)).to.equal('City #2');
    expect(generator.calls()).to.equal(0);
  });
});
