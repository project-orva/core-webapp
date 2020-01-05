import { combineReducers } from 'redux';

import formFieldHof from 'reducers/form-field-hof';

export default combineReducers({
  login: formFieldHof(['LOGIN_PASSWORD', 'LOGIN_USERNAME']),
  creds: (state = {}, payload) =>
    ({
      [payload.type]: state,
      APPLY_CREDS: payload.value,
      CLEAR_CREDS: {}
    }[payload.type])
});
