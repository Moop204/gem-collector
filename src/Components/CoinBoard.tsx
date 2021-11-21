import { Box, Center, Circle, Grid, GridItem } from "@chakra-ui/layout";
import { observer } from "mobx-react-lite";
import { FunctionComponent, useEffect, useState } from "react";
import { Engine } from "../Engine/Engine";

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
          <Box h="100px">
            <CoinPile
              height={blue}
              top="blue"
              edge="darkblue"
              outline="black"
            />
          </Box>
          <Center>{blue}</Center>
        </GridItem>
        <GridItem>
          <Box h="100px">
            <CoinPile
              height={green}
              top="lightgreen"
              edge="green"
              outline="black"
            />
          </Box>
          <Center>{green}</Center>
        </GridItem>
        <GridItem>
          <Box h="100px">
            <CoinPile
              height={white}
              top="#E2E8F0"
              edge="darkgrey"
              outline="black"
            />
          </Box>{" "}
          <Center>{white}</Center>
        </GridItem>
        <GridItem>
          <Box h="100px">
            <CoinPile
              height={black}
              top="#4A5568"
              edge="#1A202C"
              outline="black"
            />
          </Box>{" "}
          <Center>{black}</Center>
        </GridItem>
        <GridItem>
          <Box h="100px">
            <CoinPile height={red} top="red" edge="darkred" outline="black" />
          </Box>{" "}
          <Center>{red}</Center>
        </GridItem>
        <GridItem>
          <Box h="100px">
            <CoinPile
              height={wild}
              top="orange"
              edge="tomato"
              outline="black"
            />
          </Box>{" "}
          <Center>{wild}</Center>
        </GridItem>
      </Grid>
    </Box>
  );
};

// https://stackoverflow.com/questions/24670899/create-cylinder-shape-in-pure-css-3d
interface CoinDescription {
  edge: string;
  top: string;
  outline: string;
}

const Coin: FunctionComponent<CoinDescription> = ({ edge, top, outline }) => {
  const width = "60px";
  const heightMid = "8px";
  const heightEdge = "25px";
  const verticalTranslate = -80;
  const left = "5vh";
  return (
    <Box bg="whitesmoke">
      <Center h="30vh">
        <Box position="relative">
          <Box
            width={width}
            height={heightEdge}
            bg={edge}
            borderRadius="60px/25px"
            position="absolute"
            border={["1px", outline, "solid"].join(" ")}
            top={-14 + verticalTranslate}
            left={left}
            boxShadow="0px 0px 10px rgba(0,0,0,0.75)"
          />
          <Box
            width={width}
            height={heightMid}
            top={-10 + verticalTranslate}
            border="1px"
            borderLeft={["1px", outline, "solid"].join(" ")}
            borderRight={["1px", outline, "solid"].join(" ")}
            backgroundColor={edge}
            position="absolute"
            left={left}
          />
          <Box
            width={width}
            height={heightEdge}
            bg={top}
            border="1px"
            borderColor={outline}
            borderStyle="solid"
            borderRadius="60px/25px"
            position="absolute"
            top={-25 + verticalTranslate}
            left={left}
          />
        </Box>
      </Center>
    </Box>
  );
};

interface Pile extends CoinDescription {
  height: number;
}
const CoinPile: FunctionComponent<Pile> = ({ height, top, edge, outline }) => {
  const positions: number[] = [];
  for (let i = 0; i < height; i++) {
    positions.push((7 - i) * 10);
  }
  // positions.reverse();
  const [selected, setSelected] = useState(-1);
  useEffect(() => {}, []);

  const handleClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      alignContent="center"
      bg="yellow"
    >
      {/* <Center> */}
      {positions.map((position) => {
        return (
          <Box
            position="absolute"
            top={position}
            onClick={handleClick}
            key={top + position}
          >
            {position < selected ? (
              <Coin top={top} edge={"yellow"} outline={outline} />
            ) : (
              <Coin top={top} edge={edge} outline={outline} />
            )}
          </Box>
        );
      })}
      {/* </Center> */}
      {/* <Box position="absolute" top="120">
        <Coin />
      </Box>
      <Box position="absolute" top="100">
        <Coin />
      </Box>
      <Box position="absolute" top="80">
        <Coin />
      </Box>
      <Box position="absolute" top="60">
        <Coin />
      </Box>
      <Box position="absolute" top="40">
        <Coin />
      </Box>
      <Box position="absolute" top="20">
        <Coin />
      </Box>
      <Box position="absolute" top="">
        <Coin />
      </Box> */}
    </Box>
  );
};

export default observer(CoinBoard);
