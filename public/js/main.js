import setupKeyboard from "./input.js";
import { TILE_SIZE, WIDTH, HEIGHT } from "./constants.js";

function indexToPosition(index) {
  return { x: index % WIDTH, y: Math.floor(index / WIDTH) };
}

function drawLevel(context) {
  levelData.forEach((tile, index) => {
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
}

function drawPlayer(context) {
  console.log(player.position);
  context.fillStyle = player.color;
  context.fillRect(
    player.position.x * TILE_SIZE,
    player.position.y * TILE_SIZE,
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

const player = {
  position: { x: 10, y: 10 },
  color: "red"
};

function setPlayerStartingPosition() {
  const startingTile = levelData.indexOf("@");
  if (startingTile === -1) {
    throw "Error: no player starting position found in map";
  }
  player.position = indexToPosition(startingTile);
}

// prettier-ignore
const levelData = [
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 
        " ", " ", "W", "W", "W", "W", "W", "W", "W", "W", " ", " ", " ", "W", "W", "W", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 
        " ", " ", "W", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", "W", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 
        " ", " ", "W", " ", " ", " ", " ", " ", " ", "W", "W", "W", "W", "W", " ", "X", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 
        " ", " ", "W", " ", " ", " ", " ", " ", " ", "D", " ", " ", " ", "D", " ", "X", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 
        " ", " ", "W", " ", " ", " ", " ", " ", " ", "W", "W", "W", "W", "W", " ", " ", "W", " ", " ", " ", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", 
        " ", " ", "W", " ", " ", "@", " ", " ", " ", "W", " ", " ", " ", "W", "W", "D", "W", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", 
        " ", " ", "W", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", "W", " ", "W", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", 
        " ", " ", "W", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", "W", " ", "W", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", 
        " ", " ", "W", "W", "W", "W", "W", "W", "W", "W", " ", " ", " ", " ", "W", " ", "W", "W", "W", "W", "W", " ", " ", " ", "X", "X", "X", " ", " ", " ", " ", "W", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", "D", " ", " ", " ", "X", "X", "X", " ", " ", " ", " ", "W", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", "D", " ", " ", " ", "X", "X", "X", " ", " ", " ", " ", "W", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", "W", "W", "W", "W", "W", " ", " ", " ", "X", "X", "X", " ", " ", " ", " ", "W", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 
        " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "
];

function render(context) {
  drawLevel(context);
  drawPlayer(context);
}

function main(context) {
  const input = setupKeyboard(player, render.bind(this, context));
  input.listenTo(window);
  setPlayerStartingPosition();
  render(context);
}

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");
main(context);
