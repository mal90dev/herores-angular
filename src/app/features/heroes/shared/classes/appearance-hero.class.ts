export class AppearanceHero {
  gender: string;
  race: string;
  height: string[];
  weight: string[];

  constructor(data?: Partial<AppearanceHero>) {
    this.gender = '';
    this.race = '';
    this.height = [];
    this.weight = [];
    if (data) {
      Object.assign(this, data);
    }
  }
}