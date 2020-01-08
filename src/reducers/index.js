import { combineReducers } from 'redux';

import coreRTC from './core-rtc';
import formFieldHof from 'reducers/form-field-hof';
import creds from 'reducers/creds';

export default combineReducers({
  login: formFieldHof(['LOGIN_PASSWORD', 'LOGIN_USERNAME']),
  coreRTC,
  creds,
});
