const emailReducer = (state = {}, action) => {
  switch (action.type) {
    case "EMAIL":
      return {
        ...state,
        text: action.text
      };
    default:
      return state;
  }
};

export default emailReducer;
