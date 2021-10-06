import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { GemCard } from "./GemCard";
import { Grid, GridItem } from "@chakra-ui/react";
import { Tier1, Tier2, Tier3, TierBack } from "./TierBack";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Grid
        h="70vh"
        w="10vw"
        maxW="10vw"
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={24}
      >
        <GridItem rowSpan={1} colSpan={1} bg="blue"></GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>

        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <Tier3 />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <Tier2 />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <Tier1 />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="blue">
          <GemCard />
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
