import { combineReducers } from "./combineReducers.js";
import { createStore } from "./createStore.js";
import enemies from "./enemiesReducer.js";
import level from "./levelReducer.js";
import player from "./playerReducer.js";
import status from "./statusReducer.js";


export const createLevelStore = () =>
  createStore(combineReducers({ level, enemies }));

export const createGame = () => {
  return createStore(combineReducers({ player, status }));
};
