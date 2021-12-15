import { makeAutoObservable } from "mobx";
import { Bonus } from "../Components/Bonus";
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
  bonuses: Bonus[];

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
    this.bonuses = [];
    this.state = State.AWAIT;
  }

  beginTurn() {
    this.state = State.GEMCOLLECT;
  }

  endTurn() {
    this.state = State.AWAIT;
  }

  addBonus(c: Bonus) {
    this.bonuses.push(c);
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

  getCoinCount(gem: Gem) {
    switch (gem) {
      case Gem.BLACK:
        return this.black;
      case Gem.BLUE:
        return this.blue;
      case Gem.WHITE:
        return this.white;
      case Gem.GREEN:
        return this.green;
      case Gem.RED:
        return this.red;
    }
    return 0;
  }

  isCardBuyable(c: Card) {
    let extraCost = 0;
    const gems = [Gem.BLACK, Gem.BLUE, Gem.GREEN, Gem.RED, Gem.WHITE];

    gems.forEach((gem) => {
      extraCost += Math.max(
        c.getCost(gem) - (this.getCardTotal(gem) + this.getCoinCount(gem)),
        0
      );
    });

    return extraCost <= this.wild;
  }

  isBonusBuyable(c: Bonus) {
    let extraCost = 0;
    const gems = [Gem.BLACK, Gem.BLUE, Gem.GREEN, Gem.RED, Gem.WHITE];

    gems.forEach((gem) => {
      extraCost += Math.max(
        c.getCost(gem) - (this.getCardTotal(gem) + this.getCoinCount(gem)),
        0
      );
    });

    return extraCost <= this.wild;
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

  buyBonus(c: Bonus) {
    const res: Cost = {
      black: c.requirement.black,
      white: c.requirement.white,
      red: c.requirement.red,
      green: c.requirement.green,
      blue: c.requirement.blue,
      wild: 0,
    };

    this.addBonus(c);

    const blackCoinCost = Math.max(
      c.requirement.black - this.getCardTotal(Gem.BLACK),
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

    const blueCoinCost = Math.max(
      c.requirement.blue - this.getCardTotal(Gem.BLUE),
      0
    );
    this.blue -= blueCoinCost;
    res.blue = blueCoinCost;
    if (this.blue < 0) {
      this.wild += this.blue;
      res.blue += this.blue;
      res.wild -= this.blue;
      this.blue = 0;
    }

    const redCoinCost = Math.max(
      c.requirement.red - this.getCardTotal(Gem.RED),
      0
    );
    this.red -= redCoinCost;
    res.red = redCoinCost;
    if (this.red < 0) {
      this.wild += this.red;
      res.red += this.red;
      res.wild -= this.red;
      this.red = 0;
    }

    const greenCoinCost = Math.max(
      c.requirement.green - this.getCardTotal(Gem.GREEN),
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
      c.requirement.white - this.getCardTotal(Gem.WHITE),
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
        break;
      case Gem.BLUE:
        this.blue += adjustment;
        break;
      case Gem.WHITE:
        this.white += adjustment;
        break;
      case Gem.GREEN:
        this.green += adjustment;
        break;
      case Gem.RED:
        this.red += adjustment;
        break;
      case Gem.WILD:
        this.wild += adjustment;
        break;
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
