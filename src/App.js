import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import * as rootContainers from 'containers/root-containers';
import configureStore from 'store/configureStore';
import 'App.css';

const store = configureStore();
const client = new ApolloClient({ uri: 'http://localhost:8080/graphql' });

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Route
          path='/dashboard'
          exact
          component={rootContainers.AnalyticsDashboard}
        />
        <Route path='/accounts' exact component={rootContainers.Accounts} />
        <Route path='/login' exact component={rootContainers.Login} />
        <Route
          path='/memory-visualizer/:address'
          exact
          component={rootContainers.MemoryVisualizer}
        />
        <Route
          path='/memory-visualizer'
          exact
          component={rootContainers.MemoryVisualizer}
        />
        <Route path='/orva-rtc' exact component={rootContainers.OrvaRTC} />
        <Route
          path='/profile-visualizer'
          exact
          component={rootContainers.ProfileVisualizer}
        />
        <Route
          path='/profile-visualizer/:address'
          exact
          component={rootContainers.ProfileVisualizer}
        />
        <Route path='/skills' exact component={rootContainers.Skills} />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);

export default App;
