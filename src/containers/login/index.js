import React from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button } from 'antd';
import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import './login.scss';

const Login = ({
  handleFormSubmit,
  updateUsernameField,
  updatePasswordField,
  username,
  password
}) => (
  <Form layout='inline' onSubmit={handleFormSubmit}>
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
      <Button type='primary' htmlType='submit'>
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
    handleFormSubmit: ({ username, password }) => async e => {
      e.preventDefault();

      const { data, err } = await axios
        .post('http://localhost:3006/auth', { username: username, password })
        .then(data => ({ data, err: undefined }))
        .catch(({ response }) => ({
          err: response
        }));
    }
  }),
  lifecycle({
    componentDidCatch(err) {
      // handle some error
    }
  })
);

export default enhance(Login);
