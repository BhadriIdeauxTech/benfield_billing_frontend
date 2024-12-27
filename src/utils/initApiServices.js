import request from './request'
export let ReduxStore = {}

const initApiServices = store => {

  ReduxStore = store
  try {
    request.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (error?.response?.statusText === 'Unauthorized') {
          localStorage.clear()
          return new Promise(() => {})
        } else {
          return Promise.reject(error)
        }
      }
    )
  } catch (e) {
    console.error('Error occurred while logout : in InitApiService', e)
  }
}

export default initApiServices