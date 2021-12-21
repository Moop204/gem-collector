import { makeAutoObservable } from "mobx";
import { Gem } from "../Components/Card";

export interface Cost {
  black: number;
  white: number;
  red: number;
  green: number;
  blue: number;
  wild: number;
}
/**
 * Handles shared supply of gems
 */
export class GemManager {
  black: number;
  white: number;
  red: number;
  green: number;
  blue: number;
  wild: number;
  errors: string[];

  constructor() {
    makeAutoObservable(this);

    this.black = 10;
    this.white = 10;
    this.red = 10;
    this.green = 10;
    this.blue = 10;
    this.wild = 5;
    this.errors = [];
  }

  /**
   * Count for a specific gem
   * @param gem Gem type searched
   * @returns Count of gem
   */
  selectGem(gem: Gem) {
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
      case Gem.WILD:
        return this.wild;
    }
  }

  /**
   * Determines if it is possible to claim a combination of gems
   * @param claims A list of gems chosen.
   * @returns Validity of selection.
   */
  validClaim(claims: Gem[]): boolean {
    if (claims.length === 3) {
      claims.forEach((claim) => {
        if (this.selectGem(claim) < 1) return false;
      });
    } else if (claims.length === 1) {
      if (this.selectGem(claims[0]) < 2) {
        console.log("Failed here");
        return false;
      }
    }
    return true;
  }

  /**
   * Change supply of gem coins.
   * @param gem Type of gem coin
   * @param adjust How coins are changed
   */
  private adjustGem(gem: Gem, adjust: number) {
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
      case Gem.WILD:
        this.wild += adjust;
        break;
      default:
        this.errors.push("Error: Invalid Gem given. At GemManager: adjustGem");
    }
  }

  /**
   * Return coins to supply based on cost
   * @param cost Cost of a card
   */
  returnToTreasury(cost: Cost) {
    this.black += cost.black;
    this.white += cost.white;
    this.green += cost.green;
    this.red += cost.red;
    this.blue += cost.blue;
    this.wild += cost.wild;
  }

  /**
   * Removes supply of coins based on claim.
   * @param claims Gems selected by player
   */
  claim(claims: Gem[]) {
    if (claims.length === 1) {
      const adjustment = claims[0] === "wild" ? -1 : -2;
      this.adjustGem(claims[0], adjustment);
    } else if (claims.length === 3) {
      claims.forEach((gem: Gem) => {
        this.adjustGem(gem, -1);
      });
    } else {
      this.errors.push("Invalid number of gems claimed");
    }
  }
}
