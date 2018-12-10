import { loadEntities } from "./entityFactory.js";
import { setupInput } from "./input.js";
import { playerStartingPosition } from "./levelData.js";
import { createLevelLoader } from "./loaders/createLevelLoader.js";
import { loadFont } from "./loaders/loadFont.js";
import loadSpriteSheet from "./loaders/loadSpriteSheet.js";
import { TILE_SIZE } from "./render.js";
import { createGame } from "./store.js";
import Timer from "./timer.js";
import { createUserInterfaceLayer } from "./userInterface.js";
import * as States from "./components/states.js";

async function main() {
  const canvas = document.getElementById("screen");
  const context = canvas.getContext("2d");
  const store = createGame();

  const camera = {
    pos: { x: 0, y: 0 },
    size: { x: 16 * TILE_SIZE, y: 12 * TILE_SIZE }
  };

  setupInput(store, camera);

  const startLevel = await Promise.all([loadFont(), loadEntities()]).then(
    ([font, entityFactories]) => {
      const levelLoader = createLevelLoader(entityFactories);
      return function(levelname) {
        levelLoader(levelname).then(levelData => {
          const { level, grid, byTile } = levelData;
          const pos = playerStartingPosition(level.grid);
          const player = entityFactories["player"]();
          player.pos = { x: TILE_SIZE * pos.x, y: TILE_SIZE * pos.y };
          level.addEntity(player);

          level.addLayer(createUserInterfaceLayer(font, store));

          const timer = new Timer(1 / 60);
          timer.update = function(dt) {
            level.update(dt);
            level.draw(context, camera);
            cameraFollowsPlayer(player.pos, level);
          };
          timer.start();

          store.subscribe(() => {
            const ppos = store.getState().player.position;
            const direction = store.getState().player.direction;
            if (direction) {
              player.movement.animateTo(
                player,
                ppos.x * TILE_SIZE,
                ppos.y * TILE_SIZE,
                direction
              );
            }
          });

          store.dispatch({ type: "LEVEL_LOADED", grid, byTile, level });
        });
      };
    }
  );

  startLevel("2");

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
}

main();

async function testScreen() {
  const canvas = document.getElementById("testScreen");
  const context = canvas.getContext("2d");
  const dude = await loadSpriteSheet("character");
  const hero = await loadSpriteSheet("chara_hero");
  const dungeon = await loadSpriteSheet("tiles_dungeon");

  drawAllSprites([hero, dude, dungeon]);

  function drawAllSprites(sheets) {
    let index = 0;
    sheets.forEach(sheet => {
      sheet.tiles.forEach((_, key) => {
        sheet.drawTile(key, context, index % 16, Math.floor(index / 16));
        console.log(key);
        index++;
      });
    });
  }
}

testScreen();
