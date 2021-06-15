// a library to wrap and simplify api calls
import apisauce from 'apisauce'
// import { loadState } from 'redux/localStorage'
// our "constructor"
const create = (baseURL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //

  // const serializedState = loadState()
  // let token = null
  // if (serializedState && serializedState.auth) {
  //   token = serializedState.auth.token
  // }
  let token = localStorage.getItem('token')
  let lang = 'sk'

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 30000
  })
  const blobApi = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    responseType: 'blob',
    // 10 second timeout...
    timeout: 30000
  })

  const setToken = (currentAuthToken) => {
    token = currentAuthToken
  }

  const setLang = (currentLang) => {
    lang = currentLang
  }

  const getSecuredHeaders = (customHeaders = {}) => ({
    headers: {
      ...customHeaders,
      'Content-Type': 'application/json',
      'Accept-Language': lang,
      'Authorization': `Bearer ${token}`
    }
  })
  const getMultipartApiHeaders = () => ({
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept-Language': lang,
      'Authorization': `Bearer ${token}`
    }
  })
  const getUnsecuredHeaders = () => ({
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const createRequestFromPageDetails = ({sort, pageSize, itemsPage, search}) => ({
    offset: itemsPage.currentPage * pageSize,
    limit: pageSize,
    sort: sort,
    search: search
  })
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const register = (request) => api.post('user/register', request, getUnsecuredHeaders())
  const login = (request) => api.post('user/login', request, getUnsecuredHeaders())
  const logout = () => api.get('user/logout', null, getSecuredHeaders())

  const fetchDashboardData = () => api.get('user/dashboard', null, getSecuredHeaders())


  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    register,
    login,
    logout,

    fetchDashboardData,
  }
}

const __DEV__ = process.env.NODE_ENV !== 'production'

export const getApiBaseUrl = () => __DEV__ ? 'http://localhost:3000/' : '/'

export const securedAPI = create(getApiBaseUrl() + 'api')
export const unsecuredAPI = create(getApiBaseUrl())

export default securedAPI
