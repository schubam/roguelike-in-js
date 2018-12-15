export function createStore(reducer) {
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
