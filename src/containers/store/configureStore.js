import { createStore, combineReducers } from "redux";
import emailReducer from "../../reducers/emailReducer";
import passwordReducer from "../../reducers/passwordReducer";

export default () => {
  const store = createStore(
    combineReducers({
      email: emailReducer,
      password: passwordReducer
    })
  );
};
