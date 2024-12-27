import request from './request'

const initializeApp = token => {
  request.defaults.headers.common['Authorization'] = token?.jwt
  request.defaults.headers.common['Rejin'] = token?.exp;
}
export default initializeApp

