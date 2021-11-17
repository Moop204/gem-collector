import { ColorMode } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { Colors } from "@chakra-ui/theme";
import { FunctionComponent } from "react";
import { Gem } from "./Card";

interface BoughtCardDetail {
  gem: Gem;
  tier: 1 | 2 | 3;
}
export const CardOutline: FunctionComponent<BoughtCardDetail> = ({
  gem,
  tier,
}) => {
  // Darker border colour
  let border: string;
  switch (tier) {
    case 3:
      border = "blue";
      break;
    case 2:
      border = "green";
      break;
    case 1:
      border = "red";
      break;
    default:
      border = "pink";
  }
  // Lighter colour for background
  let gemColour: string;
  switch (gem) {
    case Gem.BLACK:
      gemColour = "#2D3748";
      break;
    case Gem.WHITE:
      gemColour = "#CBD5E0";
      break;
    case Gem.RED:
      gemColour = "#FC8181";
      break;
    case Gem.GREEN:
      gemColour = "lightgreen";
      break;
    case Gem.BLUE:
      gemColour = "lightblue";
      break;
    default:
      gemColour = "pink";
  }

  return (
    <Box
      w="100%"
      h="20vh"
      flexGrow={1}
      justifyContent="center"
      border="8px"
      borderStyle="outset"
      bg={gemColour}
      borderColor={border}
    />
  );
};
