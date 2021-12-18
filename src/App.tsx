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
const App = () => {
  // const [engine, setEngine] = useState(new Engine());
  const [engine, setEngine] = useState<Engine>();

  useEffect(() => {
    const makeEngine = async () => {
      const e = await Engine.build();
      setEngine(e);
    };
    makeEngine();
    console.log("A thing");
  }, []);

  // if (!engine.board.loaded) {
  //   return <div>Loading...</div>;
  // }

  if (engine) {
    return (
      <Grid
        h="100vh"
        w="100%"
        templateRows="repeat(8, 1fr)"
        templateColumns="repeat(16, 1fr)"
        gap={16}
      >
        <GridItem rowSpan={8} colSpan={8} bg="blue">
          <CardBoard store={engine} />
        </GridItem>
        {/* <GridItem rowSpan={8} colSpan={1} bg="blue">
        <Button>Buy</Button>
      </GridItem> */}
        <GridItem rowSpan={2} colSpan={8} bg="blue">
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
        <GridItem rowSpan={3} colSpan={8} bg="purple">
          <HandBoard store={engine} />
        </GridItem>

        <GridItem rowSpan={3} colSpan={8} bg="pink">
          <CollectedBoard store={engine} />
        </GridItem>
      </Grid>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default App;
