import { createBackgroundLayer } from "./backgroundLayer.js";
import { createSpriteLayer } from "./spriteLayer.js";
import Compositor from "./compositor.js";
import { loadLevelData } from "./levelData.js";

class Level {
  constructor(grid) {
    this.grid = grid;
    this.entities = new Set();
    this.compositor = new Compositor();
  }

  addLayer(layer) {
    this.compositor.add(layer);
  }

  addEntity(entity) {
    this.entities.add(entity);
  }

  draw(context, camera) {
    this.compositor.draw(context, camera);
  }

  update(dt) {
    this.entities.forEach(entity => {
      entity.update(dt);
    });
  }
}

function setupBackground(grid, level) {
  level.addLayer(createBackgroundLayer(grid));
}

function setupEntities(spec, level, entityFactory) {
  spec.enemies.forEach(({ name, x, y }) => {
    const e = entityFactory();
    e.pos = { x: x*16, y: y*16 };
    level.addEntity(e);
  });
  level.addLayer(createSpriteLayer(level.entities, 16, 16));
}

export function createLevelLoader(entityFactory) {
  return async function(name) {
    const { grid, levelSpec } = await loadLevelData(name);
    const level = new Level(grid);
    setupBackground(grid, level);
    setupEntities(levelSpec, level, entityFactory);
    return level;
  };
}
