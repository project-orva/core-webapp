import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from 'reducers';

import rtcMiddleware from './middleware/rtc';
import serviceHealthMiddleware from './middleware/service-health';

export default () => {
  const store = createStore(
    rootReducer,
    JSON.parse(localStorage.getItem('redux.persisted')) || {},
    compose(
      applyMiddleware(
        serviceHealthMiddleware,
        rtcMiddleware,
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
  );

  store.subscribe(() => {
    const { creds, coreRTC } = store.getState();    

    localStorage.setItem('redux.persisted', JSON.stringify({
      creds,
      coreRTC,
    }));
  })

  return store;
};
