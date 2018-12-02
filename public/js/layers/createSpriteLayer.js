import { TILE_SIZE } from "../render.js";

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
      context.drawImage(spriteBuffer, pos.x, pos.y);
    });
  };
}
