import * as COLORS from "./colors.js";

export const TILE_SIZE = 16;

export function createBuffer(width, height) {
  const buffer = document.createElement("canvas");
  buffer.width = width * TILE_SIZE;
  buffer.height = height * TILE_SIZE;
  return buffer;
}

const colorForTile = tile => {
  switch (tile) {
    case " ":
      return "darkgreen";
    case "W":
      return "darkgrey";
    case "X":
      return "gold";
    case "@":
      return "darkblue";
    case ">":
      return "pink";
    case "K":
      return "orange";
    case "D":
      return "darkbrown";

    default:
      return "color-1";
  }
};

export function renderPaletteTile(tile, x, y, context, palette) {
  palette.drawProjected(
    colorForTile(tile),
    context,
    0,
    0,
    palette.width,
    palette.width,
    x * TILE_SIZE,
    y * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE
  );
}

export function drawLevel(width, height, data) {
  const buffer = createBuffer(width, height);
  const context = buffer.getContext("2d");

  data.forEach((tile, x, y) => {
    renderTile(tile, x, y, context);
  });
  return function(ctx) {
    ctx.drawImage(buffer, 0, 0);
  };
}

export function renderTile(tile, x, y, context) {
  if (!tile) {
    drawOutOfBounds(context, x, y);
  } else {
    switch (tile[0]) {
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
        drawGold(context, x, y);
        break;

      case undefined:
        drawOutOfBounds(context, x, y);
        break;

      case "@":
        drawPlayerStarting(context, x, y);
        break;

      case ">":
        drawExit(context, x, y);
        break;

      default:
        break;
    }
  }
}

export function drawPlayer(width, height, pos) {
  const buffer = createBuffer(width, height);
  const context = buffer.getContext("2d");

  context.fillStyle = COLORS.player;
  context.fillRect(pos.x * TILE_SIZE, pos.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  return function(ctx) {
    ctx.drawImage(buffer, 0, 0);
  };
}

export function drawEnemies(width, height, enemies) {
  const buffer = createBuffer(width, height);
  const context = buffer.getContext("2d");
  enemies.forEach(pos => {
    context.fillStyle = COLORS.enemy;
    context.fillRect(
      pos.x * TILE_SIZE,
      pos.y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    );
  });
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

function drawGold(context, x, y) {
  context.fillStyle = COLORS.gold;
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

function drawExit(context, x, y) {
  context.fillStyle = COLORS.exit;
  context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawFloor(context, x, y) {
  // context.fillStyle = COLORS.floor;
  // context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  // context.strokeStyle = COLORS.floorStroke;
  // context.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}
