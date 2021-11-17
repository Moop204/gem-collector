import { useEffect, useState } from "react";
import "./App.css";
import { GemCard } from "./Components/GemCard";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import CardBoard from "./Components/CardBoard";
import CoinBoard from "./Components/CoinBoard";
import { HandBoard } from "./Components/HandBoard";
import { Engine } from "./Engine/Engine";
import { Gem } from "./Components/Card";
function App() {
  const [count, setCount] = useState(0);
  const [engine, setEngine] = useState(new Engine());

  const store = new Engine();
  // console.log(engine.board.tier1);
  // engine.board.drawCard(1, "lD9QQAppZRwEPEn2Ng");
  console.log(engine.board.board);
  console.log(engine.board.board[0]);

  // return (
  //   <div className="App">
  //     <UseEngine store={store} />
  //   </div>
  // );

  const translationOwnedCards = 28;
  return (
    <Grid
      h="100vh"
      w="100vw"
      templateRows="repeat(8, 1fr)"
      templateColumns="repeat(8, 1fr)"
      gap={16}
    >
      <GridItem rowSpan={8} colSpan={4} bg="blue">
        <CardBoard store={engine} />
      </GridItem>
      <GridItem rowSpan={2} colSpan={4} bg="blue">
        <CoinBoard store={engine} />
        <Button
          onClick={() => {
            engine.gemSelection([Gem.BLUE]);
            console.log(engine.economy.black);
            setEngine(engine);
          }}
        >
          click me!
        </Button>
      </GridItem>

      <GridItem rowSpan={3} colSpan={4} bg="pink">
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <GridItem rowSpan={1} colSpan={1}>
            <Box position="absolute" top={translationOwnedCards + "vh"}>
              {/* <GemCard /> */}
            </Box>
            <Box position="absolute" top={translationOwnedCards + 4 + "vh"}>
              {/* <GemCard /> */}
            </Box>
            <Box position="absolute" top={translationOwnedCards + 8 + "vh"}>
              {/* <GemCard /> */}
            </Box>
            <Box position="absolute" top={translationOwnedCards + 12 + "vh"}>
              {/* <GemCard /> */}
            </Box>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Box position="absolute" top={translationOwnedCards + "vh"}>
              {/* <GemCard /> */}
            </Box>
            <Box position="absolute" top={translationOwnedCards + 4 + "vh"}>
              {/* <GemCard /> */}
            </Box>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Box position="absolute" top={translationOwnedCards + "vh"}>
              {/* <GemCard /> */}
            </Box>
            <Box position="absolute" top={translationOwnedCards + 4 + "vh"}>
              {/* <GemCard /> */}
            </Box>
            <Box position="absolute" top={translationOwnedCards + 8 + "vh"}>
              {/* <GemCard /> */}
            </Box>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Box position="absolute" top={translationOwnedCards + "vh"}>
              {/* <GemCard /> */}
            </Box>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Box position="absolute" top={translationOwnedCards + "vh"}>
              {/* <GemCard /> */}
            </Box>
            <Box position="absolute" top={translationOwnedCards + 4 + "vh"}>
              {/* <GemCard /> */}
            </Box>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem rowSpan={3} colSpan={4} bg="purple">
        <HandBoard />
      </GridItem>
    </Grid>
  );
}

export default App;
