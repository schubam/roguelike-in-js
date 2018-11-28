import Timer from "./timer.js";
import { loadFont } from "./font.js";
import { setupInput } from "./input.js";
import { createLevelLoader } from "./levelLoader.js";
import { TILE_SIZE } from "./render.js";
import { createGame } from "./store.js";
import { createUserInterfaceLayer } from "./userInterface.js";
import { loadSpriteSheet } from "./SpriteSheet.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");
const store = createGame();

const camera = {
  pos: { x: 0, y: 0 },
  size: { x: 32 * TILE_SIZE, y: 26 * TILE_SIZE }
};

setupInput(store, camera);

Promise.all([loadFont(), loadEntities()]).then(([font, entityFactory]) => {
  const levelLoader = createLevelLoader(entityFactory);
  levelLoader("1").then(level => {
    level.addLayer(createUserInterfaceLayer(font, store));

    // const dude = entityFactory();
    // level.addEntity(dude);

    const timer = new Timer(1 / 60);
    timer.update = function(dt) {
      level.update(dt);
      // dude.draw(context);
      level.draw(context, camera);
    };
    timer.start();

    store.subscribe(() => {});

    store.dispatch({ type: "LEVEL_LOADED", grid: level.grid });
  });
});

class Entity {
  constructor() {
    this.lifetime = 0;
  }

  update(dt, level) {
    this.lifetime += dt;
  }
}

function loadEntities() {
  return loadSpriteSheet("character").then(createEntityFactory);
}

function createEntityFactory(sprite) {
  const walkAnim = sprite.animations.get("dude-walk-right");
  function drawDude(context) {
    sprite.draw(walkAnim(this.lifetime), context, 0, 0);
  }

  return function createDude() {
    const dude = new Entity();
    dude.draw = drawDude;
    return dude;
  };
}
