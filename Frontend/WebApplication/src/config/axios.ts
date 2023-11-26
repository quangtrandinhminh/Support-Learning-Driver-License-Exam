import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
    baseURL: "https://localhost:7066/api/",
}

const api = axios.create(config);

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, null);

export default api;