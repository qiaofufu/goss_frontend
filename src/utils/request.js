import {GetCookie} from "@/utils/cookie.js";
import axios from 'axios';
import {ElMessage} from "element-plus";
const instance = axios.create({
    baseURL: 'http://localhost:8000/v1',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    }
});


// request interceptor
instance.interceptors.request.use(
    config => {
        const token = GetCookie("websession");
        if (token === null) {
            return config;
        }
        config.headers.Authorization = token;
        return config;
    },
    error => {
        return Promise.reject(error);
    });

// response interceptor
instance.interceptors.response.use(
    response => {
       if (response.data.status === 1) {
        ElMessage.warning(response.data.msg);
        return Promise.reject(response.data);
       }
        return response.data;

    },
    error => {
        return Promise.reject(error);
    });

export default instance;