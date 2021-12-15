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
}
