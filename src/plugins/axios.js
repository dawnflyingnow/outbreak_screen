import Vue from 'vue'
import axios from 'axios'
// import router from '../router'

// axios.defaults.baseURL = process.env.VUE_APP_REQUEST_URL
axios.defaults.baseURL = '/api'  

// axios.create({
//     baseURL: process.env.VUE_APP_REQUEST_URL
// })
// 增加一个拦截器
axios.interceptors.response.use(response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
}, error => {

    let errMsg = error.response.data.message
    const statusCode = error.response.data.statusCode

    if (errMsg) {

        if (errMsg instanceof Array) {

            // errMsg.map(v => {
            //     setTimeout(() => {
            //         return Vue.prototype.$notify.error(v)
            //     }, 200)
            // })
        } else {
            if (statusCode === 401) {
                // router.replace({
                //     path: '/login',
                //     query: {
                //         redirect: router.currentRoute.path
                //     }
                // })
                // Message.info('已掉线，请重新登录')
            }
            // return Vue.prototype.$notify.error(errMsg)
        }

    } else {
        if (error.message) {

            // return Vue.prototype.$notify.error(error.message)
        }

    }


})

axios.interceptors.request.use(config => {
    // Do something before request is sent
    if (localStorage.getItem('token')) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config
})

// const http = axios.create({
//     baseURL: process.env.VUE_APP_REQUEST_URL
// })

Vue.prototype.$http = axios
Vue.prototype.$httpajax = axios
Vue.prototype.$httpajax.defaults.withCredentials = false