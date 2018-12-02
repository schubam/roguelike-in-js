import Grid from "./grid.js";
import Enemy from "./enemy.js";

export function playerStartingPosition(grid) {
  let pos;
  grid.forEach((value, x, y) => {
    if (value === "@") {
      pos = { x, y };
    }
  });
  if (!pos) {
    throw "Error: no player starting position found in map";
  }
  return pos;
}

function findTiles(tile, grid) {
  const acc = [];
  grid.forEach((value, x, y) => {
    if (value === tile) {
      acc.push({ x, y });
    }
  });
  return acc;
}

function byTile(grid) {
  const object = {
    X: findTiles("X", grid),
    "@": findTiles("@", grid),
    ">": findTiles(">", grid),
    D: findTiles("D", grid),
    K: findTiles("K", grid)
  };
  return object;
}

export function spawnEnemies(grid) {
  const positions = [{ x: 6, y: 7 }, { x: 11, y: 5 }];
  const byId = positions.reduce((memo, position) => {
    const enemy = new Enemy(position);
    memo[enemy.id] = enemy;
    return memo;
  }, {});

  return byId;
}

export const loadLevelData = async name => {
  try {
    const data = await fetch(`/js/levels/${name}.json`);
    const json = await data.json();
    const grid = new Grid(json.width, json.height);
    grid.setData(json.data);
    const tiles = byTile(grid);
    return { grid, byTile: tiles, levelSpec: json };
  } catch (error) {
    console.error("Error", error);
  }
};

export const loadLevel = async file => {
  const grid = await loadLevelData(file);
  return { grid };
};
