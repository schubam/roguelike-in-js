import { TILE_SIZE } from "../render.js";

function onScreen(pos, camera) {
  const left = camera.pos.x;
  const right = camera.pos.x + camera.size.x;
  const up = camera.pos.y;
  const down = camera.pos.y + camera.size.y;

  if (pos.x < left || pos.x > right || pos.y < up || pos.y > down) {
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
        x: entity.pos.x - camera.pos.x,
        y: entity.pos.y - camera.pos.y + TILE_SIZE
      };
      if (onScreen(pos, camera)) {
        context.drawImage(spriteBuffer, pos.x, pos.y);
      }
    });
  };
}
