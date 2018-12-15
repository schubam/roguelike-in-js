import { createBuffer, TILE_SIZE, renderPaletteTile } from "../render.js";
import loadColorPalette from "../loaders/loadColorPalette.js";
import { isWall } from "../tryMovePlayer.js";

function scanline(rowY, row, playerX, playerY) {
  const viewMap = new Array(row.length);
  const visible = Symbol("visible");
  const nonVisible = Symbol("non-visible");

  if (Math.abs(rowY - playerY) > 3) {
    return new Array(row.length).map(i => nonVisible);
  }

  const left = row.slice(0, playerIdx).reverse();
  const right = row.slice(playerIdx + 1);

  const ret = [left, right].map(tiles => {
    let foundWall = 0;
    return tiles.map(tile => {
      if (foundWall > 0) {
        return nonVisible;
      }

      if (isWall(tile)) {
        foundWall++;
      }
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
  let y = player.position.y;
  const lines = [];
  do {
    const row = grid.getRow(x, y, Math.floor(camera.size.x / TILE_SIZE));
    lines.push(
      scanline(
        y,
        row,
        player.position.x + Math.floor(camera.pos.x / TILE_SIZE),
        player.position.y + Math.floor(camera.pos.y / TILE_SIZE)
      )
    );
    y += TILE_SIZE;
  } while (y < camera.pos.y + camera.size.y);
  // if (
  //   !visible(
  //     player.position,
  //     { x: Math.floor(x / TILE_SIZE), y: Math.floor(x / TILE_SIZE) },
  //     grid
  //   )
  // ) {
  //   renderPaletteTile("W", x, y, context, palette);
  // } else {
  //   console.log("vis");
  // }
  // }
  // }

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
