import { BiographyHero } from './biography-hero.class';

describe('BiographyHero', () => {
  it('should create an instance with default values when no data is provided', () => {
    const biography = new BiographyHero();
    expect(biography.fullName).toEqual('');
    expect(biography.aliases).toEqual([]);
    expect(biography.publisher).toEqual('');
  });

  it('should create an instance with provided data', () => {
    const data = {
      fullName: 'Superman',
      aliases: ['Superman', 'Man of Steel'],
      publisher: 'DC'
    };
    const biography = new BiographyHero(data);
    expect(biography.fullName).toEqual(data.fullName);
    expect(biography.aliases).toEqual(data.aliases);
    expect(biography.publisher).toEqual(data.publisher);
  });

  it('should create an instance with partial data', () => {
    const partialData = {
      fullName: 'Superman'
    };
    const expectedDefaultValues = {
      fullName: 'Superman',
      aliases: [],
      publisher: ''
    };
    const biography = new BiographyHero(partialData);
    expect(biography.fullName).toEqual(expectedDefaultValues.fullName);
    expect(biography.aliases).toEqual(expectedDefaultValues.aliases);
    expect(biography.publisher).toEqual(expectedDefaultValues.publisher);
  });
});
