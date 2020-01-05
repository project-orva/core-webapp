export default types => {
  return (state = {}, payload) => {
    if (types.includes(payload.type)) {
      return {
        ...state,
        [payload.fid]: payload.value
      };
    }

    return state;
  };
};
