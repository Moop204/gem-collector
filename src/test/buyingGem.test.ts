import { Gem } from "../Components/Card";
import { Engine } from "../Engine/Engine";

describe("Coin collection", () => {
  let engine: Engine;
  beforeEach(async () => {
    engine = await new Engine();
  });

  it("Collects one coin from wild type", () => {
    // Pre action
    const initialCount = engine.economy.wild;

    engine.gemSelection([Gem.WILD]);

    // Post action
    const difference = 1;
    expect(engine.economy.wild).toBe(initialCount - difference);
    expect(engine.player.wild).toBe(difference);
    expect(engine.economy.errors.length).toBe(0);
  });

  it("Collects two coins from one type", () => {
    // Pre action
    const initialCount = engine.economy.black;

    engine.gemSelection([Gem.BLACK]);

    // Post action
    const difference = 2;
    expect(engine.economy.black).toBe(initialCount - difference);
    expect(engine.player.black).toBe(difference);
    expect(engine.economy.errors.length).toBe(0);
  });

  it("Collects one coin each from three types", () => {
    // Pre action
    const initialBlue = engine.economy.blue;
    const initialRed = engine.economy.red;
    const initialGreen = engine.economy.green;

    engine.gemSelection([Gem.BLUE, Gem.RED, Gem.GREEN]);

    // Post action
    const difference = 1;
    // Update public coins
    expect(engine.economy.blue).toBe(initialBlue - difference);
    expect(engine.economy.red).toBe(initialRed - difference);
    expect(engine.economy.green).toBe(initialGreen - difference);
    // Update private coins
    expect(engine.player.blue).toBe(difference);
    expect(engine.player.green).toBe(difference);
    expect(engine.player.red).toBe(difference);
    expect(engine.economy.errors.length).toBe(0);
  });
});
