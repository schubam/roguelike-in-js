import { loadByTile, loadLevelData, loadLevel } from "./levelData.js";

function createStore(reducer, initialState) {
  let state = initialState;
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

const levelData = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const byTile = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const playerPosition = (state, action) => {
  switch (action.type) {
    case "MOVE_LEFT": {
      const newX = state.x - 1;
      return { ...state, x: newX };
    }
    case "MOVE_RIGHT":
      const newX = state.x + 1;
      return { ...state, x: newX };
    case "MOVE_UP": {
      const newY = state.y - 1;
      return { ...state, y: newY };
    }
    case "MOVE_DOWN":
      const newY = state.y + 1;
      return { ...state, y: newY };
    default:
      return state;
  }
};

const roguelikeApp = combineReducers({
  levelData,
  byTile,
  playerPosition
});

export const createGame = level => {
  const initialState = loadLevel(level);
  return createStore(roguelikeApp, {
    ...initialState,
    playerPosition: initialState.byTile.playerStartingPosition
  });
};

// const incrementCounter = (list, index) => {
//   // prettier-ignore
//   return [
//         ...list.slice(0, index),
//         list[index] + 1,
//         ...list.slice(index+1)
//   ]
// };
