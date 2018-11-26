import Camera from "./camera.js";
import KeyboardState, { RELEASED } from "./input.js";
import { createGame } from "./store.js";
import { loadFont } from "./font.js";
import { loadLevel } from "./levelData.js";
import { tryMovePlayer } from "./tryMovePlayer.js";
import * as COLORS from "./colors.js";

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
export const store = createGame();
const camera = new Camera(26, 26, store);

Promise.all([loadFont()]).then(([font]) => {
  function titlebar(context) {
    const text = "Roguelike";
    font.print(text, context, 13 * 8 - Math.floor(text.length / 2), 0); // WTF?
  }

  function sidebar(context) {
    context.fillStyle = COLORS.sidebar;
    context.fillRect(26 * 8, 8, 6 * 8, 26 * 8);
  }

  function statusbar(context) {
    const area = { x: 0, y: 27 * 8, width: 32 * 8, height: 3 * 8 };
    clearBackground(context, area);

    const pos = store.getState().playerPosition;
    font.print(`Level:1  Hits:12(12) Str:16(16)`, context, 0, 27 * 8);
    font.print(
      `Armor:5  Gold:0  Exp:1/5 (${pos.x + "," + pos.y})`,
      context,
      0,
      28 * 8
    );
    font.print(`Attacking --->`, context, 0, 29 * 8);
  }

  store.subscribe(() => {
    titlebar(context);
    sidebar(context);
    statusbar(context);
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

function clearBackground(context, area) {
  const oldFillStyle = context.fillStyle;
  context.fillStyle = COLORS.background;
  context.fillRect(area.x, area.y, area.width, area.height);
  context.fillStyle = oldFillStyle;
}
