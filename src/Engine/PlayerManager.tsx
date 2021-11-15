import { Card, Gem } from "../Components/Card";
import { Cost } from "./GemManager";
import { State } from "./type";

export class PlayerManager {
  black: number;
  white: number;
  red: number;
  green: number;
  blue: number;
  wild: number;

  cBlack: number;
  cWhite: number;
  cRed: number;
  cGreen: number;
  cBlue: number;

  state: State;

  constructor() {
    this.black = 10;
    this.white = 10;
    this.red = 10;
    this.green = 10;
    this.blue = 10;
    this.wild = 5;
    this.cBlack = 10;
    this.cWhite = 10;
    this.cRed = 10;
    this.cGreen = 10;
    this.cBlue = 10;
    this.state = State.AWAIT;
  }

  beginTurn() {
    this.state = State.GEMCOLLECT;
  }

  endTurn() {
    this.state = State.AWAIT;
  }

  addCard(gemType: Gem) {
    switch (gemType) {
      case Gem.BLACK:
        this.cBlack++;
        break;
      case Gem.BLUE:
        this.cBlue++;
        break;
      case Gem.WHITE:
        this.cWhite++;
        break;
      case Gem.GREEN:
        this.cGreen++;
        break;
      case Gem.RED:
        this.cRed++;
        break;
    }
  }

  getCardTotal(gem: Gem) {
    switch (gem) {
      case Gem.BLACK:
        return this.cBlack;
      case Gem.BLUE:
        return this.cBlue;
      case Gem.WHITE:
        return this.cWhite;
      case Gem.GREEN:
        return this.cGreen;
      case Gem.RED:
        return this.cRed;
    }
    return 0;
  }

  gemCost(gem: Gem, cost: number) {
    return Math.min(this.getCardTotal(gem) - cost, 0);
  }

  buyCard(c: Card, payment: Cost) {
    this.addCard(c.reward);
    this.black -= payment.black; //Math.min(this.cBlack - c.blackCost, 0);
    this.blue -= payment.blue; //Math.min(this.cBlue - c.blueCost, 0);
    this.red -= payment.red; // Math.min(this.cRed - c.redCost, 0);
    this.green -= payment.green; //Math.min(this.cGreen - c.greenCost, 0);
    this.white -= payment.white; //Math.min(this.cWhite - c.whiteCost, 0);
    this.wild -= payment.wild;
  }

  adjustGem(gem: Gem, adjustment: number) {
    switch (gem) {
      case Gem.BLACK:
        this.black += adjustment;
      case Gem.BLUE:
        this.blue += adjustment;
      case Gem.WHITE:
        this.white += adjustment;
      case Gem.GREEN:
        this.green += adjustment;
      case Gem.RED:
        this.red += adjustment;
      case Gem.WILD:
        this.wild += adjustment;
    }
  }

  claimGems(claims: Gem[]) {
    if (claims.length === 3) {
      claims.forEach((g) => this.adjustGem(g, 1));
    } else if (claims.length === 1) {
      const adjustment = claims[0] === "wild" ? 1 : 2;
      this.adjustGem(claims[0], adjustment);
    }
  }
}
