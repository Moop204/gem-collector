import { Card, CardInitialiser, Gem, Tier } from "./Card";

const initialiseBlack = (): number[][] => {
  const rawNum: number[][] = [];
  //
  rawNum.push(
    [0, 1, 0, 1, 1, 1, 1],
    [0, 1, 0, 0, 1, 0, 2],
    [0, 1, 0, 2, 0, 0, 2],
    [0, 1, 1, 0, 3, 0, 1],
    [0, 1, 0, 0, 0, 0, 3],
    [0, 1, 0, 1, 1, 2, 1],
    [0, 1, 0, 2, 1, 2, 0],
    [1, 1, 0, 0, 0, 4, 0],
    [1, 2, 0, 3, 0, 2, 2],
    [1, 2, 2, 3, 0, 0, 3],
    [2, 2, 0, 0, 2, 1, 4],
    [2, 2, 0, 5, 0, 0, 0],
    [2, 2, 0, 0, 3, 0, 5],
    [3, 2, 6, 0, 0, 0, 0],
    [3, 3, 0, 3, 3, 3, 5],
    [4, 3, 0, 0, 7, 0, 0],
    [4, 3, 3, 0, 6, 0, 3],
    [5, 3, 3, 0, 7, 0, 0]
  );
  return rawNum;
};

const initialiseBlue = (): number[][] => {
  const rawNum: number[][] = [];
  //
  rawNum.push(
    [0, 1, 2, 1, 0, 0, 0],
    [0, 1, 1, 1, 2, 0, 1],
    [0, 1, 1, 1, 1, 0, 1],
    [0, 1, 0, 0, 1, 1, 3],
    [0, 1, 3, 0, 0, 0, 0],
    [0, 1, 0, 1, 2, 0, 2],
    [0, 1, 2, 0, 0, 0, 2],
    [1, 1, 0, 0, 4, 0, 0],
    [1, 2, 0, 0, 3, 2, 2],
    [1, 2, 3, 0, 0, 2, 3],
    [2, 2, 0, 5, 0, 3, 0],
    [2, 2, 0, 0, 0, 5, 0],
    [2, 2, 4, 2, 1, 0, 0],
    [3, 2, 0, 0, 0, 6, 0],
    [3, 3, 5, 3, 3, 0, 3],
    [4, 3, 0, 7, 0, 0, 0],
    [4, 3, 3, 6, 0, 3, 0],
    [5, 3, 0, 7, 0, 3, 0]
  );
  return rawNum;
};

const initialiseGreen = (): number[][] => {
  const rawNum: number[][] = [];
  //
  rawNum.push(
    [0, 1, 0, 2, 0, 1, 0],
    [0, 1, 0, 0, 2, 2, 0],
    [0, 1, 0, 1, 0, 3, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 1, 2, 1, 1, 1, 0],
    [0, 1, 2, 0, 2, 1, 0],
    [0, 1, 0, 0, 3, 0, 0],
    [1, 1, 4, 0, 0, 0, 0],
    [1, 2, 0, 3, 3, 0, 2],
    [1, 2, 2, 2, 0, 3, 0],
    [2, 2, 1, 4, 0, 2, 0],
    [2, 2, 0, 0, 0, 0, 5],
    [2, 2, 0, 0, 0, 5, 3],
    [3, 2, 0, 0, 0, 0, 6],
    [3, 3, 3, 5, 3, 3, 0],
    [4, 3, 0, 3, 0, 6, 3],
    [4, 3, 0, 0, 0, 7, 0],
    [5, 3, 0, 0, 0, 7, 3]
  );
  return rawNum;
};

const initialiseRed = (): number[][] => {
  const rawNum: number[][] = [];
  //
  rawNum.push(
    [0, 1, 0, 3, 0, 0, 0],
    [0, 1, 3, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 2, 1],
    [0, 1, 2, 2, 0, 0, 1],
    [0, 1, 1, 2, 0, 1, 1],
    [0, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 2, 2, 0, 0],
    [1, 1, 0, 4, 0, 0, 0],
    [1, 2, 3, 0, 2, 3, 0],
    [1, 2, 3, 2, 2, 0, 0],
    [2, 2, 0, 1, 0, 4, 2],
    [2, 2, 5, 3, 0, 0, 0],
    [2, 2, 5, 0, 0, 0, 0],
    [3, 2, 0, 0, 6, 0, 0],
    [3, 3, 3, 3, 0, 5, 3],
    [4, 3, 0, 0, 0, 0, 7],
    [4, 3, 0, 0, 3, 3, 6],
    [5, 3, 0, 0, 3, 0, 7]
  );
  return rawNum;
};

const initialiseWhite = (): number[][] => {
  const rawNum = [
    [0, 1, 1, 0, 0, 2, 2],
    [0, 1, 1, 0, 2, 0, 0],
    [0, 1, 1, 0, 1, 1, 1],
    [0, 1, 0, 0, 0, 3, 0],
    [0, 1, 0, 0, 0, 2, 2],
    [0, 1, 1, 0, 1, 1, 2],
    [0, 1, 1, 3, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 4],
    [1, 2, 2, 0, 2, 0, 3],
    [1, 2, 0, 2, 3, 3, 0],
    [2, 2, 2, 0, 4, 0, 1],
    [2, 2, 0, 0, 5, 0, 0],
    [2, 2, 3, 0, 5, 0, 0],
    [3, 2, 0, 6, 0, 0, 0],
    [3, 3, 3, 0, 5, 3, 3],
    [4, 3, 7, 0, 0, 0, 0],
    [4, 3, 6, 3, 3, 0, 0],
    [5, 3, 7, 3, 0, 0, 0],
  ];
  return rawNum;
};

const cardWrapper = (g: Gem, values: number[][]): Card[] => {
  return values.map(
    ([point, tier, blackCost, whiteCost, redCost, blueCost, greenCost]) => {
      const initialiser: CardInitialiser = {
        reward: g,
        tier: tier as Tier,
        point,
        blackCost,
        whiteCost,
        redCost,
        blueCost,
        greenCost,
      };
      return new Card(initialiser);
    }
  );
};

const fullDeck = (): Card[] => {
  return [
    ...cardWrapper(Gem.BLACK, initialiseBlack()),
    ...cardWrapper(Gem.BLUE, initialiseBlue()),
    ...cardWrapper(Gem.WHITE, initialiseWhite()),
    ...cardWrapper(Gem.GREEN, initialiseGreen()),
    ...cardWrapper(Gem.RED, initialiseRed()),
  ];
};

const referenceDeck = fullDeck();

export { fullDeck, referenceDeck };
