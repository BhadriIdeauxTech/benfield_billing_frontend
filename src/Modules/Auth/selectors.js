export const getToken = state => state?.auth?.token
export const getLoad = state => state?.auth?.isLoading

const selectors = {
  getToken,getLoad
}

export default selectors
