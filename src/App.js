import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';

import ProtectedRoute from 'containers/auth-route'
import * as rootContainers from 'containers/root-containers';
import configureStore from 'store/configureStore';
import 'App.css';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route
        path="/"
        exact
        component={() => <Redirect to="/dashboard" />}
      />
      <ProtectedRoute
        path='/dashboard'
        exact
        component={rootContainers.AnalyticsDashboard}
      />
      <ProtectedRoute path='/accounts' exact component={rootContainers.Accounts} />
      <ProtectedRoute requireAuth={false} path='/login' exact component={rootContainers.Login} />
      <ProtectedRoute
        path='/memory-visualizer/:address'
        exact
        component={rootContainers.MemoryVisualizer}
      />
      <ProtectedRoute
        path='/memory-visualizer'
        exact
        component={rootContainers.MemoryVisualizer}
      />
      <ProtectedRoute path='/orva-rtc' exact component={rootContainers.OrvaRTC} />
      <ProtectedRoute
        path='/profile-visualizer'
        exact
        component={rootContainers.ProfileVisualizer}
      />
      <ProtectedRoute
        path='/profile-visualizer/:address'
        exact
        component={rootContainers.ProfileVisualizer}
      />
      <ProtectedRoute path='/skills' exact component={rootContainers.Skills} />
    </BrowserRouter>
  </Provider>
);

export default App;
