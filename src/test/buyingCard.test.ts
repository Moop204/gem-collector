import { Gem } from "../Components/Card";
import { Engine } from "../Engine/Engine";
import "isomorphic-fetch";
// jest.mock("Engine");

// jest.mock("../Engine/Engine", () => ({
//   getTier1: () => "1:11PM",
// }));

jest.setTimeout(100000);

describe("Card collection", () => {
  let engine: Engine;
  beforeEach(async () => {
    engine = await Engine.build();
  });

  it("Purchase a tier 1 card with enough gems", async () => {
    // Pre action
    engine.gemSelection([Gem.BLACK]);
    engine.gemSelection([Gem.BLUE]);
    engine.gemSelection([Gem.GREEN]);
    engine.gemSelection([Gem.RED]);
    engine.gemSelection([Gem.WHITE]);
    engine.gemSelection([Gem.WILD]);
    const originalCards = engine.board.getTier1;
    const removedCard = engine.board.getTier1[0];

    // Action
    const card = await engine.cardSelection(1, 0);

    // Post action
    expect(engine.board.getTier1.length).toBe(originalCards.length);
    console.log(removedCard.toJSON());
    expect(engine.board.getTier1[0] == removedCard).toBeFalsy();
    expect(engine.player.getCardTotal(card.reward)).toBe(1);
    expect(engine.economy.errors.length).toBe(0);
  });

  it("Fail to purchase a tier 1 card with enough gems", async () => {
    // Pre action
    const originalCards = engine.board.getTier1;
    const removedCard = engine.board.getTier1[0];

    // Action
    const card = await engine.cardSelection(1, 0);

    // Post action
    expect(engine.board.getTier1.length).toBe(originalCards.length);
    expect(engine.board.getTier1[0] == removedCard).toBeTruthy();
    expect(engine.player.getCardTotal(card.reward)).toBe(0);
    expect(engine.economy.errors.length).toBe(0);
  });
});
