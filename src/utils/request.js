// request.js
import axios from "axios";
import {Message} from "element-ui";
import router from "@/router";

export function getBaseUrl() {
// const baseUrl = 'http://47.109.49.39:522/saas-titan-service'
    return 'http://localhost:9090/wjh-service';
//     return 'http://47.109.49.39:522/saas-titan-service';
}

// Create an axios instance
const request = axios.create({
    // baseURL: 'http://47.109.49.39:520/saas-manage-service',
    baseURL: getBaseUrl(), // Use environment variable for flexibility
    timeout: 1000 * 30, // Set timeout for all requests
    withCredentials: true,
    headers: {
        'content-type': 'application/json; charset=utf-8'
    }
});
// Request interceptor for API token
request.interceptors.request.use(
    config => {
        // Assuming you store your token in localStorage (or use Vuex state management)
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers['Authorization'] = `${token}`;
        // }
        const token = localStorage.getItem("token");
        config.headers.token = `${token}`;
        return config;
    },
    error => {
        // if (error.response && error.response.status === 401) {
        //     // Token 过期或未授权
        //     // 处理逻辑，例如跳转到登录页面
        //     window.location.href = '/';
        // }
        // if (error.response && error.response.status === 500){
        //
        //     window.location.href = '/';
        // }
        // if (error.code === 'ERR_NETWORK'){
        //     window.location.href = '/';
        // }
        console.error('Request error: ', error);
        return Promise.reject(error);
    }
);

// Response interceptor for handling responses globally
request.interceptors.response.use((response) => {
    if (response.data.resultCode === 401) {
        Message.error(response.data.resultMessage)
        router.push({
            path:'/',
        })
        return ;
    }
    if (response.data.resultCode === 500) {
        Message.error(response.data.resultMessage);
    }

        // Any status code that lie within the range of 2xx cause this function to trigger
        return response.data; // Return only data
    },
    error => {
        console.log(error)
        // const status = error.response.status;
        // const message = error.response.data.message;
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // if (status === 401) {
        //     //未授权
        //     Message.error("您没有权限访问该资源，请重新登录！")
        //     router.replace({
        //         path: '/'
        //     }).then(res => {
        //         console.log(res)
        //     })
        // }
        // if (error.response.status === 404) {
        //     Message.error("服务器资源错误！")
        // }
        // if (status === 500) {
        //     //验证码错误处理
        //     if (message === 'VERIFICATION_CODE_PARAM_ERROR') {
        //         Message.error("验证码错误，请刷新后尝试重新登录！")
        //     } else if (message === 'ACCOUNT_PASSWORD_PARAM_ERROR') {
        //         Message.error("账户不存在或账户密码错误！")
        //     } else {
        //         Message.error("服务器出现异常，请联系管理员并稍后重试！")
        //     }
        //
        //     return Promise.reject(error);
        // }
    }
);

export default request;
