import { TILE_SIZE } from "./constants.js";

export function drawLevel(indexToPosition) {
  return function(context, fields) {
    fields.forEach((tile, index) => {
      let { x, y } = indexToPosition(index);
      switch (tile) {
        case " ":
          drawFloor(context, x, y);
          break;

        case "W":
          drawWall(context, x, y);
          break;

        case "D":
          drawDoor(context, x, y);
          break;

        case "X":
          drawTreasure(context, x, y);
          break;

        case "@":
          drawPlayerStarting(context, x, y);
          break;

        default:
          break;
      }
    });
  };
}

export function drawPlayer(context, playerPosition) {
  context.fillStyle = "red";
  context.fillRect(
    playerPosition.x * TILE_SIZE,
    playerPosition.y * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE
  );
}

function drawPlayerStarting(context, x, y) {
  context.fillStyle = "blue";
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawDoor(context, x, y) {
  context.fillStyle = "brown";
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawTreasure(context, x, y) {
  context.fillStyle = "yellow";
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawWall(context, x, y) {
  context.fillStyle = "darkgrey";
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawFloor(context, x, y) {
  context.fillStyle = "darkgreen";
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  context.strokeStyle = "black";
  context.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}
