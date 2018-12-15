import Grid from "../grid.js";
import { TILE_SIZE } from "../render.js";

// reducer -
//   a reducer works with the current state
//   executes an action,
//   returns an updated state (no mutation!)
//
//
// const incrementCounter = (list, index) => {
//   // prettier-ignore
//   return [
//         ...list.slice(0, index),
//         list[index] + 1,
//         ...list.slice(index+1)
//   ]
// };

function removeItem(tile, position, g, byTile, level) {
  const grid = new Grid(g.width, g.height);
  grid.data = g.data;
  grid.set(position.x, position.y, " ");
  const keys = byTile[tile].filter(
    e => !(e.x === position.x && e.y === position.y)
  );
  level.removeItemAtPosition(position.x * TILE_SIZE, position.y * TILE_SIZE);
  return { grid, byTile: { ...byTile, keys } };
}

const level = (state, action) => {
  switch (action.type) {
    case "OPEN_DOOR_WITH_KEY":
    case "PICKUP_GOLD":
    case "PICKUP_KEY": {
      const { grid, byTile } = removeItem(
        action.tile,
        action.position,
        state.grid,
        state.byTile,
        state.level
      );
      return {
        ...state,
        grid,
        byTile
      };
    }
    case "LEVEL_LOADED": {
      return {
        grid: action.grid,
        byTile: action.byTile,
        level: action.level
      };
    }
    default:
      return state;
  }
};

export default level;
