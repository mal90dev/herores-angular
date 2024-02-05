export class BiographyHero {
  fullName: string;
  aliases: string[];
  publisher: string;

  constructor(data?: Partial<BiographyHero>) {
    this.fullName = '';
    this.aliases = [];
    this.publisher = '';
    if (data) {
      Object.assign(this, data);
    }
  }
}