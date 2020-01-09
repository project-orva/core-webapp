export default (state = {}, payload) => {
  switch(payload.type) {
    case 'APPLY_CREDS': {
      return {
        ...payload.value
      }
    }
    case 'CLEAR_CREDS': {
      return {};
    }
    default: {
      return state;
    }
  }
}