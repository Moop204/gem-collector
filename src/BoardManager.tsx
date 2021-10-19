import { Card } from "./Card";

const base = "something";

export class BoardManager {
  tier1: Card[];
  tier2: Card[];
  tier3: Card[];
  bonus: Card[];
  loaded: boolean;
  deckState: string;

  constructor() {
    this.tier1 = [];
    this.tier2 = [];
    this.tier3 = [];
    this.bonus = [];
    this.loaded = false;
    this.deckState = "";
    this.initialiseBoard();
  }

  async initialiseBoard() {
    const initialResponse = await fetch(base);
    let state: string = JSON.parse(await initialResponse.json())["state"];
    this.deckState = state;
    // Request to fill board initially
    for (let i = 0; i < 4; i++) {
      let card = await this.drawCard(1, state);
      this.tier1.push(card);
      card = await this.drawCard(1, state);
      this.tier2.push(card);
      card = await this.drawCard(1, state);
      this.tier3.push(card);
    }
    this.loaded = true;
  }

  async drawCard(tier: number, state: string) {
    const response = await fetch(base + state + tier);
    const obj = JSON.parse(await response.json());
    const card = new Card({
      reward: obj.reward,
      point: obj.point,
      tier: 1,
      blackCost: obj.cost.black,
      whiteCost: obj.cost.white,
      redCost: obj.cost.red,
      blueCost: obj.cost.blue,
      greenCost: obj.cost.green,
    });
    // switch (tier) {
    //   case 1:
    //     this.tier1.push(card);
    //     break;
    //   case 2:
    //     this.tier2.push(card);
    //     break;
    //   case 3:
    //     this.tier3.push(card);
    //     break;
    // }
    this.deckState = obj.state;
    return card;
  }

  getCard(tier: number, index: number) {
    switch (tier) {
      case 1:
        this.tier1[index];
        break;
      case 2:
        this.tier2[index];
        break;
      case 3:
        this.tier3[index];
        break;
    }
  }

  async removeCard(tier: number, index: number) {
    switch (tier) {
      case 1:
        this.tier1.splice(index, 1, await this.drawCard(tier, this.deckState));
        break;
      case 2:
        this.tier2.splice(index, 1, await this.drawCard(tier, this.deckState));
        break;
      case 3:
        this.tier3.splice(index, 1, await this.drawCard(tier, this.deckState));
        break;
    }
  }
}
