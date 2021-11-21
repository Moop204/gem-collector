import { Button } from "@chakra-ui/button";
import { Box, Center, Circle, Grid, GridItem } from "@chakra-ui/layout";
import { observer } from "mobx-react-lite";
import { FunctionComponent, useEffect, useState } from "react";
import { Engine } from "../Engine/Engine";
import { Gem } from "./Card";
import { CoinPile } from "./CoinPile";

interface CoinsState {
  store: Engine;
}
const CoinBoard: FunctionComponent<CoinsState> = ({ store }) => {
  const black = store.economy.black;
  const white = store.economy.white;
  const blue = store.economy.blue;
  const red = store.economy.red;
  const green = store.economy.green;
  const wild = store.economy.wild;

  const [selection, setSelection] = useState<Gem[]>([]);

  const handleSelection = (colour: Gem) => {
    const dupe = selection.indexOf(colour);
    if (colour == Gem.WILD) {
      setSelection([Gem.WILD]);
      return;
    }

    if (dupe != -1) {
      selection.splice(dupe, 1);
      setSelection([...selection]);
      console.log("Duped");
    } else {
      if (selection.length < 3) {
        console.log("YES");
        setSelection([...selection.filter((g) => g != Gem.WILD), colour]);
      } else {
        console.log("Too big");
      }
    }

    console.log("|");
    for (const a in selection) {
      console.log(a);
    }
  };

  return (
    <Box bg="burlywood">
      <Grid templateColumns="repeat(6, 1fr)" w="100%" gap={4}>
        <GridItem bg={selection.includes(Gem.BLUE) ? "yellow" : "green"}>
          <CoinPile
            transform={0}
            height={blue}
            top="blue"
            edge="darkblue"
            outline="black"
          />
          <Center>{blue}</Center>
          <Button onClick={() => handleSelection(Gem.BLUE)}>Buy</Button>
        </GridItem>
        <GridItem bg={selection.includes(Gem.GREEN) ? "yellow" : "green"}>
          <CoinPile
            transform={0}
            height={green}
            top="lightgreen"
            edge="green"
            outline="black"
          />
          <Center>{green}</Center>
          <Button onClick={() => handleSelection(Gem.GREEN)}>Buy</Button>
        </GridItem>
        <GridItem bg={selection.includes(Gem.WHITE) ? "yellow" : "green"}>
          <CoinPile
            transform={0}
            height={white}
            top="#E2E8F0"
            edge="darkgrey"
            outline="black"
          />
          <Center>{white}</Center>
          <Button onClick={() => handleSelection(Gem.WHITE)}>Buy</Button>
        </GridItem>
        <GridItem bg={selection.includes(Gem.BLACK) ? "yellow" : "green"}>
          <CoinPile
            transform={0}
            height={black}
            top="#4A5568"
            edge="#1A202C"
            outline="black"
          />
          <Center>{black}</Center>
          <Button onClick={() => handleSelection(Gem.BLACK)}>Buy</Button>
        </GridItem>
        <GridItem bg={selection.includes(Gem.RED) ? "yellow" : "green"}>
          <CoinPile
            transform={0}
            height={red}
            top="red"
            edge="darkred"
            outline="black"
          />
          <Center>{red}</Center>
          <Button onClick={() => handleSelection(Gem.RED)}>Buy</Button>
        </GridItem>
        <GridItem bg={selection.includes(Gem.WILD) ? "yellow" : "green"}>
          <CoinPile
            transform={0}
            height={wild}
            top="orange"
            edge="tomato"
            outline="black"
          />
          <Center>{wild}</Center>
          <Button onClick={() => handleSelection(Gem.WILD)}>Buy</Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default observer(CoinBoard);
