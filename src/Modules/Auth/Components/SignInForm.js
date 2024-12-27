import React from 'react'
import Button from '../../../Components/Form/Button'
import styled from 'styled-components'
import { Form, Input } from 'antd'
import Flex from '../../../Components/Flex'
import Spinner from '../../../Components/Form/Spinner'
import { useSelector } from 'react-redux'
import { getLoad } from '../selectors'

const InputWrapper = styled.div`
  padding-bottom: 25px;

`
const Header = styled.div`
  color:#fff;
  margin-bottom:20px;
`

const SignInForm = ({ handleSignIn }) => {

  const isLoading = useSelector(getLoad);

  console.log(isLoading,'isLoading');

  const onFinish = values => {
    handleSignIn(values)
  }

  return (
    <Form onFinish={onFinish}
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}>

      <Flex center>
        <Header>
          <h1 style={{ fontSize: '30px', }}>Login</h1>
        </Header>
      </Flex>

      <InputWrapper style={{ padding: '5px 20px' }}>
        <Form.Item
          style={{ marginBottom: '0' }}
          name="email"
          rules={[
            { required: true, message: 'Please enter your email address' },
          ]}
        >
          <Input type={'email'} size='large' placeholder="Email" />
        </Form.Item>
      </InputWrapper>
      <br />

      <InputWrapper style={{ padding: '5px 20px' }}>
        <Form.Item
          style={{ marginBottom: '0' }}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter a password',
            },
          ]}
        >
          <Input.Password size='large' placeholder="Password" style={{borderRadius:'8px'}}/>
        </Form.Item>
      </InputWrapper>

      <Form.Item style={{ padding: '5px 20px' }}>
        <Flex center gap={'20px'} style={{ margin: '20px 0px' }}>
        {isLoading ? <Spinner /> : (
          <Button.Primary text={'Login'} htmlType="submit" />)}
        </Flex>
      </Form.Item>

    </Form>
  )
}

export default SignInForm
