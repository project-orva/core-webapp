export default (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_ALL_SERVICES_HEALTH': {
      return { ...action.payload };
    }
    default: {
      return state;
    }
  }
}