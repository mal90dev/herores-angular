import { PowerstatsHero } from './powerstats-hero.class';

describe('PowerstatsHero', () => {
  it('should create an instance with default values when no data is provided', () => {
    const powerstats = new PowerstatsHero();
    expect(powerstats.intelligence).toEqual(0);
    expect(powerstats.strength).toEqual(0);
    expect(powerstats.speed).toEqual(0);
    expect(powerstats.durability).toEqual(0);
    expect(powerstats.power).toEqual(0);
    expect(powerstats.combat).toEqual(0);
  });

  it('should create an instance with provided data', () => {
    const data = {
      intelligence: 80,
      strength: 90,
      speed: 70,
      durability: 85,
      power: 95,
      combat: 75
    };
    const powerstats = new PowerstatsHero(data);
    expect(powerstats.intelligence).toEqual(data.intelligence);
    expect(powerstats.strength).toEqual(data.strength);
    expect(powerstats.speed).toEqual(data.speed);
    expect(powerstats.durability).toEqual(data.durability);
    expect(powerstats.power).toEqual(data.power);
    expect(powerstats.combat).toEqual(data.combat);
  });

  it('should create an instance with partial data', () => {
    const partialData = {
      intelligence: 60,
      speed: 65
    };
    const expectedDefaultValues = {
      intelligence: 60,
      strength: 0,
      speed: 65,
      durability: 0,
      power: 0,
      combat: 0
    };
    const powerstats = new PowerstatsHero(partialData);
    expect(powerstats.intelligence).toEqual(expectedDefaultValues.intelligence);
    expect(powerstats.strength).toEqual(expectedDefaultValues.strength);
    expect(powerstats.speed).toEqual(expectedDefaultValues.speed);
    expect(powerstats.durability).toEqual(expectedDefaultValues.durability);
    expect(powerstats.power).toEqual(expectedDefaultValues.power);
    expect(powerstats.combat).toEqual(expectedDefaultValues.combat);
  });
});
