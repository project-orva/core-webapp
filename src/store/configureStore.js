import { createStore } from 'redux';

import rootReducer from 'reducers';

export default () => {
  const store = createStore(
    rootReducer,
    JSON.parse(localStorage.getItem('redux.persisted')) || {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
