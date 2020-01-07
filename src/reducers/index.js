import { combineReducers } from 'redux';

import formFieldHof from 'reducers/form-field-hof';
import creds from 'reducers/creds';

export default combineReducers({
  login: formFieldHof(['LOGIN_PASSWORD', 'LOGIN_USERNAME']),
  creds,
});
