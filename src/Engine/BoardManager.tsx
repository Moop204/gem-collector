import { action, makeAutoObservable, observable } from "mobx";
import { Card, Gem, Tier } from "../Components/Card";

const base = "https://deck-of-gems.herokuapp.com/";
// const base = "http://localhost:3000/";

export class BoardManager {
  tier1: Card[];
  tier2: Card[];
  tier3: Card[];
  bonus: Card[];
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
      getCard: action,
    });

    this.tier1 = [];
    this.tier2 = [];
    this.tier3 = [];
    this.bonus = [];
    this.loaded = false;
    this.deckState = "";
    this.initialiseBoard();
  }

  get isLoaded() {
    return this.loaded;
  }

  get getTier1() {
    return this.tier1;
  }
  get getTier2() {
    return this.tier2;
  }
  get getTier3() {
    return this.tier3;
  }

  get board() {
    return [this.tier1, this.tier2, this.tier3];
  }

  async initialiseBoard() {
    const request = new URL("start", base);
    console.log(request.toString());
    const initialResponse = await fetch(request.toString(), { mode: "cors" });
    console.log(initialResponse);
    const obj = await initialResponse.json();
    console.log(obj);
    let state: string = obj["state"];
    this.deckState = state;
    // Request to fill board initially
    for (let i = 0; i < 4; i++) {
      let card = await this.drawCard(1, this.deckState);
      if (card) this.tier1.push(card);
      card = await this.drawCard(2, this.deckState);
      if (card) this.tier2.push(card);
      card = await this.drawCard(3, this.deckState);
      if (card) this.tier3.push(card);
      // Should never fail here
    }
    this.loaded = true;
  }

  async drawCard(tier: number, state: string) {
    const request = new URL(
      "draw?state=" + state + "&tier=" + tier.toString(),
      base
    );
    const response = await fetch(request.toString(), { mode: "cors" });
    const obj = await response.json();
    if (obj.error) {
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
    // // } catch {
    // //   console.log("Response fucked");
    // // }
    // const card = new Card({
    //   reward: Gem.WILD,
    //   point: -1,
    //   tier: 1,
    //   blackCost: -1,
    //   whiteCost: -1,
    //   redCost: -1,
    //   blueCost: -1,
    //   greenCost: -1,
    // });
    // return card;
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

  async removeCard(tier: Tier, index: number) {
    const nextCard = await this.drawCard(tier, this.deckState);
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
