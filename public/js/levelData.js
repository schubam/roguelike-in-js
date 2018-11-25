import Grid from "./grid.js";

export const makeIndexToPosition = w => index => ({
  x: index % w,
  y: Math.floor(index / w)
});

const positionToIndex = w => pos => pos.y * w + pos.x;

function playerStartingPosition(grid, i2pos) {
  const startingTile = grid.indexOf("@");
  if (startingTile === -1) {
    throw "Error: no player starting position found in map";
  }
  return i2pos(startingTile);
}

function doors(grid, i2pos) {
  const reducer = (acc, value, index) => {
    if (value === "D") {
      acc.push(i2pos(index));
    }
    return acc;
  };
  return grid.reduce(reducer, []);
}

const byTile = (grid, i2pos) => ({
  playerStartingPosition: playerStartingPosition(grid, i2pos),
  doors: doors(grid, i2pos)
});

const loadLevelData = async name => {
  try {
    const data = await fetch(`/js/levels/${name}.json`);
    const grid = new Grid(await data.json());
    return grid;
  } catch (error) {
    return console.error(error);
  }
};

export const loadLevel = async level => {
  const grid = await loadLevelData(level);
  const i2pos = makeIndexToPosition(grid.width);
  const pos2i = positionToIndex(grid.width);
  return {
    level: grid,
    byTile: byTile(grid, i2pos),
    indexToPosition: i2pos,
    positionToIndex: pos2i
  };
};
