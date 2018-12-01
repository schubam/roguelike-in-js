import { loadEntities } from "./entityFactory.js";
import { loadFont } from "./loaders/loadFont.js";
import { setupInput } from "./input.js";
import { createLevelLoader } from "./levelLoader.js";
import { TILE_SIZE } from "./render.js";
import { createGame } from "./store.js";
import Timer from "./timer.js";
import { createUserInterfaceLayer } from "./userInterface.js";
import { playerStartingPosition } from "./levelData.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");
const store = createGame();

const camera = {
  pos: { x: 0, y: 0 },
  size: { x: 16 * TILE_SIZE, y: 11 * TILE_SIZE }
};

setupInput(store, camera);

Promise.all([loadFont(), loadEntities()]).then(([font, entityFactories]) => {
  const levelLoader = createLevelLoader(entityFactories);
  levelLoader("1").then(level => {
    const pos = playerStartingPosition(level.grid);
    const player = entityFactories["player"]();
    player.pos = { x: TILE_SIZE * pos.x, y: TILE_SIZE * pos.y };
    level.addEntity(player);

    level.addLayer(createUserInterfaceLayer(font, store));

    const timer = new Timer(1 / 60);
    timer.update = function(dt) {
      level.update(dt);
      level.draw(context, camera);
    };
    timer.start();

    store.subscribe(() => {
      let ppos = store.getState().player.position;
      player.pos = { x: ppos.x * TILE_SIZE, y: ppos.y * TILE_SIZE };
      cameraFollowsPlayer(player.pos, level);
    });

    store.dispatch({ type: "LEVEL_LOADED", grid: level.grid });
  });
});

function cameraFollowsPlayer(pos, level) {
  camera.pos.x = Math.min(
    Math.max(0, pos.x - camera.size.x / 2),
    level.grid.width * TILE_SIZE - camera.size.x
  );
  camera.pos.y = Math.min(
    Math.max(0, pos.y - 5 * TILE_SIZE),
    level.grid.height * TILE_SIZE - camera.size.y
  );
}
