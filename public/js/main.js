import Camera from "./camera.js";
import KeyboardState, { RELEASED } from "./input.js";
import { createGame } from "./store.js";
import { loadLevel } from "./levelData.js";

function render(context) {
  drawLevel(context);
  drawPlayer(context);
}

function tryMovePlayer(from, to) {
  if (to.x < 0 || to.y < 0) {
    // console.log("can't move to ", to);
    return;
  }

  const toIndex = store.getState().level.positionToIndex(to);
  const field = store.getState().level.data[toIndex];
  if (["D", "W"].some(e => e === field)) {
    // console.log("Path blocked, can't move to ", to);
  } else {
    store.dispatch({ type: "PLAYER_MOVE", from, to });
  }
}

function setupInput() {
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
}

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");
const store = createGame();
const camera = new Camera(9, 9, context, store);

store.subscribe(() => {
  camera.render();
});

setupInput();

loadLevel("1").then(level => {
  store.dispatch({
    type: "LEVEL_LOADED",
    ...level,
    playerPosition: level.byTile.playerStartingPosition
  });
});
