import { combineReducers } from "redux";

import formFieldHof from "reducers/form-field-hof";

export default combineReducers({
  login: formFieldHof(["LOGIN_PASSWORD", "LOGIN_USERNAME"])
});
