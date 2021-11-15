// import { BoardManager } from "./Engine/BoardManager";
import { Engine } from "./Engine/Engine";

const e = new Engine();

while (!e.isWon()) {
  e.nextPhase();
}
