import { Card, Gem, Tier } from "../Card";
import { BoardManager } from "./BoardManager";
import { Cost, GemManager } from "./GemManager";
import { PlayerManager } from "./PlayerManager";

export class Engine {
  board: BoardManager;
  economy: GemManager;
  player: PlayerManager;

  constructor() {
    this.board = new BoardManager();
    this.economy = new GemManager();
    this.player = new PlayerManager();
  }

  // Gem Selection
  // User chooses which kind of gems to take
  // 3 different types or 2 of same type or 1 wild
  // Requirements: Gems must be available

  gemSelection(claims: Gem[]) {
    if (!this.economy.validClaim(claims)) {
      console.log("Error: Invalid selection");
    }
    this.economy.claim(claims);
    this.player.claimGems(claims);
  }

  async cardSelection(tier: Tier, index: number, payment: Cost) {
    const card: Card[] = await this.board.removeCard(tier, index);
    this.player.buyCard(card[0], payment);
    this.economy.spend(payment);
  }
}
