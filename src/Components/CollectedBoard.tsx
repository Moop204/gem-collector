import { Button } from "@chakra-ui/button";
import { Grid, GridItem, Box } from "@chakra-ui/layout";
import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import { Engine } from "../Engine/Engine";
import { Gem } from "./Card";
import { CardOutline } from "./CardOutline";

const translationOwnedCards = 64;

const OwnedCard = ({
  translate,
  gem,
  tier,
}: {
  translate: number;
  gem: Gem;
  tier: number;
}) => {
  return (
    <Box position="absolute" top={translate + "vh"} h="30%" w="8%">
      <CardOutline gem={gem} tier={tier as 1 | 2 | 3} />
    </Box>
  );
};

interface EngineStore {
  store: Engine;
}

export const CollectedBoard: FunctionComponent<EngineStore> = observer(
  ({ store }) => {
    return (
      <Grid
        templateColumns="repeat(5, 1fr)"
        gap={4}
        bg="lightblue"
        w="100%"
        h="100%"
      >
        <GridItem bg="red" id="first-thingo" alignSelf="left" marginLeft="4px">
          {store.player.cRed.map((c, i) => {
            return (
              <OwnedCard
                translate={translationOwnedCards + 4 * i}
                tier={c.tier}
                gem={c.reward}
              />
            );
          })}
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          {store.player.cGreen.map((c, i) => {
            return (
              <OwnedCard
                translate={translationOwnedCards + 4 * i}
                tier={c.tier}
                gem={c.reward}
              />
            );
          })}
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          {store.player.cBlue.map((c, i) => {
            return (
              <OwnedCard
                translate={translationOwnedCards + 4 * i}
                tier={c.tier}
                gem={c.reward}
              />
            );
          })}
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          {store.player.cWhite.map((c, i) => {
            return (
              <OwnedCard
                translate={translationOwnedCards + 4 * i}
                tier={c.tier}
                gem={c.reward}
              />
            );
          })}
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          {store.player.cBlack.map((c, i) => {
            return (
              <OwnedCard
                translate={translationOwnedCards + 4 * i}
                tier={c.tier}
                gem={c.reward}
              />
            );
          })}
        </GridItem>
      </Grid>
    );
  }
);
