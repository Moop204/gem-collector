import { Button } from "@chakra-ui/button";
import { Grid, GridItem, Box } from "@chakra-ui/layout";
import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import { Engine } from "../Engine/Engine";
import { Gem } from "./Card";
import { CardOutline } from "./CardOutline";

const translationOwnedCards = 28;

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
          {/* <Box
          position="absolute"
          top={translationOwnedCards + "vh"}
          h="30%"
          w="8%"
        >
          <CardOutline gem={Gem.BLUE} tier={2} />
        </Box> */}
          <OwnedCard
            translate={translationOwnedCards}
            tier={2}
            gem={Gem.BLUE}
          />
          <OwnedCard
            translate={translationOwnedCards + 4}
            tier={2}
            gem={Gem.BLUE}
          />
          <OwnedCard
            translate={translationOwnedCards + 8}
            tier={2}
            gem={Gem.BLUE}
          />
          <OwnedCard
            translate={translationOwnedCards + 12}
            tier={2}
            gem={Gem.BLUE}
          />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <OwnedCard
            translate={translationOwnedCards}
            tier={1}
            gem={Gem.GREEN}
          />
          <OwnedCard
            translate={translationOwnedCards + 4}
            tier={1}
            gem={Gem.GREEN}
          />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <OwnedCard translate={translationOwnedCards} tier={1} gem={Gem.RED} />
          <OwnedCard
            translate={translationOwnedCards + 4}
            tier={2}
            gem={Gem.RED}
          />
          <OwnedCard
            translate={translationOwnedCards + 8}
            tier={3}
            gem={Gem.RED}
          />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Box position="absolute" top={translationOwnedCards + "vh"}>
            <CardOutline gem={Gem.BLUE} tier={2} />
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Box position="absolute" top={translationOwnedCards + "vh"}>
            <CardOutline gem={Gem.BLUE} tier={2} />
          </Box>
          <Box position="absolute" top={translationOwnedCards + 4 + "vh"}>
            <CardOutline gem={Gem.BLUE} tier={2} />
          </Box>
        </GridItem>

        <Button
          onClick={async () => {
            await store.cardSelection(2, 0);
            console.log("have this many blues " + store.player.cBlue);
          }}
        >
          {" "}
          DRAW A CARD!!!{" "}
        </Button>
      </Grid>
    );
  }
);
