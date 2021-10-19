import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { GemCard } from "./GemCard";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Tier1, Tier2, Tier3, TierBack } from "./TierBack";
import { CardBoard } from "./CardBoard";
import { CoinBoard } from "./CoinBoard";
import { HandBoard } from "./HandBoard";

function App() {
  const [count, setCount] = useState(0);

  const translationOwnedCards = 28;
  return (
    <div>
      <Grid
        h="100vh"
        w="100vw"
        templateRows="repeat(8, 1fr)"
        templateColumns="repeat(8, 1fr)"
        gap={16}
      >
        <GridItem rowSpan={8} colSpan={4} bg="blue">
          <CardBoard />
        </GridItem>
        <GridItem rowSpan={2} colSpan={4} bg="blue">
          <CoinBoard black={3} blue={3} green={2} white={7} red={4} wild={5} />
        </GridItem>

        <GridItem rowSpan={3} colSpan={4} bg="pink">
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <GridItem rowSpan={1} colSpan={1}>
              <Box position="absolute" top={translationOwnedCards + "vh"}>
                <GemCard />
              </Box>
              <Box position="absolute" top={translationOwnedCards + 4 + "vh"}>
                <GemCard />
              </Box>
              <Box position="absolute" top={translationOwnedCards + 8 + "vh"}>
                <GemCard />
              </Box>
              <Box position="absolute" top={translationOwnedCards + 12 + "vh"}>
                <GemCard />
              </Box>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Box position="absolute" top={translationOwnedCards + "vh"}>
                <GemCard />
              </Box>
              <Box position="absolute" top={translationOwnedCards + 4 + "vh"}>
                <GemCard />
              </Box>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Box position="absolute" top={translationOwnedCards + "vh"}>
                <GemCard />
              </Box>
              <Box position="absolute" top={translationOwnedCards + 4 + "vh"}>
                <GemCard />
              </Box>
              <Box position="absolute" top={translationOwnedCards + 8 + "vh"}>
                <GemCard />
              </Box>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Box position="absolute" top={translationOwnedCards + "vh"}>
                <GemCard />
              </Box>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Box position="absolute" top={translationOwnedCards + "vh"}>
                <GemCard />
              </Box>
              <Box position="absolute" top={translationOwnedCards + 4 + "vh"}>
                <GemCard />
              </Box>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem rowSpan={3} colSpan={4} bg="purple">
          <HandBoard />
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
