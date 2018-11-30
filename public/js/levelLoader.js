import { createBackgroundLayer } from "./backgroundLayer.js";
import Compositor from "./compositor.js";
import { loadLevelData } from "./levelData.js";
import { TILE_SIZE } from "./render.js";
import { createSpriteLayer } from "./spriteLayer.js";
import { renderTile } from "./render.js";

class Level {
  constructor(grid) {
    this.grid = grid;
    this.entities = new Set();
    this.items = new Set();
    this.compositor = new Compositor();
  }

  addLayer(layer) {
    this.compositor.add(layer);
  }

  addEntity(entity) {
    this.entities.add(entity);
  }

  addItem(item) {
    this.items.add(item);
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

function setupItems(grid, level) {
  grid.forEach((tile, x, y) => {
    if (tile === " " || tile === "W") return;
    const item = {
      draw: function(context, camera) {
        renderTile(tile, 0, 0, context);
      },
      pos: { x: x * TILE_SIZE, y: y * TILE_SIZE }
    };
    level.addItem(item);
  });
  level.addLayer(createSpriteLayer(level.items, TILE_SIZE, TILE_SIZE));
}

function setupEntities(spec, level, entityFactories) {
  if (spec.enemies) {
    spec.enemies.forEach(({ name, x, y }) => {
      const e = entityFactories[name]();
      e.pos = { x: x * TILE_SIZE, y: y * TILE_SIZE };
      level.addEntity(e);
    });
  }
  level.addLayer(createSpriteLayer(level.entities, TILE_SIZE, TILE_SIZE));
}

export function createLevelLoader(entityFactories) {
  return async function(name) {
    const { grid, levelSpec } = await loadLevelData(name);
    const level = new Level(grid);
    setupBackground(grid, level);
    setupItems(grid, level);
    setupEntities(levelSpec, level, entityFactories);
    return level;
  };
}
