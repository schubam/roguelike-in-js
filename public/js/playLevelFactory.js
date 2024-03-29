import Camera from "./camera.js";
import { loadEntities } from "./entityFactory.js";
import { setupInput } from "./input.js";
import { createFOVLayer } from "./layers/createFOVLayer.js";
import { createUserInterfaceLayer } from "./layers/createUserInterface.js";
import { playerStartingPosition } from "./levelData.js";
import { createLevelLoader } from "./loaders/createLevelLoader.js";
import { loadFont } from "./loaders/loadFont.js";
import { createLevelStore, dispatchAll } from "./redux/store.js";
import { TILE_SIZE } from "./render.js";
import Timer from "./timer.js";

export async function playLevelFactory(game, context) {
  const font = await loadFont();
  const entityFactories = await loadEntities();
  const levelLoader = createLevelLoader(entityFactories);
  const levelStore = createLevelStore();
  setupInput(game, levelStore);

  return function(levelname) {
    levelLoader(levelname).then(levelData => {
      const { level, grid, byTile } = levelData;
      const camera = new Camera(
        { x: 0, y: 0 },
        { x: 16 * TILE_SIZE, y: 12 * TILE_SIZE },
        grid.width,
        grid.height
      );
      const player = entityFactories["player"]();
      const pos = playerStartingPosition(level.grid);
      player.pos = { x: TILE_SIZE * pos.x, y: TILE_SIZE * pos.y };
      level.setUI(createUserInterfaceLayer(font, game, levelStore));
      level.addEntity(player);

      const timer = new Timer(1 / 60);
      timer.update = function(dt) {
        level.update(dt);
        level.draw(context, camera);
        camera.move(player.pos);
        
        level.updateUI(context);
      };
      timer.start();
      levelStore.subscribe(() => {
        const ppos = levelStore.getState().player.position;
        const direction = levelStore.getState().player.direction;
        if (direction) {
          player.movement.animateTo(
            player,
            ppos.x * TILE_SIZE,
            ppos.y * TILE_SIZE,
            direction
          );
        }
        // TODO uncomment to enable FOV
        // createFOVLayer(camera, levelStore).then(layer => level.setFOV(layer));
      });
      dispatchAll({ type: "LEVEL_LOADED", grid, byTile, level });
    });
  };
}
