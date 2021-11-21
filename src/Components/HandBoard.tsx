import { Box, Center, Circle, Grid, GridItem } from "@chakra-ui/layout";
import { observer } from "mobx-react-lite";
import { FunctionComponent, useEffect, useState } from "react";
import { Engine } from "../Engine/Engine";
import { CoinPile } from "./CoinPile";

interface CoinsState {
  store: Engine;
}
export const HandBoard: FunctionComponent<CoinsState> = observer(
  ({ store }) => {
    const black = store.player.black;
    const white = store.player.white;
    const blue = store.player.blue;
    const red = store.player.red;
    const green = store.player.green;
    const wild = store.player.wild;

    return (
      <Box bg="burlywood">
        <Grid templateColumns="repeat(6, 1fr)" w="100%" gap={4}>
          <GridItem
            flexDir="column"
            bg="green"
            alignItems="center"
            justifyContent="center"
            alignContent="center"
          >
            <CoinPile
              transform={344}
              height={blue}
              top="blue"
              edge="darkblue"
              outline="black"
            />
            <Center>{blue}</Center>
          </GridItem>
          <GridItem>
            <CoinPile
              transform={344}
              height={green}
              top="lightgreen"
              edge="green"
              outline="black"
            />
            <Center>{green}</Center>
          </GridItem>
          <GridItem>
            <CoinPile
              transform={344}
              height={white}
              top="#E2E8F0"
              edge="darkgrey"
              outline="black"
            />
            <Center>{white}</Center>
          </GridItem>
          <GridItem>
            <CoinPile
              transform={344}
              height={black}
              top="#4A5568"
              edge="#1A202C"
              outline="black"
            />
            <Center>{black}</Center>
          </GridItem>
          <GridItem>
            <CoinPile
              transform={344}
              height={red}
              top="red"
              edge="darkred"
              outline="black"
            />
            <Center>{red}</Center>
          </GridItem>
          <GridItem>
            <CoinPile
              transform={344}
              height={wild}
              top="orange"
              edge="tomato"
              outline="black"
            />
            <Center>{wild}</Center>
          </GridItem>
        </Grid>
      </Box>
    );
  }
);
