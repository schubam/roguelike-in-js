import level1 from "./levels/level1.js";

export const makeIndexToPosition = w => index => ({
  x: index % w,
  y: Math.floor(index / w)
});

const positionToIndex = w => pos => pos.y * w + pos.x;

function playerStartingPosition(data, i2pos) {
  const startingTile = data.indexOf("@");
  if (startingTile === -1) {
    throw "Error: no player starting position found in map";
  }
  return i2pos(startingTile);
}

function doors(data, i2pos) {
  const reducer = (acc, value, index) => {
    if (value === "D") {
      acc.push(i2pos(index));
    }
    return acc;
  };
  return data.reduce(reducer, []);
}

export const byTile = (data, i2pos) => ({
  playerStartingPosition: playerStartingPosition(data, i2pos),
  doors: doors(data, i2pos)
});

export const loadLevelData = level => {
  return level1;
};

export const loadLevel = level => {
  const levelData = loadLevelData(level);
  const i2pos = makeIndexToPosition(levelData.width);
  const pos2i = positionToIndex(levelData.width);

  return {
    level: levelData,
    byTile: byTile(levelData.data, i2pos),
    indexToPosition: i2pos,
    positionToIndex: pos2i
  };
};
