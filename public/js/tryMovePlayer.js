import { loadLevel } from "./levelData.js";

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
        position: to,
        tile: field
      });
      store.dispatch({ type: "PLAYER_MOVE", from, to });
    }
  } else if (field === "X") {
    store.dispatch({
      type: "PICKUP_GOLD",
      message: "Gold picked up",
      position: to,
      tile: field
    });
    store.dispatch({ type: "PLAYER_MOVE", from, to });
  } else if (field === "K") {
    store.dispatch({
      type: "PICKUP_KEY",
      message: "Key picked up",
      position: to,
      tile: field
    });
    store.dispatch({ type: "PLAYER_MOVE", from, to });
  } else if (field === " " && isEnemy(to, state)) {
    const attack = roll(state.player.strength);
    const enemy =
      state.enemies[
        Object.keys(state.enemies).filter(
          id =>
            state.enemies[id].position.x === to.x &&
            state.enemies[id].position.y === to.y
        )[0]
      ];
    const damage = attack - enemy.armor;
    enemy.takeDamage(damage);
    let msg = `Attack (${attack}) > ${damage} Damage`;
    if (enemy.isDead) {
      msg += " > RIP";
      store.dispatch({
        type: "ENEMY_DIED",
        id: enemy.id
      });
    }
    store.dispatch({
      type: "ATTACK_ENEMY",
      from,
      to,
      roll: attack,
      damage: damage,
      isDead: enemy.isDead,
      message: msg
    });
  } else if (field === ">") {
    store.dispatch({
      type: "LEVEL_EXIT",
      from,
      to,
      message: "Arrived at staircase, going down..."
    });
    loadLevel("2").then(level => {
      store.dispatch({ type: "LEVEL_LOADED", grid: level.grid });
    });
  } else if (field === "W") {
    // console.log("Path blocked, can't move to ", to);
  } else {
    store.dispatch({ type: "PLAYER_MOVE", from, to });
  }
}

function isEnemy(pos, state) {
  return !!Object.entries(state.enemies)
    .map(e => e[1])
    .find(e => {
      return e.position.x === pos.x && e.position.y === pos.y;
    });
}

function roll(strength) {
  // 1d6 + strength
  const max = 6;
  const min = 1;
  const dice = Math.floor(Math.random() * (max - min + 1) + min);
  return dice + strength;
}
