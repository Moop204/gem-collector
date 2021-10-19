export enum Gem {
  BLACK = "black",
  WHITE = "white",
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

export enum GemNum {
  "black",
  "white",
  "red",
  "green",
  "blue",
}

export type Tier = 1 | 2 | 3;

export interface CardInitialiser {
  reward: Gem;
  point: number;
  tier: Tier;
  blackCost: number;
  whiteCost: number;
  redCost: number;
  greenCost: number;
  blueCost: number;
}

export class Card {
  point: number;
  tier: Tier;
  blackCost: number;
  whiteCost: number;
  redCost: number;
  greenCost: number;
  blueCost: number;
  reward: Gem;

  constructor({
    reward,
    point,
    tier,
    blackCost,
    whiteCost,
    redCost,
    greenCost,
    blueCost,
  }: CardInitialiser) {
    this.reward = reward;
    this.point = point;
    this.tier = tier;
    this.blackCost = blackCost;
    this.whiteCost = whiteCost;
    this.redCost = redCost;
    this.greenCost = greenCost;
    this.blueCost = blueCost;
  }

  toJSON() {
    const result = {
      reward: this.reward,
      point: this.point,
      tier: this.tier,
      cost: {
        black: this.blackCost,
        white: this.whiteCost,
        red: this.redCost,
        blue: this.blueCost,
        green: this.greenCost,
      },
    };
    return result;
  }

  valuesAsSequence() {
    return [
      GemNum[this.reward],
      this.point,
      this.tier,
      this.blackCost,
      this.whiteCost,
      this.redCost,
      this.blueCost,
      this.greenCost,
    ];
  }

  getTier() {
    return this.tier;
  }
}
