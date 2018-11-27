export function tryMovePlayer(store, direction) {
  const state = store.getState();
  const grid = state.level.grid;
  const { width, height } = grid;
  const from = state.player.position;
  const to = { x: from.x + direction.x, y: from.y + direction.y };

  if (to.x < 0 || to.y < 0 || to.x >= width || to.y >= height) {
    // console.log("can't move to ", to);
    return;
  }
  const field = grid.get(to.x, to.y);
  if (field === "D") {
    store.dispatch({ type: "STATUS_MESSAGE", message: "Door is locked" });
    if (state.player.keys > 0) {
      store.dispatch({
        type: "OPEN_DOOR_WITH_KEY",
        message: "Opened door with key",
        position: to
      });
      store.dispatch({ type: "PLAYER_MOVE", from, to });
    }
  } else if (field === "X") {
    store.dispatch({
      type: "PICKUP_GOLD",
      message: "Gold picked up",
      position: to
    });
    store.dispatch({ type: "PLAYER_MOVE", from, to });
  } else if (field === "K") {
    store.dispatch({
      type: "PICKUP_KEY",
      message: "Key picked up",
      position: to
    });
    store.dispatch({ type: "PLAYER_MOVE", from, to });
  } else if (field === "W") {
    // console.log("Path blocked, can't move to ", to);
  } else {
    store.dispatch({ type: "PLAYER_MOVE", from, to });
  }
}
