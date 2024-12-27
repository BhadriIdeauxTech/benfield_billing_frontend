import React, { useEffect } from 'react'
import styled from 'styled-components'
import Flex from '../../../Components/Flex'
import SignInForm from './SignInForm'
import { useNavigate } from 'react-router-dom'
import Bgimg from '../../../Assets/Images/bg-image.jpg'

export const Wrapper = styled(Flex)`
  height: 100vh;
  width: 100%;
  background-image: url(${Bgimg});
  background-repeat: no-repeat;
  background-size: cover;
`

const SignInCard = styled.div`
  background-color:rgba(255,255,255,0.2);
  backdrop-filter:blur(1px);
  padding: 40px 32px;
  border-radius:0px 40px 0px 40px;
  max-width: 450px;
  width: 100%;
  margin: auto;
  border: 2px solid #949292;
`

const UserSignin = ({ token, SignIn }) => {
  const navigate = useNavigate()

  const handleSignIn = data => {
    SignIn(data)
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <Wrapper column>
      <SignInCard>
        <SignInForm handleSignIn={handleSignIn} />
      </SignInCard>
    </Wrapper>
  )
}
export default UserSignin
