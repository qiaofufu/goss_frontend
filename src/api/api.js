import {GetCookie} from "@/utils/cookie.js";
import axios from 'axios';
export const APIInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    }
});

APIInstance.interceptors.request.use(
    function (config) {
        const token = GetCookie("websession");
        if (token === null) {
            return config;
        }
        config.headers.Authorization = token;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });