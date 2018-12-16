import { createBuffer, TILE_SIZE, renderPaletteTile } from "../render.js";
import loadColorPalette from "../loaders/loadColorPalette.js";
import { isWall } from "../tryMovePlayer.js";

const visible = Symbol("visible");
const nonVisible = Symbol("non-visible");

function scanline(rowY, row, playerX, playerY) {
  const viewMap = new Array(row.length);
  const yDistance = Math.abs(rowY - playerY);
  if (yDistance > 3) {
    for (let i = 0; i < viewMap.length; i++) {
      viewMap[i] = nonVisible;
    }
    return viewMap;
  } else if (yDistance === 3) {
    for (let i = 0; i < viewMap.length; i++) {
      viewMap[i] = nonVisible;
    }
    return viewMap;
  } else if (yDistance === 2) {
    for (let i = 0; i < viewMap.length; i++) {
      viewMap[i] = nonVisible;
    }
    return viewMap;
  } else if (yDistance === 1) {
    for (let i = 0; i < viewMap.length; i++) {
      viewMap[i] = nonVisible;
    }
    return viewMap;
  } else if (yDistance === 0) {
    // rowY === playerY
    const left = row.slice(0, playerX).reverse();
    const right = row.slice(playerX + 1);

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
  do {
    console.log(y);
    const row = grid.getRow(x, y, Math.floor(camera.size.x / TILE_SIZE));
    lines.push(
      scanline(
        Math.floor(y / TILE_SIZE),
        row,
        player.position.x + Math.floor(camera.pos.x / TILE_SIZE),
        player.position.y + Math.floor(camera.pos.y / TILE_SIZE)
      )
    );
    y += TILE_SIZE;
  } while (y < camera.pos.y + camera.size.y);
  console.log(lines);
  lines.forEach((line, y) => {
    line.forEach((tile, x) => {
      if (tile === visible) {
        console.log("vis");
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
