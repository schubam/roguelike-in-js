const status = (state = { messages: [], level: 0 }, action) => {
  switch (action.type) {
    case "LEVEL_EXIT":
    case "PICKUP_GOLD":
    case "OPEN_DOOR_WITH_KEY":
    case "ATTACK_ENEMY":
    case "PICKUP_KEY":
    case "STATUS_MESSAGE": {
      const newState = Object.assign({}, state);
      newState.messages.push({ message: action.message, id: action.id });
      return newState;
    }
    case "LEVEL_LOADED": {
      const newState = Object.assign({}, state);
      newState.level = newState.level + 1;
      newState.messages.push({
        message: `Entered level ${newState.level}`,
        id: action.id
      });
      return newState;
    }
    default:
      return state;
  }
};

export default status;
