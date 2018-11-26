import Camera from "./camera.js";
import KeyboardState, { RELEASED } from "./input.js";
import { createGame } from "./store.js";
import { loadFont } from "./font.js";
import { loadLevel } from "./levelData.js";

function tryMovePlayer(from, to) {
  const grid = store.getState().level.grid;
  const { width, height } = grid;
  if (to.x < 0 || to.y < 0 || to.x >= width || to.y >= height) {
    // console.log("can't move to ", to);
    return;
  }

  const field = grid.get(to.x, to.y);
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
const camera = new Camera(26, 26, store);

Promise.all([loadFont()]).then(([font]) => {
  function titlebar(context) {
    const text = "Roguelike";
    font.print(text, context, 13 * 8 - Math.floor(text.length / 2), 0); // WTF?
  }

  function sidebar(context) {
    context.fillStyle = "blue";
    context.fillRect(26 * 8, 8, 6 * 8, 26 * 8);
  }

  function statusbar(context) {
    font.print(`Level:1  Hits:12(12) Str:16(16)`, context, 0, 27*8);
    font.print(`Armor:5  Gold:0  Exp:1/5`, context, 0, 28*8);
    font.print(`Attacking --->`, context, 0, 29*8);
  }

  titlebar(context);
  sidebar(context);
  statusbar(context);

  store.subscribe(() => {
    camera.render()(context, 0, 8);
  });

  setupInput();

  loadLevel("level1").then(level => {
    store.dispatch({
      type: "LEVEL_LOADED",
      ...level,
      playerPosition: level.byTile.playerStartingPosition
    });
  });
});
