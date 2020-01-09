import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { isEmpty } from 'lodash';

const enhance = compose(
  connect(({ creds }) => ({ creds })),
  withProps(({ requireAuth = true, creds }) => ({  
    // auth requires creds to be present, duh
    shouldRender: requireAuth ? !isEmpty(creds) : isEmpty(creds),
    redirectPath: requireAuth ? '/login' : '/dashboard',
  })),
);
export default enhance(({ shouldRender, redirectPath,  component: Component, ...rest }) =>
  <Route {...rest} render={(props) => (
    shouldRender ? <Component {...props}/> : <Redirect to={redirectPath} />
  )} />);  