import { FunctionComponent } from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import "./test.css";
import { Card, Gem } from "./Card";
import { borderCardColour } from "./CardOutline";
import { Bonus } from "./Bonus";

interface IBonusCard {
  card: Bonus;
}

export const generateBonusId = (c: Bonus): string => {
  return (
    c.requirement.black +
    "-" +
    c.requirement.blue +
    "-" +
    c.requirement.green +
    "-" +
    c.requirement.red +
    "-" +
    c.requirement.white +
    "-" +
    c.reward
  );
};

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
  value: number;
  gem: Gem;
}

const RewardComponent: FunctionComponent<IReward> = ({ value, w, h, gem }) => {
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

  return <></>;
};

const CardReward: FunctionComponent<{ card: Bonus }> = ({ card }) => {
  return (
    <Flex
      justifyContent="right"
      justifyItems="right"
      alignContent="center"
      alignItems="center"
      flexDirection="row-reverse"
      background="purple"
    >
      {card.reward}
      {/* <RewardComponent value={card.reward} w="20px" h="20px" /> */}
    </Flex>
  );
};

const calculateCost = (card: Bonus) => {
  const dict = {};
  if (card.requirement.black != 0) {
    // @ts-ignore
    dict[Gem.BLACK] = card.requirement.black;
  }
  if (card.requirement.white != 0) {
    // @ts-ignore
    dict[Gem.WHITE] = card.requirement.white;
  }
  if (card.requirement.green != 0) {
    // @ts-ignore
    dict[Gem.GREEN] = card.requirement.green;
  }
  if (card.requirement.blue != 0) {
    // @ts-ignore
    dict[Gem.BLUE] = card.requirement.blue;
  }
  if (card.requirement.red != 0) {
    // @ts-ignore
    dict[Gem.RED] = card.requirement.red;
  }
  return dict;
};

const CostComponent: FunctionComponent<IBonusCard> = ({ card }) => {
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
        const uniqueKey = generateBonusId(card) + key + "-" + cost;
        return (
          <div id={uniqueKey} key={uniqueKey}>
            <GridItem bg="green">
              <RewardComponent
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

const BonusCard: FunctionComponent<IBonusCard> = ({ card }) => {
  const borderColour = "yellow";
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

export { BonusCard };
