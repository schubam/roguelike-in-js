import { dispatchAll } from "./redux/store.js";

export function tryMovePlayer(game, levelStore, direction) {
  const { playerStats } = game.getState();
  const { player, level, enemies } = levelStore.getState();

  const grid = level.grid;
  const { width, height } = grid;

  const from = player.position;
  const to = { x: from.x + direction.x, y: from.y + direction.y };

  if (to.x < 0 || to.y < 0 || to.x >= width || to.y >= height) {
    // console.log("can't move to ", to);
    return;
  }
  const field = grid.get(to.x, to.y);
  if (field === "D") {
    dispatchAll({ type: "STATUS_MESSAGE", message: "Door is locked" });
    if (playerStats.keys > 0) {
      dispatchAll({
        type: "OPEN_DOOR_WITH_KEY",
        message: "Opened door with key",
        position: to,
        tile: field
      });
      dispatchAll({ type: "PLAYER_MOVE", from, to });
    }
  } else if (field === "X") {
    dispatchAll({
      type: "PICKUP_GOLD",
      message: "Gold picked up",
      position: to,
      tile: field
    });
    dispatchAll({ type: "PLAYER_MOVE", from, to });
  } else if (field === "K") {
    dispatchAll({
      type: "PICKUP_KEY",
      message: "Key picked up",
      position: to,
      tile: field
    });
    dispatchAll({ type: "PLAYER_MOVE", from, to });
  } else if (field === " " && isEnemy(to, enemies)) {
    const attack = roll(playerStats.strength);
    const enemy =
      enemies[
        Object.keys(enemies).filter(
          id =>
            enemies[id].position.x === to.x && enemies[id].position.y === to.y
        )[0]
      ];
    const damage = attack - enemy.armor;
    enemy.takeDamage(damage);
    let msg = `Attack (${attack}) > ${damage} Damage`;
    if (enemy.isDead) {
      msg += " > RIP";
      dispatchAll({
        type: "ENEMY_DIED",
        id: enemy.id
      });
    }
    dispatchAll({
      type: "ATTACK_ENEMY",
      from,
      to,
      roll: attack,
      damage: damage,
      isDead: enemy.isDead,
      message: msg
    });
  } else if (field === ">") {
    dispatchAll({
      type: "LEVEL_EXIT",
      from,
      to,
      message: "Arrived at staircase, going down..."
    });
    game.playLevel("2");
  } else if ([..."W|{}[]"].some(c => c === field)) {
    // console.log("Path blocked, can't move to ", to);
  } else {
    dispatchAll({ type: "PLAYER_MOVE", from, to });
  }
}

function isEnemy(pos, enemies) {
  return !!Object.entries(enemies)
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
