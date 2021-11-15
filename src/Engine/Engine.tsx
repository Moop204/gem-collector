import { Card, Gem, Tier } from "../Components/Card";
import { BoardManager } from "./BoardManager";
import { Cost, GemManager } from "./GemManager";
import { PlayerManager } from "./PlayerManager";
import { State } from "./type";

import {
  action,
  autorun,
  computed,
  makeAutoObservable,
  observable,
} from "mobx";

export class Engine {
  board: BoardManager;
  economy: GemManager;
  player: PlayerManager;
  gameState: State;

  constructor() {
    makeAutoObservable(this, {
      economy: observable,
      board: observable,
      player: observable,
      gameState: observable,
      gemDetail: action,
      isWon: computed,
      gemSelection: action,
    });
    this.board = new BoardManager();
    this.economy = new GemManager();
    this.player = new PlayerManager();
    this.gameState = State.AWAIT;
  }

  get isWon() {
    return this.gameState == State.VICTORY;
  }
  // Gem Selection
  // User chooses which kind of gems to take
  // 3 different types or 2 of same type or 1 wild
  // Requirements: Gems must be available

  transitionStart() {
    if (this.gameState != State.AWAIT)
      console.log("State Error: Attempting to move from AWAIT to GEMCOLLECT");
    this.gameState = State.GEMCOLLECT;
    this.player.beginTurn();
  }

  nextPhase() {
    switch (this.gameState) {
      case State.AWAIT:
        this.gameState = State.GEMCOLLECT;
        break;
      case State.GEMCOLLECT:
        this.gameState = State.CARDSELECT;
        break;
      case State.CARDSELECT:
        this.gameState = State.AWAIT;
        break;
    }
  }

  gemSelection(claims: Gem[]) {
    if (!this.economy.validClaim(claims)) {
      console.log("Error: Invalid selection");
      return;
    }
    this.economy.claim(claims);
    this.player.claimGems(claims);
  }

  async cardSelection(tier: Tier, index: number, payment: Cost) {
    const card: Card[] = await this.board.removeCard(tier, index);
    this.player.buyCard(card[0], payment);
    this.economy.spend(payment);

    this.player.endTurn();
    // Wait set amount of time then set turn again for testing
  }

  gemDetail(g: Gem) {
    switch (g) {
      case Gem.BLUE:
        return this.economy.blue;
      case Gem.BLACK:
        return this.economy.black;
      case Gem.WHITE:
        return this.economy.white;
      case Gem.GREEN:
        return this.economy.green;
      case Gem.RED:
        return this.economy.red;
    }
    return 0;
  }
}
