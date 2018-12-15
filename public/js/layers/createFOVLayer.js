import { createBuffer, TILE_SIZE, renderPaletteTile } from "../render.js";
import loadColorPalette from "../loaders/loadColorPalette.js";
import { isWall } from "../tryMovePlayer.js";

function scanline(row, pos) {
  function castRay(start, direction, row) {
    let i = start.x;
    let previous = undefined;
    const fovMap = new Array(row.length);
    for (; i === 0 || i < row.length; i += direction) {
      if (previous) {
        if (isWall(fovMap[previous])) {
          fovMap[i] = false;
        } else {
          fovMap[i] = true;
        }
      } else {
        fovMap[i] = true;
      }
      previous = index;
    }
    return fovMap;
  }
  const viewMap = castRay(pos.x, -1, row);
  return viewMap;
}

export async function createFOVLayer(camera, levelStore) {
  const palette = await loadColorPalette();
  const { level, player } = levelStore.getState();
  const { grid } = level;
  const buffer = createBuffer(camera.size.x, camera.size.y);
  const context = buffer.getContext("2d");

  context.clearRect(0, 0, buffer.width, buffer.height);

  let x = Math.floor(camera.pos.x / TILE_SIZE);
  const xmax = (camera.pos.x + camera.size.x) / TILE_SIZE;
  let y = Math.floor(camera.pos.y / TILE_SIZE);
  const ymax = Math.floor((camera.pos.y + camera.size.y) / TILE_SIZE);

  for (y; Math.floor(y / TILE_SIZE) < ymax; y += TILE_SIZE) {
    const row = grid.getRow(x, y, Math.floor(camera.size.x / TILE_SIZE));
    scanline(row, player.position);
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
  }

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
