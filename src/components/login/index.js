import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

import './styles.css';

export default ({
  handleFormSubmit,
  updateUsernameField,
  updatePasswordField,
  username,
  password
}) => (
  <Form layout='inline' onSubmit={handleFormSubmit} className='login-form'>
    <img
      src={`${process.env.PUBLIC_URL}/assets/logo.png`}
      alt='logo'
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