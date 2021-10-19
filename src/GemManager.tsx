import { Gem } from "./Card";

export interface Cost {
  black: number;
  white: number;
  red: number;
  green: number;
  blue: number;
  wild: number;
}

export class GemManager {
  black: number;
  white: number;
  red: number;
  green: number;
  blue: number;
  wild: number;
  errors: string[];

  constructor() {
    this.black = 10;
    this.white = 10;
    this.red = 10;
    this.green = 10;
    this.blue = 10;
    this.wild = 5;
    this.errors = [];
  }

  adjustGem(gem: Gem, adjust: number) {
    switch (gem) {
      case Gem.BLACK:
        this.black += adjust;
        break;
      case Gem.BLUE:
        this.blue += adjust;
        break;
      case Gem.WHITE:
        this.white += adjust;
        break;
      case Gem.GREEN:
        this.green += adjust;
        break;
      case Gem.RED:
        this.red += adjust;
        break;
    }
  }

  spend(cost: Cost) {
    this.black += cost.black;
    this.white += cost.white;
    this.green += cost.green;
    this.red += cost.red;
    this.blue += cost.blue;
    this.wild += cost.wild;
  }

  claim(claims: Gem[]) {
    if (claims.length === 1) {
      this.adjustGem(claims[0], -2);
    } else if (claims.length === 3) {
      claims.forEach((gem: Gem) => {
        this.adjustGem(gem, -1);
      });
    } else {
      this.errors.push("Invalid number of gems claimed");
    }
  }
}
