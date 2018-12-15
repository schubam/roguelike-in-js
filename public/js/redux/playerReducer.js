import { playerStartingPosition } from "../levelData.js";

const player = (state = {}, action) => {
  switch (action.type) {
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
