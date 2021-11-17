import { FunctionComponent } from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import "./test.css";
import { Card, Gem } from "./Card";

interface IGemCard {
  card: Card;
}

interface IGem {
  w: string;
  h: string;
  value?: number;
}

const BlueGem: FunctionComponent<IGem> = ({ w, h, value = -1 }) => {
  return (
    <Box
      h={h}
      w={w}
      background=" radial-gradient(circle at 19px 20px, blue, #000)"
      shadow="radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 50%)"
      justifyContent="center"
    >
      <div className="shadow" />
      {value == -1 ?? value}
    </Box>
  );
};

const GreenGem: FunctionComponent<IGem> = ({ w, h, value = -1 }) => {
  return (
    <Box w={w} h={h} className="greenGem">
      <div className="shadow" />
      {value == -1 ?? value}
    </Box>
  );
};

const BlackGem: FunctionComponent<IGem> = ({ w, h, value = -1 }) => {
  return (
    <Box w={w} h={h} className="blackGem">
      <div className="shadow" />
      {value == -1 ?? value}
    </Box>
  );
};

const RedGem: FunctionComponent<IGem> = ({ w, h, value = -1 }) => {
  return (
    <Box h={h} w={w} className="redGem">
      <div className="shadow" />
      {value == -1 ?? value}
    </Box>
  );
};

const WhiteGem: FunctionComponent<IGem> = ({ w, h, value = -1 }) => {
  return (
    <Box
      h={h}
      w={w}
      background=" radial-gradient(circle at 19px 20px, white, #000)"
      shadow="radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 50%)"
      justifyContent="center"
    >
      <div className="shadow" />
      {value == -1 ?? value}
    </Box>
  );
};

interface IReward extends IGem {
  gem: Gem;
  value?: number;
}

const GemRewardComponent: FunctionComponent<IReward> = ({
  gem,
  w,
  h,
  value,
}) => {
  if (value) {
    switch (gem) {
      case "red":
        return <RedGem w={w} h={h} value={value} />;
      case "black":
        return <BlackGem w={w} h={h} value={value} />;
      case "blue":
        return <BlueGem w={w} h={h} value={value} />;
      case "white":
        return <WhiteGem w={w} h={h} value={value} />;
      case "green":
        return <GreenGem w={w} h={h} value={value} />;
    }
  }
  switch (gem) {
    case "red":
      return <RedGem w={w} h={h} />;
    case "black":
      return <BlackGem w={w} h={h} />;
    case "blue":
      return <BlueGem w={w} h={h} />;
    case "white":
      return <WhiteGem w={w} h={h} />;
    case "green":
      return <GreenGem w={w} h={h} />;
  }
  return <></>;
};

const CardReward: FunctionComponent<{ card: Card }> = ({ card }) => {
  console.log(card);
  return (
    <GridItem
      rowSpan={2}
      colSpan={5}
      bg="tomato"
      alignItems="center"
      alignContent="center"
    >
      <Flex
        justifyContent="right"
        justifyItems="right"
        alignContent="center"
        alignItems="center"
        flexDirection="row-reverse"
        background="purple"
      >
        <GemRewardComponent gem={card.reward} w="20px" h="20px" />
        <BlueGem w="20px" h="20px" value={1} />
      </Flex>
    </GridItem>
  );
};

const CostComponent: FunctionComponent<IGemCard> = ({ card }) => {
  return (
    <Grid
      templateRows="repeat(6, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <CardReward card={card} />
      <GridItem rowSpan={1} colSpan={2} bg="tomato">
        <BlueGem w="20px" h="20px" value={1} />
      </GridItem>
      <GridItem colSpan={2} bg="papayawhip" />
      <GridItem
        rowSpan={1}
        colSpan={2}
        bg="tomato"
        justifyContent="center"
        justifyItems="center"
      >
        <RedGem w="35px" h="20px" value={2} />
      </GridItem>
      <GridItem colSpan={2} bg="papayawhip" />
      <GridItem rowSpan={1} colSpan={2} bg="tomato">
        <GreenGem w="30px" h="20px" value={3} />
      </GridItem>
      <GridItem colSpan={2} bg="papayawhip" />
      <GridItem rowSpan={1} colSpan={2} bg="tomato">
        <BlackGem w="35px" h="20px" value={4} />
      </GridItem>
      <GridItem colSpan={2} bg="papayawhip" />
    </Grid>
  );
};

const GemCard: FunctionComponent<IGemCard> = ({ card }) => {
  return (
    <Box
      w="100%"
      h="15vh"
      flexGrow={1}
      justifyContent="center"
      className="shiny"
      border="8px"
      borderStyle="outset"
      bg="burlywood"
      borderColor="#3a84c3"
    >
      <CostComponent card={card} />
    </Box>
  );
};

export { GemCard };
