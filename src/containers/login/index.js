import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import Login from 'components/login';
import fetch from 'api';

const enhance = compose(
  connect(({ login: { username, password } }) => ({ username, password }), {
    updateUsernameField: ({ target: { value } }) => ({
      type: 'LOGIN_USERNAME',
      fid: 'username',
      value
    }),
    updatePasswordField: ({ target: { value } }) => ({
      type: 'LOGIN_PASSWORD',
      fid: 'password',
      value
    }),
    applyCreds: (creds) => ({
      type: 'APPLY_CREDS',
      value: creds,
    })
  }),
  withHandlers({
    handleFormSubmit: ({ username, password, history, applyCreds }) => async e => {
      e.preventDefault();

      const {data, err} = await fetch.post('auth', { 
        username,
        password 
      });

      if (err !== undefined) {
        fetch.post('tango', {userID: username});

        // todo: bind this alert to custom alert system
        alert('Failed attempt has been logged');

        return;
      } 

      applyCreds(data)
      localStorage.setItem('creds', JSON.stringify(data));
      
      history.push('/dashboard');
    }
  })
);

export default enhance(Login);
