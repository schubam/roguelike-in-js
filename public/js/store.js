import { playerDefaults } from "./player.js";
import Grid from "./grid.js";

function createStore(reducer) {
  let state = {};
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
    console.log(state);
  };

  const subscribe = listener => {
    listeners.push(listener);
  };

  dispatch({});

  return {
    getState,
    dispatch,
    subscribe
  };
}

const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

// reducer -
//   a reducer works with the current state
//   executes an action,
//   returns an updated state (no mutation!)

const level = (state, action) => {
  switch (action.type) {
    case "OPEN_DOOR_WITH_KEY":
    case "PICKUP_GOLD":
    case "PICKUP_KEY": {
      const grid = new Grid(state.grid.width, state.grid.height);
      grid.data = state.grid.data;
      grid.set(action.position.x, action.position.y, " ");
      return {
        ...state,
        grid
      };
    }

    case "LEVEL_LOADED": {
      return {
        ...state,
        grid: action.grid
      };
    }

    default:
      return state;
  }
};

const byTile = (state, action) => {
  switch (action.type) {
    case "LEVEL_LOADED": {
      return { ...state, ...action.byTile };
    }
    default:
      return state;
  }
};

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
      return { ...state, position: action.position };
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

const status = (state = { messages: [], level: 0 }, action) => {
  switch (action.type) {
    case "PICKUP_GOLD":
    case "OPEN_DOOR_WITH_KEY":
    case "PICKUP_KEY":
    case "STATUS_MESSAGE": {
      const newState = Object.assign({}, state);
      newState.messages.push(action.message);
      return newState;
    }

    case "LEVEL_LOADED": {
      const newState = Object.assign({}, state);
      newState.level = newState.level + 1;
      newState.messages.push(`Entered level ${newState.level}`);
      return newState;
    }

    default:
      return state;
  }
};

const roguelikeApp = combineReducers({
  level,
  byTile,
  player,
  status
});

export const createGame = () => {
  return createStore(roguelikeApp);
};

// const incrementCounter = (list, index) => {
//   // prettier-ignore
//   return [
//         ...list.slice(0, index),
//         list[index] + 1,
//         ...list.slice(index+1)
//   ]
// };
