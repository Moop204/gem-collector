import { useEffect, useState } from "react";
import "./App.css";
import { GemCard } from "./Components/GemCard";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import CardBoard from "./Components/CardBoard";
import CoinBoard from "./Components/CoinBoard";
import { HandBoard } from "./Components/HandBoard";
import { Engine } from "./Engine/Engine";
import { Gem } from "./Components/Card";
import { CollectedBoard } from "./Components/CollectedBoard";
function App() {
  const [engine, setEngine] = useState(new Engine());

  return (
    <Grid
      h="100vh"
      w="100%"
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
            setEngine(engine);
          }}
        >
          click me!
        </Button>
      </GridItem>
      <GridItem rowSpan={3} colSpan={4} bg="purple">
        <HandBoard store={engine} />
      </GridItem>

      <GridItem rowSpan={3} colSpan={4} bg="pink">
        <CollectedBoard store={engine} />
      </GridItem>
    </Grid>
  );
}

export default App;
