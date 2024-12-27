import { SIGN_IN_SUCCESS, LOGOUT_SUCCESS, CLEAR_LOADING, SET_LOADING } from './actions'

const initialState = {
  isLoading: false,
  token: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.token,
        isLoading: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}
