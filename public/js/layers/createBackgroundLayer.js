import { createBuffer, TILE_SIZE } from "../render.js";

function renderSpriteTile(tile, x, y, context, sprites) {
  let name;
  switch (tile) {
    case " ":
      name = "ground-generic";
      break;
    case "[":
      name = "wall-top-left";
      break;
    case "]":
      name = "wall-top-right";
      break;
    case "{":
      name = "wall-bottom-left";
      break;
    case "}":
      name = "wall-bottom-right";
      break;
    case "W":
      name = "wall-top-inner";
      break;
    case "|":
      name = "wall-side-inner";
      break;

    default:
      break;
  }
  sprites.drawTile(name, context, x, y);
}

export default async function createBackgroundLayer(grid, sprites) {
  const { width, height } = grid;
  const buffer = createBuffer(width, height);
  const context = buffer.getContext("2d");

  context.clearRect(0, 0, buffer.width, buffer.height);
  for (let x = 0; x < grid.width * grid.height; x++) {
    const col = grid.data[x];
    if (col) {
      col.forEach((tile, y) => {
        if ([..."W[]{}|"].includes(tile)) {
          renderSpriteTile(tile, x, y, context, sprites);
        } else {
          renderSpriteTile(" ", x, y, context, sprites);
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
