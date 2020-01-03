import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import configureStore from "../src/containers/store/configureStore";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(jsx, document.getElementById("application/main"));

serviceWorker.register();
