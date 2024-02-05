import { AppearanceHero } from '../classes/appearance-hero.class';
import { BiographyHero } from '../classes/biography-hero.class';
import { PowerstatsHero } from '../classes/powerstats-hero.class';

export interface Hero {
  id?: number;
  name: string;
  appearance: AppearanceHero;
  powerstats: PowerstatsHero;
  biography: BiographyHero;
  image?: string;
}
