import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { isEmpty } from 'lodash';

const enhance = compose(
  connect(({ creds: { creds } }) => ({ creds })),
  withProps(({ requireAuth = true, creds }) => ({  
    // redirect if no creds and it requires auth
    // no redirect if it doesn't require auth
    shouldRender: requireAuth ? !isEmpty(creds) : isEmpty(creds),
    redirectPath: requireAuth ? '/login' : '/dashboard',
  })),
);
export default enhance(({ shouldRender, redirectPath,  component: Component, ...rest }) =>
  <Route {...rest} render={(props) => (
    shouldRender ? <Component {...props}/> : <Redirect to={redirectPath} />
  )} />);  