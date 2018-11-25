import Grid from "./grid.js";

function playerStartingPosition(grid) {
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

function doors(grid) {
  const acc = [];
  grid.forEach((value, x, y) => {
    if (value === "D") {
      acc.push({ x, y });
    }
  });
  return acc;
}

const byTile = grid => ({
  playerStartingPosition: playerStartingPosition(grid),
  doors: doors(grid)
});

const loadLevelData = async name => {
  try {
    const data = await fetch(`/js/levels/${name}.json`);
    const json = await data.json();
    const grid = new Grid(json.width, json.height);
    grid.setData(json.data);
    return grid;
  } catch (error) {
    console.error("Error", error);
  }
};

export const loadLevel = async file => {
  const grid = await loadLevelData(file);
  return {
    grid,
    byTile: byTile(grid)
  };
};
