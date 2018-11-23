import KeyboardState, { RELEASED, PRESSED } from "./input.js";
import { TILE_SIZE, indexToPosition, positionToIndex } from "./constants.js";
import { createGame } from "./store.js";

function drawLevel(context) {
  store.getState().levelData.forEach((tile, index) => {
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
  context.fillStyle = "red";
  context.fillRect(
    store.getState().playerPosition.x * TILE_SIZE,
    store.getState().playerPosition.y * TILE_SIZE,
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

function render(context) {
  drawLevel(context);
  drawPlayer(context);
}

function tryMovePlayer(from, to) {
  const toIndex = positionToIndex(to);
  const field = store.getState().levelData[toIndex];
  if (["D", "W"].some(e => e === field)) {
    console.log("can't move to ", to);
  } else {
    store.dispatch({ type: "PLAYER_MOVE", from, to });
  }
}

function main(context) {
  const input = new KeyboardState();
  input.addMapping("ArrowRight", keyState => {
    const pos = store.getState().playerPosition;
    if (keyState == RELEASED) {
      tryMovePlayer(pos, { ...pos, x: pos.x + 1 });
    }
  });

  input.addMapping("ArrowLeft", keyState => {
    if (keyState == RELEASED) {
      const pos = store.getState().playerPosition;
      tryMovePlayer(pos, { ...pos, x: pos.x - 1 });
    }
  });

  input.addMapping("ArrowUp", keyState => {
    if (keyState == RELEASED) {
      const pos = store.getState().playerPosition;
      tryMovePlayer(pos, { ...pos, y: pos.y - 1 });
    }
  });

  input.addMapping("ArrowDown", keyState => {
    if (keyState == RELEASED) {
      const pos = store.getState().playerPosition;
      tryMovePlayer(pos, { ...pos, y: pos.y + 1 });
    }
  });
  input.listenTo(window);

  render(context);
}
const store = createGame("level1");
store.subscribe(() => {
  render(context);
});

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");
main(context);
