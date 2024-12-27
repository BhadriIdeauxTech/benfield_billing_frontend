import React, { Fragment } from 'react'
import AuthPage from './AuthPage'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { anonymous } from '../config/user'
import { useEffect } from 'react'
import request from '../../utils/request'
import { useDispatch } from 'react-redux'
import { LogOutSuccess } from '../../Modules/Auth/actions'
import { toast } from 'react-toastify'
import { Notification } from '../../Layout/partials/NavHeader/actions'

const AuthRouter = ({ isAuthenticated }) => {

  const dispatch = useDispatch()

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(Notification());
    }
    GetTokenExpire();
  }, [location])
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin')
    }
  }, [isAuthenticated])

  const GetTokenExpire = () => {

    request.get('token_app/token_check')
      .then(function (response) {
        if (response.data?.avenger) {
          toast.warn("User Expire")
          dispatch(LogOutSuccess())
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Fragment>
      <Routes>
        {anonymous.map(({ routePath, Component }) => {
          return (
            <Route
              key={routePath}
              path={routePath}
              element={<Component />}
            ></Route>
          )
        })}
      </Routes>
      <AuthPage isAuthenticated={isAuthenticated} />
    </Fragment>
  )
}

export default AuthRouter
