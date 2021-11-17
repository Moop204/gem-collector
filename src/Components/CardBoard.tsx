import { FunctionComponent, useState } from "react";
import { GemCard } from "./GemCard";
import { Grid, GridItem } from "@chakra-ui/react";
import { Tier1, Tier2, Tier3, TierBack } from "./TierBack";
import { observer } from "mobx-react-lite";
import { Engine } from "../Engine/Engine";

interface EngineStore {
  store: Engine;
}

const BonusRow: FunctionComponent<{}> = () => {
  return (
    <>
      <GridItem id="bonus-row" rowSpan={1} colSpan={5}>
        <Grid templateColumns="repeat(5, 1fr)" columnGap={24}>
          <GridItem bg="blue" />
          <GridItem bg="orange">{/* <GemCard /> */}</GridItem>
          <GridItem bg="green">{/* <GemCard /> */}</GridItem>
          <GridItem bg="blue">{/* <GemCard /> */}</GridItem>
          <GridItem bg="red">{/* <GemCard /> */}</GridItem>
        </Grid>
      </GridItem>
    </>
  );
};

const Tier3Row: FunctionComponent<EngineStore> = observer(({ store }) => {
  // if (store.board.isLoaded) {
  // const tierRow = store.board.getTier3;
  // console.log(store.board.getTier3);
  return (
    <>
      <GridItem rowSpan={1} colSpan={5} bg="blue">
        <Grid templateColumns="repeat(5, 1fr)" gap={24}>
          <GridItem rowSpan={1} colSpan={1} bg="blue">
            <Tier3 />
          </GridItem>
          {store.board.getTier3.map((card) => {
            console.log(card);
            return (
              <GridItem
                key={
                  card.blackCost +
                  "-" +
                  card.blueCost +
                  "-" +
                  card.greenCost +
                  "-" +
                  card.redCost +
                  "-" +
                  card.whiteCost +
                  "-" +
                  card.reward
                }
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

const Tier1Row: FunctionComponent<EngineStore> = observer(({ store }) => {
  return (
    <>
      <GridItem rowSpan={1} colSpan={5} bg="blue">
        <Grid templateColumns="repeat(5, 1fr)" gap={24}>
          <GridItem rowSpan={1} colSpan={1} bg="blue">
            <Tier1 />
          </GridItem>
          {store.board.getTier1.map((card) => {
            return (
              <GridItem
                key={
                  card.blackCost +
                  "-" +
                  card.blueCost +
                  "-" +
                  card.greenCost +
                  "-" +
                  card.redCost +
                  "-" +
                  card.whiteCost +
                  "-" +
                  card.reward
                }
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
          {store.board.getTier2.map((card) => {
            return (
              <GridItem
                key={
                  card.blackCost +
                  "-" +
                  card.blueCost +
                  "-" +
                  card.greenCost +
                  "-" +
                  card.redCost +
                  "-" +
                  card.whiteCost +
                  "-" +
                  card.reward
                }
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
      <BonusRow />
      <Tier3Row store={store} />
      <Tier2Row store={store} />
      <Tier1Row store={store} />
    </Grid>
  );
};

export default observer(CardBoard);
