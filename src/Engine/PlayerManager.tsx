import { makeAutoObservable } from "mobx";
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

  cBlack: Card[];
  cWhite: Card[];
  cRed: Card[];
  cGreen: Card[];
  cBlue: Card[];

  state: State;

  constructor() {
    makeAutoObservable(this);
    this.black = 0;
    this.white = 0;
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    this.wild = 0;
    this.cBlack = [];
    this.cWhite = [];
    this.cRed = [];
    this.cGreen = [];
    this.cBlue = [];
    this.state = State.AWAIT;
  }

  beginTurn() {
    this.state = State.GEMCOLLECT;
  }

  endTurn() {
    this.state = State.AWAIT;
  }

  addCard(c: Card) {
    const gemType = c.reward;
    switch (gemType) {
      case Gem.BLACK:
        this.cBlack.push(c);
        break;
      case Gem.BLUE:
        this.cBlue.push(c);
        break;
      case Gem.WHITE:
        this.cWhite.push(c);
        break;
      case Gem.GREEN:
        this.cGreen.push(c);
        break;
      case Gem.RED:
        this.cRed.push(c);
        break;
    }
  }

  getCardTotal(gem: Gem) {
    switch (gem) {
      case Gem.BLACK:
        return this.cBlack.length;
      case Gem.BLUE:
        return this.cBlue.length;
      case Gem.WHITE:
        return this.cWhite.length;
      case Gem.GREEN:
        return this.cGreen.length;
      case Gem.RED:
        return this.cRed.length;
    }
    return 0;
  }

  gemCost(gem: Gem, cost: number) {
    return Math.min(this.getCardTotal(gem) - cost, 0);
  }

  isCardBuyable(c: Card) {
    const blackRemainder = Math.max(
      c.blackCost - (this.getCardTotal(Gem.BLACK) + this.black),
      0
    );
    const whiteRemainder = Math.max(
      c.whiteCost - (this.getCardTotal(Gem.WHITE) + this.white),
      0
    );
    const blueRemainder = Math.max(
      c.blueCost - (this.getCardTotal(Gem.BLUE) + this.blue),
      0
    );
    const redRemainder = Math.max(
      c.redCost - (this.getCardTotal(Gem.RED) + this.red),
      0
    );
    const greenRemainder = Math.max(
      c.greenCost - (this.getCardTotal(Gem.GREEN) + this.green),
      0
    );
    return (
      blackRemainder +
        whiteRemainder +
        blueRemainder +
        redRemainder +
        greenRemainder <=
      this.wild
    );
  }

  buyCard(c: Card) {
    const res: Cost = {
      black: c.blackCost,
      white: c.whiteCost,
      red: c.redCost,
      green: c.greenCost,
      blue: c.blueCost,
      wild: 0,
    };

    this.addCard(c);

    const blackCoinCost = Math.max(
      c.blackCost - this.getCardTotal(Gem.BLACK),
      0
    );
    this.black -= blackCoinCost;
    res.black = blackCoinCost;
    if (this.black < 0) {
      this.wild += this.black;
      res.black += this.black;
      res.wild -= this.black;
      this.black = 0;
    }

    const blueCoinCost = Math.max(c.blueCost - this.getCardTotal(Gem.BLUE), 0);
    this.blue -= blueCoinCost;
    res.blue = blueCoinCost;
    if (this.blue < 0) {
      this.wild += this.blue;
      res.blue += this.blue;
      res.wild -= this.blue;
      this.blue = 0;
    }

    const redCoinCost = Math.max(c.redCost - this.getCardTotal(Gem.RED), 0);
    this.red -= redCoinCost;
    res.red = redCoinCost;
    if (this.red < 0) {
      this.wild += this.red;
      res.red += this.red;
      res.wild -= this.red;
      this.red = 0;
    }

    const greenCoinCost = Math.max(
      c.greenCost - this.getCardTotal(Gem.GREEN),
      0
    );
    this.green -= greenCoinCost;
    res.green = greenCoinCost;
    if (this.green < 0) {
      this.wild += this.green;
      res.green += this.green;
      res.wild -= this.green;
      this.green = 0;
    }

    const whiteCoinCost = Math.max(
      c.whiteCost - this.getCardTotal(Gem.WHITE),
      0
    );
    this.white -= whiteCoinCost;
    res.white = whiteCoinCost;
    if (this.white < 0) {
      this.wild += this.white;
      res.white += this.white;
      res.wild -= this.white;
      this.white = 0;
    }
    return res;
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
