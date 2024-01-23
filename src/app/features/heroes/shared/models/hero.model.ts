import { AppearanceHero } from './appearanceHero.model';
import { BiographyHero } from './biographyHero.model';
import { PowerstatsHero } from './powerstatsHero.model';

export interface Hero {
  id?: number;
  name: string;
  appearance: AppearanceHero;
  powerstats: PowerstatsHero;
  biography: BiographyHero;
  image?: string;
}