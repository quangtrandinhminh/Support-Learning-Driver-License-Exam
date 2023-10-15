import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
    baseURL: "localhost:",
    
}

const api = axios.create(config);
api.interceptors.request.use((config) => {
    //chay truoc khi call api
    config.headers['Authorization'] = 'Bearer //put token here';
    return config;
});

export default api