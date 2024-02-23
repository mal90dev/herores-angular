import { Hero } from 'src/app/features/heroes/shared/interfaces/hero.interface';

export const hero: Hero = {
  name: "A-Bombaa",
  appearance: {
    gender: "Male",
    race: "Human",
    height: [
      "203"
    ],
    weight: [
      "441"
    ]
  },
  powerstats: {
    intelligence: 402,
    strength: 100,
    speed: 17,
    durability: 80,
    power: 24,
    combat: 64
  },
  biography: {
    fullName: "Richard Milhouse Jones",
    aliases: [
      "Rick Jones"
    ],
    publisher: "Marvel Comics"
  },
  image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg",
  id: 1
};
