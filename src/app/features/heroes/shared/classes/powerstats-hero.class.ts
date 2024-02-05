
export class PowerstatsHero {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;

  constructor(data?: Partial<PowerstatsHero>) {
    this.intelligence = 0;
    this.strength = 0;
    this.speed = 0;
    this.durability = 0;
    this.power = 0;
    this.combat = 0;
    if (data) {
      Object.assign(this, data);
    }
  }
}