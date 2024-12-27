import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Box, BoxStyle, Heading, LoginStyle } from '../style';
import { toast } from 'react-toastify';



const onFinish = (values) => {
};
const onFinishFailed = (errorInfo) => {
  toast.warn("Please fill in all the required details !");
};
const LoginPage = () => (

    <BoxStyle >
 
   <h1>LOGIN HERE ! ! !</h1>
 
    
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input placeholder='Enter Your Username'/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password  placeholder='Enter Your Password'/>
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </BoxStyle>

 
);


export default LoginPage
