import { loadEntities } from "./entityFactory.js";
import { loadFont } from "./font.js";
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
  size: { x: 16 * TILE_SIZE, y: 12 * TILE_SIZE }
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
      cameraFollowsPlayer(player, level);
    });

    store.dispatch({ type: "LEVEL_LOADED", grid: level.grid });
  });
});

function cameraFollowsPlayer(player, level) {
  let ppos = store.getState().player.position;
  player.pos = { x: ppos.x * TILE_SIZE, y: ppos.y * TILE_SIZE };
  camera.pos.x = Math.min(
    Math.max(0, player.pos.x - Math.floor(camera.size.x * 0.5)),
    level.grid.width * TILE_SIZE - camera.size.x
  );
  camera.pos.y = Math.min(
    Math.max(0, player.pos.y - Math.floor(camera.size.y * 0.5)),
    (level.grid.height - 1) * TILE_SIZE - camera.size.y
  );
}
