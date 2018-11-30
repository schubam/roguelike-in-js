import { createBuffer, renderTile, TILE_SIZE } from "./render.js";

class TileResolver {
  constructor(grid, tileSize) {
    this.grid = grid;
    this.tileSize = tileSize;
  }

  toIndex(pos) {
    return Math.floor(pos / this.tileSize);
  }
}

export function createBackgroundLayer(grid) {
  const resolver = new TileResolver(grid, TILE_SIZE);
  const { width, height } = grid;
  const buffer = createBuffer(width, height);
  const context = buffer.getContext("2d");

  // function redraw(startIndex, endIndex) {
  context.clearRect(0, 0, buffer.width, buffer.height);
  for (let x = 0; x < grid.width * grid.height; x++) {
    const col = grid.data[x];
    if (col) {
      col.forEach((tile, y) => {
        renderTile(tile, x, y, context);
      });
    }
  }
  // }

  return function render(context, camera) {
    // const drawWidth = resolver.toIndex(camera.size.x);
    // const drawFrom = resolver.toIndex(camera.pos.x);
    // const drawHeightFrom = camera.pos.y * TILE_SIZE;
    // const drawHeightTo = drawHeightFrom + camera.size.y;
    // const drawTo = drawFrom + drawWidth;
    // redraw(drawFrom, drawTo);
    // context.drawImage(
    //   buffer,
    //   -camera.pos.x % TILE_SIZE,
    //   -camera.pos.y + TILE_SIZE
    // );
    context.drawImage(
      buffer,
      camera.pos.x,
      camera.pos.y,
      camera.size.x,
      camera.size.y,
      0,
      TILE_SIZE,
      camera.size.x,
      camera.size.y + TILE_SIZE
    );
  };
}
