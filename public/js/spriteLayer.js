export function createSpriteLayer(entities, width, height) {
  const spriteBuffer = document.createElement("canvas");
  spriteBuffer.width = width;
  spriteBuffer.height = height;
  const spriteBufferContext = spriteBuffer.getContext("2d");

  return function(context, camera) {
    entities.forEach(entity => {
      spriteBufferContext.clearRect(0, 0, width, height);
      entity.draw(spriteBufferContext);

      context.drawImage(
        spriteBuffer,
        entity.pos.x - camera.pos.x,
        entity.pos.y - camera.pos.y
      );
    });
  };
}
