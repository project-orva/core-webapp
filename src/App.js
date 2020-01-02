import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from 'reducers';
import * as rootContainers from 'containers/root-containers'; 

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" exact component={rootContainers.AnalyticsDashboard} />
      <Route path="/accounts" exact component={rootContainers.Accounts} />
      <Route path="/login" exact component={rootContainers.Login} />
      <Route  
        path="/memory-visualizer/:address"  
        exact
        component={rootContainers.MemoryVisualizer}
      />
      <Route path="/orva-rtc" exact component={rootContainers.OrvaRTC} />
      <Route
        path="/profile-visualizer/:address"
        exact
        component={rootContainers.ProfileVisualizer}
      />
      <Route path="/skills" exact component={rootContainers.Skills} />
    </BrowserRouter>
  </Provider>
);

export default App;
