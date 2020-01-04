import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { connect } from "react-redux";

import emailAction from "../actions/email";
import passwordAction from "../actions/password";

const Login = props => {
  console.log(props);
  return (
    <Form layout="inline" onSubmit={e => e.preventDefault()}>
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Email"
          value={props.email.text}
          onChange={e => props.dispatch(emailAction({ text: e.target.value }))}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password"
          onChange={e =>
            props.dispatch(passwordAction({ text: e.target.value }))
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
const mapStateToProps = state => {
  return {
    email: state.email,
    password: state.password
  };
};

export default connect(mapStateToProps)(Login);
