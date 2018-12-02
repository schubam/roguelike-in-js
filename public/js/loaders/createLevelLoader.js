import Level from "../level.js";
import { loadLevelData } from "../levelData.js";
import createBackgroundLayer from "../layers/createBackgroundLayer.js";
import createSpriteLayer from "../layers/createSpriteLayer.js";
import { TILE_SIZE } from "../render.js";
import createItemLayer from "../layers/createItemLayer.js";
import loadColorPalette from "./loadColorPalette.js";
import loadSpriteSheet from "./loadSpriteSheet.js";

function setupBackground(grid, level, palette) {
  level.addLayer(createBackgroundLayer(grid, palette));
}

function setupItems(byTile, level, palette) {
  level.addLayer(createItemLayer(byTile, level, palette));
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
    const palette = await loadColorPalette();
    const { grid, byTile, levelSpec } = await loadLevelData(name);
    const level = new Level(grid);
    setupBackground(grid, level, palette);
    setupItems(byTile, level, palette);
    setupEntities(levelSpec, level, entityFactories);
    return { level, grid, byTile };
  };
}
