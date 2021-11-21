import { FunctionComponent } from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import "./test.css";
import { Card, Gem } from "./Card";
import { generateCardId } from "./CardBoard";
import { borderCardColour } from "./CardOutline";

interface IGemCard {
  card: Card;
}

interface IGem {
  w: string;
  h: string;
  value?: number;
}

const BlueGem: FunctionComponent<IGem> = ({ w, h, value }) => {
  return (
    <Box
      h={h}
      w={w}
      background=" radial-gradient(circle at 19px 20px, blue, #000)"
      shadow="radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 50%)"
      justifyContent="center"
    >
      <div className="shadow" />
      {value ?? value}
    </Box>
  );
};

const GreenGem: FunctionComponent<IGem> = ({ w, h, value }) => {
  return (
    <Box w={w} h={h} className="greenGem">
      <div className="shadow" />
      {value ?? value}
    </Box>
  );
};

const BlackGem: FunctionComponent<IGem> = ({ w, h, value }) => {
  return (
    <Box w={w} h={h} className="blackGem">
      <div className="shadow" />
      {value ?? value}
    </Box>
  );
};

const RedGem: FunctionComponent<IGem> = ({ w, h, value }) => {
  return (
    <Box h={h} w={w} className="redGem">
      <div className="shadow" />
      {value ?? value}
    </Box>
  );
};

const WhiteGem: FunctionComponent<IGem> = ({ w, h, value }) => {
  return (
    <Box
      h={h}
      w={w}
      background=" radial-gradient(circle at 19px 20px, white, #000)"
      shadow="radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 50%)"
      justifyContent="center"
    >
      <div className="shadow" />
      {value ?? value}
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
      case Gem.RED:
        return <RedGem w={w} h={h} value={value} />;
      case Gem.BLACK:
        return <BlackGem w={w} h={h} value={value} />;
      case Gem.BLUE:
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
  return (
    <Flex
      justifyContent="right"
      justifyItems="right"
      alignContent="center"
      alignItems="center"
      flexDirection="row-reverse"
      background="purple"
    >
      <GemRewardComponent gem={card.reward} w="20px" h="20px" />
    </Flex>
  );
};

const calculateCost = (card: Card) => {
  const dict = {};
  if (card.blackCost != 0) {
    // @ts-ignore
    dict[Gem.BLACK] = card.blackCost;
  }
  if (card.whiteCost != 0) {
    // @ts-ignore
    dict[Gem.WHITE] = card.whiteCost;
  }
  if (card.greenCost != 0) {
    // @ts-ignore
    dict[Gem.GREEN] = card.greenCost;
  }
  if (card.blueCost != 0) {
    // @ts-ignore
    dict[Gem.BLUE] = card.blueCost;
  }
  if (card.redCost != 0) {
    // @ts-ignore
    dict[Gem.RED] = card.redCost;
  }
  return dict;
};

const CostComponent: FunctionComponent<IGemCard> = ({ card }) => {
  const costs = calculateCost(card);
  return (
    <Grid
      templateRows="repeat(6, 1fr)"
      templateColumns="repeat(2, 1fr)"
      gap={4}
      bg="pink"
    >
      <GridItem rowSpan={1} colSpan={2} bg="tomato">
        <CardReward card={card} />
      </GridItem>
      {Object.entries(costs).map(([key, cost]) => {
        // console.log(generateCardId(card) + key + "-" + cost);
        return (
          <div id={generateCardId(card) + key + "-" + cost}>
            <GridItem bg="green">
              <GemRewardComponent
                gem={key as Gem}
                h="20px"
                w="20px"
                value={cost as number}
              />
            </GridItem>
            <GridItem />
          </div>
        );
      })}
    </Grid>
  );
};

const GemCard: FunctionComponent<IGemCard> = ({ card }) => {
  const borderColour =
    card.reward == Gem.BLACK ? "orange" : borderCardColour(card.tier);
  return (
    <Box
      w="100%"
      h="20vh"
      flexGrow={1}
      justifyContent="center"
      className="shiny"
      border="8px"
      borderStyle="outset"
      bg="burlywood"
      borderColor={borderColour}
    >
      <CostComponent card={card} />
    </Box>
  );
};

export { GemCard };
