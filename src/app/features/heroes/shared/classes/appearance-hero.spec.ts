import { AppearanceHero } from './appearance-hero.class';

describe('AppearanceHero', () => {
  it('should create an instance with default values when no data is provided', () => {
    const appearance = new AppearanceHero();
    expect(appearance.gender).toEqual('');
    expect(appearance.race).toEqual('');
    expect(appearance.height).toEqual([]);
    expect(appearance.weight).toEqual([]);
  });

  it('should create an instance with provided data', () => {
    const data = {
      gender: 'Male',
      race: 'Human',
      height: ['7'],
      weight: ['180 kg',]
    };
    const appearance = new AppearanceHero(data);
    expect(appearance.gender).toEqual(data.gender);
    expect(appearance.race).toEqual(data.race);
    expect(appearance.height).toEqual(data.height);
    expect(appearance.weight).toEqual(data.weight);
  });

  it('should create an instance with partial data', () => {
    const partialData = {
      gender: 'Female'
    };
    const expectedDefaultValues = {
      gender: 'Female',
      race: '',
      height: [],
      weight: []
    };
    const appearance = new AppearanceHero(partialData);
    expect(appearance.gender).toEqual(expectedDefaultValues.gender);
    expect(appearance.race).toEqual(expectedDefaultValues.race);
    expect(appearance.height).toEqual(expectedDefaultValues.height);
    expect(appearance.weight).toEqual(expectedDefaultValues.weight);
  });
});
