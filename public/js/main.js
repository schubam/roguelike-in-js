import { createGame } from "./redux/store.js";
import { playLevelFactory } from "./playLevelFactory.js";
import { testScreen } from "./testScreen.js";

async function main() {
  const canvas = document.getElementById("screen");
  const context = canvas.getContext("2d");
  const game = createGame();
  game.playLevel = await playLevelFactory(game, context);
  game.playLevel("1");
}

main();
testScreen();
