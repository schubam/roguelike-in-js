export function tryMovePlayer(store, direction) {
  const grid = store.getState().level.grid;
  const { width, height } = grid;
  const from = store.getState().player.position;
  const to = { x: from.x + direction.x, y: from.y + direction.y };

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
