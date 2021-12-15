import { FunctionComponent, useState } from "react";
import { GemCard } from "./GemCard";
import { Grid, GridItem } from "@chakra-ui/react";
import { Tier1, Tier2, Tier3, TierBack } from "./TierBack";
import { observer } from "mobx-react-lite";
import { Engine } from "../Engine/Engine";
import { Card } from "./Card";
import { Bonus, BonusInitialiser } from "./Bonus";
import { BonusCard } from "./BonusCard";

interface EngineStore {
  store: Engine;
}

export const generateCardId = (c: Card): string => {
  return (
    c.blackCost +
    "-" +
    c.blueCost +
    "-" +
    c.greenCost +
    "-" +
    c.redCost +
    "-" +
    c.whiteCost +
    "-" +
    c.reward
  );
};

const BonusRow: FunctionComponent<EngineStore> = observer(({ store }) => {
  return (
    <>
      <GridItem id="bonus-row" rowSpan={1} colSpan={5}>
        <Grid templateColumns="repeat(5, 1fr)" columnGap={24}>
          {store.board.bonus.map((bonus: Bonus, i: number) => {
            return (
              <GridItem
                bg="blue"
                onClick={async () => {
                  await store.bonusSelection(i);
                }}
              >
                <BonusCard card={bonus} />
              </GridItem>
            );
          })}
        </Grid>
      </GridItem>
    </>
  );
});

const Tier1Row: FunctionComponent<EngineStore> = observer(({ store }) => {
  return (
    <>
      <GridItem rowSpan={1} colSpan={5} bg="blue">
        <Grid templateColumns="repeat(5, 1fr)" gap={24}>
          <GridItem rowSpan={1} colSpan={1} bg="blue">
            <Tier1 />
          </GridItem>
          {store.board.getTier1.map((card, i) => {
            return (
              <GridItem
                key={generateCardId(card) + "-1"}
                onClick={async () => {
                  await store.cardSelection(1, i);
                }}
              >
                <GemCard card={card} />
              </GridItem>
            );
          })}
        </Grid>
      </GridItem>
    </>
  );
});

const Tier2Row: FunctionComponent<EngineStore> = observer(({ store }) => {
  return (
    <>
      <GridItem rowSpan={1} colSpan={5} bg="blue">
        <Grid templateColumns="repeat(5, 1fr)" gap={24}>
          <GridItem rowSpan={1} colSpan={1} bg="blue">
            <Tier2 />
          </GridItem>
          {store.board.getTier2.map((card, i) => {
            return (
              <GridItem
                key={generateCardId(card) + "-2"}
                onClick={async () => {
                  await store.cardSelection(2, i);
                }}
              >
                <GemCard card={card} />
              </GridItem>
            );
          })}
        </Grid>
      </GridItem>
    </>
  );
});

const Tier3Row: FunctionComponent<EngineStore> = observer(({ store }) => {
  return (
    <>
      <GridItem rowSpan={1} colSpan={5} bg="blue">
        <Grid templateColumns="repeat(5, 1fr)" gap={24}>
          <GridItem rowSpan={1} colSpan={1} bg="blue">
            <Tier3 />
          </GridItem>
          {store.board.getTier3.map((card, i) => {
            return (
              <GridItem
                key={generateCardId(card) + "-3"}
                onClick={async () => {
                  await store.cardSelection(3, i);
                }}
              >
                <GemCard card={card} />
              </GridItem>
            );
          })}
        </Grid>
      </GridItem>
    </>
  );
  // } else return <div>wait</div>;
});

const CardBoard: FunctionComponent<EngineStore> = ({ store }) => {
  return (
    <Grid
      id="inner-app"
      w="100%"
      h="100%"
      templateRows="repeat(4, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={24}
    >
      <BonusRow store={store} />
      <Tier3Row store={store} />
      <Tier2Row store={store} />
      <Tier1Row store={store} />
    </Grid>
  );
};

export default observer(CardBoard);
