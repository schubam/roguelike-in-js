export function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return {
    getState,
    dispatch,
    subscribe
  };
}

// reducer -
//   a reducer works with the current state
//   executes an action,
//   returns an updated state (no mutation!)
export const roguelikeApp = (state = {}, action) => {
  return {
    playerPosition: playerPosition(state.playerPosition, action)
  };
};

const playerPosition = (state = { x: 10, y: 10 }, action) => {
  switch (action.type) {
    case "MOVE_LEFT": {
      newX = state.x - 1;
      return { ...state, x: newX };
    }
    case "MOVE_RIGHT":
      newX = state.x + 1;
      return { ...state, x: newX };
    case "MOVE_UP": {
      newY = state.y - 1;
      return { ...state, x: newY };
    }
    case "MOVE_DOWN":
      newY = state.y + 1;
      return { ...state, y: newY };
    default:
      return state;
  }
};

// const incrementCounter = (list, index) => {
//   // prettier-ignore
//   return [
//         ...list.slice(0, index),
//         list[index] + 1,
//         ...list.slice(index+1)
//   ]
// };
