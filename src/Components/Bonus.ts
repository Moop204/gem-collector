import { Gem } from "./Card";

interface Requirement {
  red: number;
  black: number;
  white: number;
  blue: number;
  green: number;
}

export interface BonusInitialiser {
  reward: number;
  blackCost: number;
  whiteCost: number;
  redCost: number;
  greenCost: number;
  blueCost: number;
}

export class Bonus {
  requirement: Requirement;
  reward: number;

  constructor({
    reward,
    blackCost,
    whiteCost,
    redCost,
    greenCost,
    blueCost,
  }: BonusInitialiser) {
    this.reward = reward;
    this.requirement = {
      red: redCost,
      black: blackCost,
      white: whiteCost,
      blue: blueCost,
      green: greenCost,
    };
  }

  getCost(g: Gem) {
    switch (g) {
      case Gem.BLACK:
        return this.requirement.black;
      case Gem.BLUE:
        return this.requirement.blue;
      case Gem.GREEN:
        return this.requirement.green;
      case Gem.RED:
        return this.requirement.red;
      case Gem.WHITE:
        return this.requirement.white;
    }
    return 0;
  }
}
