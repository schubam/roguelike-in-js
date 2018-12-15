import { combineReducers } from "./combineReducers.js";
import { createStore } from "./createStore.js";
import enemies from "./enemiesReducer.js";
import level from "./levelReducer.js";
import player from "./playerReducer.js";
import playerStats from "./playerStatsReducer.js";
import status from "./statusReducer.js";

const stores = [];

export const createLevelStore = () => {
  const store = createStore(combineReducers({ level, enemies, player }));
  stores.push(store);
  return store;
};

export const createGame = () => {
  const store = createStore(combineReducers({ playerStats, status }));
  stores.push(store);

  store.start = function() {
    this.playLevel("1");
  };

  return store;
};

export const dispatchAll = action =>
  stores.forEach(store => store.dispatch(action));
