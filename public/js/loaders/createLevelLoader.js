import createBackgroundLayer from "../layers/createBackgroundLayer.js";
import createItemLayer from "../layers/createItemLayer.js";
import createSpriteLayer from "../layers/createSpriteLayer.js";
import Level from "../level.js";
import { loadLevelData } from "../levelData.js";
import { TILE_SIZE } from "../render.js";
import loadColorPalette from "./loadColorPalette.js";
import loadSpriteSheet from "./loadSpriteSheet.js";

async function setupBackground(grid, level, sprites, palette) {
  level.addLayer(await createBackgroundLayer(grid, sprites, palette));
}

async function setupItems(byTile, level, sprites, palette) {
  level.addLayer(await createItemLayer(byTile, level, sprites, palette));
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
    const sprites = await loadSpriteSheet("tiles_dungeon");
    const palette = await loadColorPalette();
    const { grid, byTile, levelSpec } = await loadLevelData(name);
    const level = new Level(grid);
    await setupBackground(grid, level, sprites);
    await setupItems(byTile, level, sprites, palette);
    setupEntities(levelSpec, level, entityFactories);
    return { level, grid, byTile };
  };
}
