import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import cookie from 'js-cookie'

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api"
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // attach accessToken
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
    };
    const accessToken: string | undefined = cookie.get("access_token");

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
