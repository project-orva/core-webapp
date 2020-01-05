import React from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button } from 'antd';
import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import './login.scss';
import { Redirect } from 'react-router-dom';

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
    })
  }),
  withHandlers({
    handleFormSubmit: ({ username, password, history }) => async e => {
      e.preventDefault();

      const { data, err } = await axios
        .post('http://localhost:3006/auth', { username: username, password })
        .then(data => ({ data, err: undefined }))
        .catch(({ response }) => ({
          err: response
        }));
      if (err !== undefined) {
        await axios
          .post('http://localhost:3006/tango', { userID: username })
          .then(alert('Failed attempt has been logged'));

        return;
      }
      localStorage.setItem('web_creds', JSON.stringify(data.response));
      return localStorage ? history.push('/') : <Redirect to='/login' />;
    }
  })
);

export default enhance(Login);
