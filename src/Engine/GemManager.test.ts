import { Gem } from "../Components/Card";
import { Cost, GemManager } from "./GemManager";

describe("BoardManager", () => {
  let gm: GemManager;

  beforeEach(async () => {
    gm = new GemManager();
  });

  it("Initialised correctly", () => {
    expect(gm.errors.length).toBe(0);
    expect(gm.black).toBe(10);
    expect(gm.white).toBe(10);
    expect(gm.green).toBe(10);
    expect(gm.blue).toBe(10);
    expect(gm.red).toBe(10);
    expect(gm.wild).toBe(5);
  });

  it("Adds returned coins", () => {
    const c: Cost = {
      black: 2,
      white: 1,
      red: 0,
      green: 4,
      blue: 5,
      wild: 3,
    };
    gm.returnToTreasury(c);
    expect(gm.errors.length).toBe(0);
    expect(gm.black).toBe(12);
    expect(gm.white).toBe(11);
    expect(gm.green).toBe(14);
    expect(gm.blue).toBe(15);
    expect(gm.red).toBe(10);
    expect(gm.wild).toBe(8);
  });

  it("Selecting of coins provides correct number", () => {
    const c: Cost = {
      black: 2,
      white: 1,
      red: 0,
      green: 4,
      blue: 5,
      wild: 3,
    };
    gm.returnToTreasury(c);

    expect(gm.selectGem(Gem.BLACK)).toBe(12);
    expect(gm.selectGem(Gem.WHITE)).toBe(11);
    expect(gm.selectGem(Gem.GREEN)).toBe(14);
    expect(gm.selectGem(Gem.BLUE)).toBe(15);
    expect(gm.selectGem(Gem.RED)).toBe(10);
    expect(gm.selectGem(Gem.WILD)).toBe(8);
  });
});

describe("Validity of gem claims", () => {
  let gm: GemManager;

  beforeEach(async () => {
    gm = new GemManager();
  });

  it("Valid single claim", () => {
    expect(gm.validClaim([Gem.BLACK])).toBeTruthy();
  });

  it("Valid triple claim", () => {
    expect(gm.validClaim([Gem.BLACK, Gem.BLUE, Gem.RED])).toBeTruthy();
  });

  // Invalid single claim
  // Invalid triple claim

  // Valid single wildcard claim
  // Valid triple wildcard claim
});

// Claim tests
