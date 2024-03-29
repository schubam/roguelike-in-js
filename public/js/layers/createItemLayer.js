import { TILE_SIZE, renderPaletteTile, renderSpriteTile } from "../render.js";
import createSpriteLayer from "../layers/createSpriteLayer.js";
import GameObject from "../gameObject.js";

function makeItem(tile, x, y, sprites, palette) {
  const entity = new GameObject();
  entity.tile = tile;
  entity.draw = function(context) {
    if ([..."KDX>"].includes(tile)) {
      renderSpriteTile(tile, 0, 0, context, sprites);
    } else {
      // renderPaletteTile(tile, 0, 0, context, palette);
    }
  };
  entity.pos = { x: x * TILE_SIZE, y: y * TILE_SIZE };
  entity.update = function(dt, byTile) {
    if (!byTile) return;
    try {
      const collection = byTile[this.tile];
      if (collection) {
        const self = byTile[this.tile].filter(
          e => e.x === this.pos.x && e.y === this.pos.y
        )[0];
        if (self) {
          level.items.remove(self);
        }
      }
    } catch (error) {
      console.error(error, tile);
    }
  };
  return entity;
}

export default function createItemLayer(byTile, level, sprites, palette) {
  Object.keys(byTile).forEach(tile => {
    byTile[tile].forEach(({ x, y }) => {
      if (!(tile === " " || tile === "W")) {
        level.addItem(makeItem(tile, x, y, sprites, palette));
      }
    });
  });
  return createSpriteLayer(level.items, TILE_SIZE, TILE_SIZE);
}
