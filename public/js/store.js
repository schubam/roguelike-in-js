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
    case "LEVEL_LOADED": {
      return {
        ...state,
        ...action.level,
        indexToPosition: action.indexToPosition,
        positionToIndex: action.positionToIndex
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

const playerPosition = (state, action) => {
  switch (action.type) {
    case "LEVEL_LOADED": {
      return { ...state, ...action.playerPosition };
    }
    case "PLAYER_MOVE": {
      return {
        ...state,
        ...action.to,
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

const roguelikeApp = combineReducers({
  level,
  byTile,
  playerPosition
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
