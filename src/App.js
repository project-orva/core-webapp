import React from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';

const store = createStore(rootReducer);

export default () => (
  <Provider store={store}>
    This is a our app
  </Provider>
);