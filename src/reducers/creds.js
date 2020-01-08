export default (state = {}, payload) => {
  switch(payload.type) {
    case 'APPLY_CREDS': {
      return {
        creds: payload.value
      }
    }
    case 'CLEAR_CREDS': {
      return {
        creds: undefined
      };
    }
    default: {
      return state;
    }
  }
}