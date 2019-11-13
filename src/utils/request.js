import axios from 'axios'
import { Modal, message } from 'ant-design-vue'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'http://www.test.com',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // console.log(config)
    // return

    // if (store.getters.token && Number(store.getters.expires_in) - timestamp < 600) {
    //   // 重新请求token
    //   console.log('每次都来')
    //   new Promise(resolve => {
    //     axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
    //     axios.defaults.headers.common['Authorization'] = store.getters.token;
    //     axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    //     axios.get('v1/auth/refresh').then(response => {
    //       console.log(response)
    //       let data = response.data.data
    //       store.dispatch('user/resetToken')
    //       store.dispatch('user/setToken', data)

    //     })
    //   }).then(data => {
    //       console.log('难受死了')
    //       resolve(data)
    //   })

    // }


    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      // config.headers['authorization'] = getToken()
      config.headers['authorization'] = store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const token = response.headers['authorization'];
    if (token) {
      /**
       * 1. remove token from vuex and Cookies
       * 2. add token to vuex and Cookies
       */
      store.dispatch('user/resetToken')
      store.dispatch('user/setToken', token)
    }

    const res = response.data
    // console.log(response)
    // if the custom code is not 200, 201 or 204, it is judged as an error.
    if (res.code !== 200 && res.code !== 201 && res.code !== 204) {
      /**
       * when the response.status is not allowed by web brower, e.g., 200, 201..
       * prompt error
       */

        message.error(res.message || 'Error')
      
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log(error.response) // for debug
    /**
     * the error code from server handled by me is 400, , so it is can't pass to component
     */
    message.error(error.response.data.message ? error.response.data.message : error.message)
    // handle unauthenticated requesst
    if (error.response.status === 401 || error.response.status === 429) {
      store.dispatch('user/resetToken').then(() => {
        console.log(error.response)
        Modal.info({
          title: '验证失败',
          content: error.response.data.message ? error.response.data.message : error.message
        })
        setTimeout(() => {
          location.reload()
        }, 2000);
      })
    }
    if(error.response.data.code === 401){
      location.href = '/#/401'
    }
    return Promise.reject(error)
  }
)

export default service