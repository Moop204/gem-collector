import { GridItem } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import { Engine } from "../Engine/Engine";
import { Gem } from "./Card";
import { CoinBoard } from "./CoinBoard";

interface IEngine {
  store: Engine;
}
const UseEngine: FunctionComponent<IEngine> = ({ store }) => {
  return (
    <GridItem rowSpan={2} colSpan={4} bg="blue">
      <CoinBoard
        black={store.economy.black}
        blue={store.economy.blue}
        green={store.economy.green}
        white={store.economy.white}
        red={store.economy.red}
        wild={store.economy.wild}
      />
      <Button
        onClick={() => {
          store.gemSelection([Gem.BLUE]);
          console.log(store.gemDetail(Gem.BLUE));
        }}
      >
        click me!
      </Button>
    </GridItem>
  );
};

export default observer(UseEngine);
