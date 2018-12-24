import { createBuffer, TILE_SIZE, renderPaletteTile } from "../render.js";
import loadColorPalette from "../loaders/loadColorPalette.js";
import { isWall } from "../tryMovePlayer.js";

const visible = Symbol("visible");
const nonVisible = Symbol("non-visible");

function scanline(rowY, row, playerX, playerY) {
  const left = row.slice(0, playerX).reverse();
  const right = row.slice(playerX + 1);

  const ret = [left, right].map(tiles => {
    let foundWall = 0;
    return tiles.map((tile, idx) => {
      if (foundWall > 0) {
        return nonVisible;
      }

      if (isWall(tile)) {
        foundWall++;
      }

      // if (idx > 3) {
      //   return nonVisible;
      // }

      return visible;
    });
  });
  return [...ret[0].reverse(), visible, ...ret[1]];
}

export async function createFOVLayer(camera, levelStore) {
  const palette = await loadColorPalette();
  const { level, player } = levelStore.getState();
  const { grid } = level;
  const buffer = createBuffer(camera.size.x, camera.size.y);
  const context = buffer.getContext("2d");

  context.clearRect(0, 0, buffer.width, buffer.height);

  const x = camera.pos.x;
  let y = Math.floor(camera.pos.y / TILE_SIZE);
  const lines = [];
  const s = Math.floor(camera.size.x / TILE_SIZE);
  do {
    const yTile = Math.floor(y / TILE_SIZE);
    const row = grid.getRow(x, yTile, s);
    lines.push(
      scanline(
        yTile,
        row,
        player.position.x + Math.floor(camera.pos.x / TILE_SIZE),
        player.position.y + Math.floor(camera.pos.y / TILE_SIZE)
      )
    );
    y += TILE_SIZE;
  } while (y < camera.pos.y + camera.size.y);
  lines.forEach((line, y) => {
    line.forEach((tile, x) => {
      if (tile === visible) {
      } else {
        renderPaletteTile("W", x, y, context, palette);
      }
    });
  });
  return function(context, camera) {
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
