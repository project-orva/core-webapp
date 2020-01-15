import { combineReducers } from 'redux';

import coreRTC from './core-rtc';
import formFieldHof from './form-field-hof';
import creds from './creds';
import servicesHealth from './service-health';

export default combineReducers({
  login: formFieldHof(['LOGIN_PASSWORD', 'LOGIN_USERNAME']),
  coreRTC,
  creds,
  servicesHealth
});
