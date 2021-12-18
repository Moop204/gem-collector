import { BoardManager } from "./BoardManager";
import "isomorphic-fetch";
import { Bonus } from "../Components/Bonus";

jest.setTimeout(100000);

describe("BoardManager", () => {
  let bm: BoardManager;

  beforeEach(async () => {
    bm = new BoardManager();
    await bm.initialiseBoard();
  });
  // it("Initialised correctly", () => {
  //   expect(bm.getTier1.length).toBe(4);
  //   expect(bm.getTier2.length).toBe(4);
  //   expect(bm.getTier3.length).toBe(4);
  //   expect(bm.bonus.length).toBe(4);
  //   expect(bm.loaded).toBeTruthy();
  // });

  it("Draws cards from each tier", async () => {
    const card1 = await bm.drawCard(1);
    const card2 = await bm.drawCard(2);
    const card3 = await bm.drawCard(3);
    expect(card1).toBeDefined();
    expect(card2).toBeDefined();
    expect(card3).toBeDefined();
  });
});

describe("Bonus actions", () => {
  let bm: BoardManager;

  beforeEach(async () => {
    bm = new BoardManager();
    await bm.initialiseBoard();
  });

  it("Draws cards from bonus", async () => {
    const cards = await bm.drawBonus();
    expect(cards.length).toBe(4);
    for (let i = 0; i < cards.length; i++) {
      expect(cards[i]).toBeDefined();
      expect((cards[i] as Bonus).reward).toBeDefined();
      expect((cards[i] as Bonus).requirement).toBeDefined();
    }
  });

  it("Remove first bonus card", async () => {
    const toBeRemoved = bm.getBonus[0];
    const removed = await bm.removeBonusCard(0);

    expect(bm.getBonus.length).toBe(3);
    expect(removed).toBe(toBeRemoved);
  });

  it("Remove last bonus card", async () => {
    const toBeRemoved = bm.getBonus[3];
    const removed = await bm.removeBonusCard(3);

    expect(bm.getBonus.length).toBe(3);
    expect(removed).toBe(toBeRemoved);
  });

  it("Remaining bonus stays in the correct position", async () => {
    const pos1 = bm.getBonus[1];
    const pos3 = bm.getBonus[3];

    const toBeRemoved0 = bm.getBonus[0];
    const removed0 = await bm.removeBonusCard(0);
    const toBeRemoved2 = bm.getBonus[2];
    const removed2 = await bm.removeBonusCard(2);

    expect(bm.getBonus.length).toBe(2);
    expect(removed0).toBe(toBeRemoved0);
    expect(removed2).toBe(toBeRemoved2);

    expect(pos1).toBe(bm.getBonus[1]);
    expect(pos3).toBe(bm.getBonus[3]);
  });
});

export {};
