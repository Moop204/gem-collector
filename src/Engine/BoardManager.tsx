import { action, makeAutoObservable, observable } from "mobx";
import { Bonus, BonusInitialiser } from "../Components/Bonus";
import { Card, Gem, Tier } from "../Components/Card";

const base = "https://deck-of-gems.herokuapp.com/";
// const base = "http://localhost:3000/";

export class BoardManager {
  tier1: Card[];
  tier2: Card[];
  tier3: Card[];
  bonus: (Bonus | null)[];
  loaded: boolean;
  deckState: string;

  constructor() {
    makeAutoObservable(this, {
      tier1: observable,
      tier2: observable,
      tier3: observable,
      loaded: observable,
      bonus: observable,
      deckState: observable,
      initialiseBoard: action,
      drawCard: action,
      removeCard: action,
      // getCard: action,
      // isLoaded: action,
    });

    this.tier1 = [];
    this.tier2 = [];
    this.tier3 = [];
    this.bonus = [];
    this.loaded = false;
    this.deckState = "";
    // this.initialiseBoard();
    // TODO: Remove busy wait and replace with saner solution
    // while (!this.isLoaded) {
    //   continue;
    // }
  }

  /**
   * @returns Boolean describing if internal async setup functions are completed
   */
  get isLoaded() {
    return this.loaded;
  }

  /**
   * @returns Cards from tier 1
   */
  get getTier1() {
    return this.tier1;
  }

  /**
   * @returns Cards from tier 2
   */
  get getTier2() {
    return this.tier2;
  }

  /**
   * @returns Cards from tier 3
   */
  get getTier3() {
    return this.tier3;
  }

  /**
   * @returns Bonus cards
   */
  get getBonus() {
    return this.bonus;
  }

  /**
   * @returns Get all cards in board
   */
  get board() {
    return [this.tier1, this.tier2, this.tier3];
  }

  /**
   * Sets up the content of the board. Includes the gem cards and bonus cards.
   */
  async initialiseBoard() {
    const request = new URL("start", base);
    const initialResponse = await fetch(request.toString(), { mode: "cors" });
    const obj = await initialResponse.json();
    let state: string = obj["state"];
    this.deckState = state;
    // Request to fill board initially
    for (let i = 0; i < 4; i++) {
      let card = await this.drawCard(1);
      if (card) this.tier1.push(card);
      card = await this.drawCard(2);
      if (card) this.tier2.push(card);
      card = await this.drawCard(3);
      if (card) this.tier3.push(card);
      // Should never fail here
    }

    this.bonus = await this.drawBonus();
    this.loaded = true;
  }

  /**
   * Returns 4 random Bonus cards.
   * @returns Set of bonus cards needed for a game of Splendor
   */
  async drawBonus() {
    const request = new URL("bonus", base);
    const response = await fetch(request.toString(), { mode: "cors" });
    const obj: Array<JSON> = await response.json();
    if (obj.length == 0) return [];
    return obj.map((bonus: any) => {
      if (bonus) {
        const initialiser: BonusInitialiser = {
          reward: bonus.reward,
          blackCost: bonus.requirement.black,
          whiteCost: bonus.requirement.white,
          redCost: bonus.requirement.red,
          blueCost: bonus.requirement.blue,
          greenCost: bonus.requirement.green,
        };
        return new Bonus(initialiser);
      }
      return null;
    });
  }

  /**
   * Calls API to draw a card.
   * @param tier Tier that a card is drawn from.
   * @returns Card if one is available or else a nullptr.
   */
  async drawCard(tier: number) {
    const request = new URL(
      "draw?state=" + this.deckState + "&tier=" + tier.toString(),
      base
    );
    const response = await fetch(request.toString(), { mode: "cors" });
    const obj = await response.json();
    if (obj.error) {
      console.log("Error: Failed to draw card");
      return null;
    }
    const card = new Card({
      reward: obj.card.reward,
      point: obj.card.point,
      tier: obj.card.tier,
      blackCost: obj.card.cost.black,
      whiteCost: obj.card.cost.white,
      redCost: obj.card.cost.red,
      blueCost: obj.card.cost.blue,
      greenCost: obj.card.cost.green,
    });
    this.deckState = obj.state;
    return card;
  }

  // getCard(tier: number, index: number) {
  //   switch (tier) {
  //     case 1:
  //       this.tier1[index];
  //       break;
  //     case 2:
  //       this.tier2[index];
  //       break;
  //     case 3:
  //       this.tier3[index];
  //       break;
  //   }
  // }

  /**
   * Remove a bonus card from play.
   * @param index Selects the position of the card taken
   * @returns Removed card.
   */
  removeBonusCard(index: number) {
    return this.bonus.splice(index, 1, null)[0];
  }

  /**
   * Remove a gem card from play.
   * @param tier Selects the row of card taken
   * @param index Selects the position of the card taken
   * @returns Removed card.
   */
  async removeCard(tier: Tier, index: number) {
    const nextCard = await this.drawCard(tier);
    if (nextCard) {
      switch (tier) {
        case 1:
          return this.tier1.splice(index, 1, nextCard);
        case 2:
          return this.tier2.splice(index, 1, nextCard);
        case 3:
          return this.tier3.splice(index, 1, nextCard);
        default:
          console.log("Error: Not a valid tier");
      }
    } else {
      switch (tier) {
        case 1:
          return this.tier1.splice(index, 1);
        case 2:
          return this.tier2.splice(index, 1);
        case 3:
          return this.tier3.splice(index, 1);
        default:
          console.log("Error: Not a valid tier");
      }
    }
    return [];
  }
}
