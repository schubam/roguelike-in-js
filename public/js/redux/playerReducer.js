import { playerDefaults } from "../player.js";
import { playerStartingPosition } from "../levelData.js";

const player = (state = playerDefaults, action) => {
  switch (action.type) {
    case "OPEN_DOOR_WITH_KEY": {
      return { ...state, keys: state.keys - 1 };
    }
    case "PICKUP_KEY": {
      return { ...state, keys: state.keys + 1 };
    }
    case "PICKUP_GOLD": {
      return { ...state, gold: state.gold + 10 };
    }
    case "LEVEL_LOADED": {
      const position = playerStartingPosition(action.grid);
      return { ...state, position };
    }
    case "PLAYER_MOVE": {
      return {
        ...state,
        position: action.to,
        direction: {
          x: action.to.x - action.from.x,
          y: action.to.y - action.from.y
        }
      };
    }
    default:
      return state;
  }
};

export default player;
