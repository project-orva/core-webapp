import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from "react-redux";

import axios from 'axios';

const Login = ({ handleFormSubmit, updateEmailField, updatePasswordField, email, password }) => (
  <Form layout="inline" onSubmit={handleFormSubmit}>
    <Form.Item>
      <Input
        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Email"
        value={email}
        onChange={updateEmailField}
        required
      />
    </Form.Item>
    <Form.Item>
      <Input
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        type="password"
        placeholder="Password"
        value={password}
        onChange={updatePasswordField}
        required
      />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Log in
      </Button>
    </Form.Item>
  </Form>
);

const enhance = compose(
  connect(
    ({ login: { email, password } }) => ({ email, password }),
    {
      updateEmailField: ({ target: { value } }) => ({
        type: 'LOGIN_EMAIL',
        fid: 'email',
        value,
      }),
      updatePasswordField: ({ target: { value } }) => ({
        type: 'LOGIN_PASSWORD',
        fid: 'password',
        value,
      })
    }
  ),
  withHandlers({
    handleFormSubmit: ({ email, password }) => async (e) => {
      e.preventDefault();

      const {data, err} = await axios.post('http://localhost:3006/auth', {username: email, password})
        .then(data => ({ data, err: undefined }))
        .catch(({response}) => ({
          err: response
        }));
         
    }
  }),
  lifecycle({
    componentDidCatch(err) {
      // handle some error
    }
  }),
);

export default enhance(Login);
