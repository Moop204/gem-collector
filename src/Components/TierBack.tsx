import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { FunctionComponent } from "react";

interface DeckType {
  tier: string;
  bg: string;
  borderColor: string;
}

export const TierBack: FunctionComponent<DeckType> = ({
  tier,
  bg,
  borderColor,
}) => {
  return (
    <Flex
      w="5vw"
      h="15vh"
      bg={bg}
      flex="wraps"
      border="8px"
      borderStyle="outset"
      borderColor={borderColor}
      color="white"
    >
      <Center width="100%">
        <Text fontFamily="Georgia" fontSize={32}>
          {tier}
        </Text>
      </Center>
    </Flex>
  );
};

export const Tier1: FunctionComponent<{}> = () => {
  return <TierBack bg="#a73020" borderColor={"#c72317"} tier="I" />;
};

export const Tier2: FunctionComponent<{}> = () => {
  return <TierBack bg="#20a720" borderColor={"#17c717"} tier="II" />;
};

export const Tier3: FunctionComponent<{}> = () => {
  return <TierBack bg="#2066a7" borderColor={"#17c1c7"} tier="III" />;
};
