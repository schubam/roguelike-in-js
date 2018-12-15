const playerDefaults = {
  health: 8,
  currentHealth: 8,
  strength: 6,
  armor: 2,
  gold: 0,
  keys: 0,
  experience: 0
};

const playerStats = (state = playerDefaults, action) => {
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

    default:
      return state;
  }
};

export default playerStats;