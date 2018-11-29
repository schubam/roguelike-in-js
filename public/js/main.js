import { loadEntities } from "./entityFactory.js";
import { loadFont } from "./font.js";
import { setupInput } from "./input.js";
import { createLevelLoader } from "./levelLoader.js";
import { TILE_SIZE } from "./render.js";
import { createGame } from "./store.js";
import Timer from "./timer.js";
import { createUserInterfaceLayer } from "./userInterface.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");
const store = createGame();

const camera = {
  pos: { x: 0, y: 0 },
  size: { x: 32 * TILE_SIZE, y: 26 * TILE_SIZE }
};

setupInput(store, camera);

Promise.all([loadFont(), loadEntities()]).then(([font, entityFactories]) => {
  const levelLoader = createLevelLoader(entityFactories);
  levelLoader("1").then(level => {
    level.addLayer(createUserInterfaceLayer(font, store));

    const timer = new Timer(1 / 60);
    timer.update = function(dt) {
      level.update(dt);
      level.draw(context, camera);
    };
    timer.start();

    store.subscribe(() => {});

    store.dispatch({ type: "LEVEL_LOADED", grid: level.grid });
  });
});