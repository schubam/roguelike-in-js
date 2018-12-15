const enemies = (state = [], action) => {
  switch (action.type) {
    case "LEVEL_LOADED": {
      // return spawnEnemies(action.grid);
    }
    case "ENEMY_DIED": {
      delete state[action.id];
      return state;
    }
    case "PLAYER_MOVE": {
      return state;
    }
    default:
      return state;
  }
};

export default enemies;
