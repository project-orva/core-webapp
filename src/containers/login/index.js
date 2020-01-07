import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import fetch from 'api';

import './login.scss';

const Login = ({
  handleFormSubmit,
  updateUsernameField,
  updatePasswordField,
  username,
  password
}) => (
  <Form layout='inline' onSubmit={handleFormSubmit} className='login-form'>
    <img
      src={`${process.env.PUBLIC_URL}/assets/logo.png`}
      alt='Orva logo'
      className='login-img'
    />
    <Form.Item>
      <Input
        prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder='Username'
        value={username}
        onChange={updateUsernameField}
        required
      />
    </Form.Item>
    <Form.Item>
      <Input
        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
        type='password'
        placeholder='Password'
        value={password}
        onChange={updatePasswordField}
        required
      />
    </Form.Item>
    <Form.Item>
      <Button type='primary' htmlType='submit' className='login-btn'>
        Log in
      </Button>
    </Form.Item>
  </Form>
);

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
      
      history.push('/');
    }
  })
);

export default enhance(Login);
