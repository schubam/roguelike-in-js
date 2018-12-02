import { createBuffer, TILE_SIZE, renderPaletteTile } from "../render.js";

export default function createBackgroundLayer(grid, palette) {
  const { width, height } = grid;
  const buffer = createBuffer(width, height);
  const context = buffer.getContext("2d");

  context.clearRect(0, 0, buffer.width, buffer.height);
  for (let x = 0; x < grid.width * grid.height; x++) {
    const col = grid.data[x];
    if (col) {
      col.forEach((tile, y) => {
        if ("W" === tile) {
          renderPaletteTile(tile, x, y, context, palette);
        } else {
          renderPaletteTile(" ", x, y, context, palette);
        }
      });
    }
  }

  return function render(context, camera) {
    context.drawImage(
      buffer,
      camera.pos.x,
      camera.pos.y,
      camera.size.x,
      camera.size.y,
      0,
      TILE_SIZE,
      camera.size.x,
      camera.size.y
    );
  };
}
