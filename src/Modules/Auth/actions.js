/* eslint-disable no-unused-vars */
import request from '../../utils/request'
import initializeApp from '../../utils/initializeApp'
import { toast } from 'react-toastify'

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const SET_LOADING = 'SET_LOADING';
export const CLEAR_LOADING = 'CLEAR_LOADING';


export const SignInSuccess = token => {
  return {
    type: SIGN_IN_SUCCESS,
    token,
  }
}

export const LogOutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  }
}
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const clearLoading = () => {
  return {
    type: CLEAR_LOADING,
  };
};


export const SignIn = (data) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const authData = await request.post('api/login', {
      ...data,
    });

    if (authData?.data) {
      toast.success('Logged in Successfully!');
      initializeApp(authData.data);
      dispatch(SignInSuccess(authData.data));
    } else {
      toast.error('Username or password is incorrect.');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error('Incorrect email or password. Please try again.');
    } else {
      toast.error('Failed to log in. Please try again later.');
    }
  } finally {
    dispatch(clearLoading()); 
  }
};
