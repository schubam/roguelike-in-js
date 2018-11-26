import Camera from "./camera.js";
import { loadFont } from "./font.js";
import { setupInput } from "./input.js";
import { loadLevel } from "./levelData.js";
import { createGame } from "./store.js";
import Compositor from "./compositor.js";
import { createUserInterfaceLayer } from "./userInterface.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");
const store = createGame();

setupInput(store);
const camera = new Camera(26, 26, store);
const compositor = new Compositor();

Promise.all([loadFont(), loadLevel("level1")]).then(([font, level]) => {
  compositor.add(createUserInterfaceLayer(font, store));

  store.subscribe(() => {
    compositor.draw(context);
    camera.render()(context);
  });

  store.dispatch({
    type: "LEVEL_LOADED",
    ...level,
    position: level.byTile.playerStartingPosition
  });
});
