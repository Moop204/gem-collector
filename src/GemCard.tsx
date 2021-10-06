import { FunctionComponent } from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import "./test.css";

interface IGem {
  w: string;
  h: string;
  value: number;
}
const BlueGem: FunctionComponent<IGem> = ({ w, h, value }) => {
  return (
    <Box
      // bg="tomato"
      // w="7rem"
      // h="4rem"
      h={h}
      w={w}
      // // background=" radial-gradient(circle at 19px 20px, red, #000)"
      // background="blue"
      // // shadow="radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 50%)"
      // justifyContent="center"
      className="blueGem"
    >
      <div className="shadow" />
      {value}
    </Box>
  );
};

const GreenGem: FunctionComponent<IGem> = ({ w, h, value }) => {
  return (
    <Box
      // bg="tomato"
      w={w}
      h={h}
      // background=" radial-gradient(circle at 19px 20px, green, #000)"
      // background="blue"
      // // shadow="radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 50%)"
      // justifyContent="center"
      className="greenGem"
      // border="5px"
      // borderStyle="outset"
    >
      <div className="shadow" />
      {value}
    </Box>
  );
};

const BlackGem: FunctionComponent<IGem> = ({ w, h, value }) => {
  return (
    <Box
      // bg="tomato"
      w={w}
      h={h}
      // background=" radial-gradient(circle at 19px 20px, green, #000)"
      // background="blue"
      // // shadow="radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 50%)"
      // justifyContent="center"
      className="blackGem"
      // border="5px"
      // borderStyle="outset"
    >
      <div className="shadow" />
      {value}
    </Box>
  );
};

const RedGem: FunctionComponent<IGem> = ({ w, h, value }) => {
  return (
    <Box
      // bg="tomato"
      // w="7rem"
      // h="4rem"
      h={h}
      w={w}
      // // background=" radial-gradient(circle at 19px 20px, red, #000)"
      // background="blue"
      // // shadow="radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 50%)"
      // justifyContent="center"
      className="redGem"
    >
      <div className="shadow" />
      {value}
    </Box>
  );
};

const CardReward: FunctionComponent<{}> = () => {
  return (
    <GridItem
      rowSpan={2}
      colSpan={5}
      bg="tomato"
      // justifyContent="right"
      // justifyItems="right"
      // alignContent="right"
      // alignItems="right"
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
        <BlueGem w="20px" h="20px" value={1} />
      </Flex>
    </GridItem>
  );
};

const CostComponent: FunctionComponent<{}> = () => {
  return (
    <Grid
      templateRows="repeat(6, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <CardReward />
      <GridItem rowSpan={1} colSpan={2} bg="tomato">
        {/* <BlueGem w="20px" h="20px" value={1} /> */}
      </GridItem>
      <GridItem colSpan={2} bg="papayawhip" />
      <GridItem
        rowSpan={1}
        colSpan={2}
        bg="tomato"
        justifyContent="center"
        justifyItems="center"
      >
        {/* <RedGem w="35px" h="20px" value={2} /> */}
      </GridItem>
      <GridItem colSpan={2} bg="papayawhip" />
      <GridItem rowSpan={1} colSpan={2} bg="tomato">
        {/* <GreenGem w="30px" h="20px" value={3} /> */}
      </GridItem>
      <GridItem colSpan={2} bg="papayawhip" />
      <GridItem rowSpan={1} colSpan={2} bg="tomato">
        {/* <BlackGem w="35px" h="20px" value={4} /> */}
      </GridItem>
      <GridItem colSpan={2} bg="papayawhip" />
    </Grid>
  );
};

const GemCard: FunctionComponent<{}> = () => {
  return (
    <div>
      <Box
        // bg="tomato"
        w="5vw"
        h="15vh"
        justifyContent="center"
        className="shiny"
        border="8px"
        borderStyle="outset"
        bg="burlywood"
        borderColor="#3a84c3"
      >
        <CostComponent />
      </Box>
    </div>
  );
};

export { GemCard };
