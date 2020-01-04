export default (state = [], action) => {
  switch (action.type) {
    case "PASSWORD":
      return { ...state, text: action.text };
    default: {
      return state;
    }
  }
};
