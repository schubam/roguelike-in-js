import { combineReducers } from "./combineReducers.js";
import { createStore } from "./createStore.js";
import enemies from "./enemiesReducer.js";
import level from "./levelReducer.js";
import player from "./playerReducer.js";
import playerStats from "./playerStatsReducer.js";
import status from "./statusReducer.js";

export const createLevelStore = () =>
  createStore(combineReducers({ level, enemies, player }));

export const createGame = () => {
  return createStore(combineReducers({ playerStats, status }));
};
