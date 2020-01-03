import React from "react";
import { Form, Icon, Input, Button } from "antd";

import { emailAction } from "../actions/email";
import { passwordAction } from "../actions/password";
import configureStore from "../store/configureStore";

const store = configureStore();
store.subscribe(() => {
  console.log(store.getState());
});
export default class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const store = configureStore();
    store.dispatch(emailAction({ text: this.state.email }));
    store.dispatch(passwordAction({ text: this.state.password }));
  };

  render() {
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

// const WrappedHorizontalLoginForm = Form.create({ name: "horizontal_login" })(
//   HorizontalLoginForm
// );
