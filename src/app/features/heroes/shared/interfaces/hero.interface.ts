import { AppearanceHero } from './appearanceHero.interface';
import { BiographyHero } from './biographyHero.interface';
import { PowerstatsHero } from './powerstatsHero.interface';

export interface Hero {
  id?: number;
  name: string;
  appearance: AppearanceHero;
  powerstats: PowerstatsHero;
  biography: BiographyHero;
  image?: string;
}
