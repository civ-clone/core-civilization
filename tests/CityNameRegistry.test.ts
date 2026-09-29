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

  it('should record every name it hands out, in order', (): void => {
    const registry = pool(counting([0]).rng);

    registry.takeCapitalByCivilization(Greek);
    registry.takeByCivilization(English);

    expect(
      registry
        .taken()
        .map((cityName: CityName) => [cityName.name(), cityName.civilization()])
    ).to.deep.equal([
      ['Athens', Greek],
      ['Athens', English],
    ]);
  });

  it('should restore a used pool: the same names gone, the same draws next', (): void => {
    const played = pool(counting([0.3, 0.7]).rng);

    played.takeCapitalByCivilization(Greek);
    played.takeCapitalByCivilization(Greek);
    played.takeByCivilization(English);
    played.takeByCivilization(Greek);
    played.takeByCivilization(Greek);

    const loaded = pool(counting([0.3, 0.7]).rng);

    loaded.restore(
      played
        .taken()
        .map(
          (cityName: CityName): CityName =>
            new CityName(cityName.name(), cityName.civilization())
        ),
      played.counter()
    );

    const names = (registry: CityNameRegistry): string[] =>
      registry
        .entries()
        .map(
          (cityName: CityName): string =>
            `${cityName.civilization()?.name ?? '-'}:${cityName.name()}`
        );

    expect(names(loaded)).to.deep.equal(names(played));
    expect(loaded.counter()).to.equal(played.counter());
    expect(loaded.taken().map((cityName) => cityName.name())).to.deep.equal(
      played.taken().map((cityName) => cityName.name())
    );
    expect(loaded.takeCapitalByCivilization(Greek)).to.equal(
      played.takeCapitalByCivilization(Greek)
    );
  });

  it("should tell one civilization's Athens from another's", (): void => {
    const registry = pool(counting().rng);

    registry.restore([new CityName('Athens', English)], 1);

    expect(registry.takeCapitalByCivilization(Greek)).to.equal('Athens');
    expect(registry.takeCapitalByCivilization(English)).to.equal('London');
  });

  it('should match a name from the unassociated pool', (): void => {
    const registry = pool(counting().rng);

    registry.restore([new CityName('Utica', Greek)], 1);

    expect(registry.getBy('civilization', null)).to.have.length(0);
    expect(registry.taken()[0].civilization()).to.equal(Greek);
  });

  it('should not take the unassociated copy of a name restored twice', (): void => {
    const registry = pool(counting().rng);

    registry.register(new CityName('Athens', null));
    registry.restore([new CityName('Athens', English)], 1);
    registry.restore([new CityName('Athens', English)], 1);

    expect(
      registry
        .getBy('civilization', null)
        .map((cityName: CityName): string => cityName.name())
    ).to.deep.equal(['Utica', 'Athens']);
    expect(
      registry.taken().map((cityName) => cityName.civilization())
    ).to.deep.equal([English]);
  });

  it('should not take a second name for one already drawn in this game', (): void => {
    const registry = pool(counting([0]).rng);

    registry.register(new CityName('Athens', null));
    registry.takeByCivilization(English);
    registry.restore([new CityName('Athens', English)], 1);

    expect(registry.getBy('civilization', null)).to.have.length(2);
  });

  it('should be the same list again when restored twice, or into a used pool', (): void => {
    const registry = pool(counting().rng);
    const taken = [
      new CityName('Sparta', Greek),
      new CityName('Nowhere', null),
    ];

    registry.restore(taken, 4);
    registry.restore(taken, 4);

    expect(registry.taken().map((cityName) => cityName.name())).to.deep.equal([
      'Sparta',
      'Nowhere',
    ]);
    expect(registry.length).to.equal(5);
    expect(registry.counter()).to.equal(4);
  });
});
