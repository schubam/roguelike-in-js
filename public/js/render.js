import * as COLORS from "./colors.js";

const TILE_SIZE = 8;

export function createBuffer(width, height) {
  const buffer = document.createElement("canvas");
  buffer.width = width * TILE_SIZE;
  buffer.height = height * TILE_SIZE;
  return buffer;
}
export function drawLevel(width, height, data) {
  const buffer = createBuffer(width, height);
  const context = buffer.getContext("2d");

  data.forEach((tile, x, y) => {
    switch (tile) {
      case " ":
        drawFloor(context, x, y);
        break;

      case "W":
        drawWall(context, x, y);
        break;

      case "K":
        drawKey(context, x, y);
        break;

      case "D":
        drawDoor(context, x, y);
        break;

      case "X":
        drawTreasure(context, x, y);
        break;

      case "|":
      case undefined:
        drawOutOfBounds(context, x, y);
        break;

      case "@":
        drawPlayerStarting(context, x, y);
        break;

      default:
        break;
    }
  });
  return function(ctx) {
    ctx.drawImage(buffer, 0, 0);
  };
}

export function drawPlayer(width, height, pos) {
  const buffer = createBuffer(width, height);
  const context = buffer.getContext("2d");

  context.fillStyle = COLORS.player;
  context.fillRect(
    pos.x * TILE_SIZE,
    pos.y * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE
  );
  return function(ctx) {
    ctx.drawImage(buffer, 0, 0);
  };
}

function drawPlayerStarting(context, x, y) {
  context.fillStyle = COLORS.startPosition;
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawKey(context, x, y) {
  context.fillStyle = COLORS.key;
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawDoor(context, x, y) {
  context.fillStyle = COLORS.door;
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawTreasure(context, x, y) {
  context.fillStyle = COLORS.treasure;
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawWall(context, x, y) {
  context.fillStyle = COLORS.wall;
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawOutOfBounds(context, x, y) {
  context.fillStyle = COLORS.outOfBounds;
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawFloor(context, x, y) {
  context.fillStyle = COLORS.floor;
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  context.strokeStyle = COLORS.floorStroke;
  context.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}
