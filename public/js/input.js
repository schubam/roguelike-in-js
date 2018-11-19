const PRESSED = 1;
const RELEASED = 0;

class KeyboardState {
  constructor() {
    // Holds the current state of a given key
    this.keyStates = new Map();

    // Holds the callback functions for a key code
    this.keyMap = new Map();
  }

  addMapping(code, callback) {
    this.keyMap.set(code, callback);
  }

  handleEvent(event) {
    const { code } = event;

    if (!this.keyMap.has(code)) {
      // Did not have key mapped.
      return;
    }

    event.preventDefault();

    const keyState = event.type === "keydown" ? PRESSED : RELEASED;

    if (this.keyStates.get(code) === keyState) {
      return;
    }

    this.keyStates.set(code, keyState);

    this.keyMap.get(code)(keyState);
  }

  listenTo(window) {
    ["keydown", "keyup"].forEach(eventName => {
      window.addEventListener(eventName, event => {
        this.handleEvent(event);
      });
    });
  }
}

function clamp(min, max, value) {
  return Math.min(Math.max(value, min), max);
}

const clampToScreenX = clamp.bind(this, 0, 32 - 1);
const clampToScreenY = clamp.bind(this, 0, 30 - 1);

function setupKeyboard(player, renderCallback) {
  const input = new KeyboardState();
  input.addMapping("ArrowRight", keyState => {
    if (keyState == RELEASED) {
      dispatch({ type: "MOVE_RIGHT" });
    }
  });

  input.addMapping("ArrowLeft", keyState => {
    if (keyState == RELEASED) {
      dispatch({ type: "MOVE_LEFT" });
    }
  });

  input.addMapping("ArrowUp", keyState => {
    if (keyState == RELEASED) {
      dispatch({ type: "MOVE_UP" });
    }
  });

  input.addMapping("ArrowDown", keyState => {
    if (keyState == RELEASED) {
      dispatch({ type: "MOVE_DOWN" });
    }
  });

  return input;
}

export default setupKeyboard;
