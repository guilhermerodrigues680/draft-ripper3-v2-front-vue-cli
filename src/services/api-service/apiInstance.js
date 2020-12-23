import axios from 'axios'

const apiInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v2',
  // baseURL: 'http://192.168.144.14:8080/api/v2',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// // Add a request interceptor
// apiInstance.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   console.debug('request', config)
//   return config
// }, function (error) {
//   // Do something with request error
//   console.debug('request', error)
//   return Promise.reject(error)
// });

// // Add a response interceptor
// apiInstance.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   console.debug('response', response)
//   return response
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   console.debug('response', error)
//   return Promise.reject(error)
// });

export default apiInstance