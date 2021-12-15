import { Box, Center } from "@chakra-ui/react";
import { FunctionComponent, useState, useEffect } from "react";

interface Pile extends CoinDescription {
  height: number;
  transform: number;
}
export const CoinPile: FunctionComponent<Pile> = ({
  transform,
  height,
  top,
  edge,
  outline,
}) => {
  const positions: number[] = [];
  for (let i = 0; i < height; i++) {
    positions.push((16 - i) * 10 + transform);
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
