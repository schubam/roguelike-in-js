import { TILE_SIZE } from "../render.js";

function onScreen(pos, camera, tile) {
  const left = camera.pos.x;
  const right = camera.pos.x + camera.size.x;
  const up = camera.pos.y;
  const down = camera.pos.y + camera.size.y;

  if (pos.x < left || pos.x >= right || pos.y < up || pos.y >= down) {
    // console.log(tile);
    // console.log(left, right, up, down);
    // console.log(pos.x, pos.y);
    return false;
  }
  return true;
}

export default function createSpriteLayer(entities, width, height) {
  const spriteBuffer = document.createElement("canvas");
  spriteBuffer.width = width;
  spriteBuffer.height = height;
  const spriteBufferContext = spriteBuffer.getContext("2d");

  return function(context, camera) {
    entities.forEach(entity => {
      spriteBufferContext.clearRect(0, 0, width, height);
      entity.draw(spriteBufferContext);
      const pos = {
        x: Math.max(entity.pos.x - camera.pos.x, 0),
        y: Math.max(entity.pos.y - camera.pos.y + TILE_SIZE, 0)
      };
      if (onScreen(pos, camera, entity.tile)) {
        context.drawImage(spriteBuffer, pos.x, pos.y);
      }
    });
  };
}
