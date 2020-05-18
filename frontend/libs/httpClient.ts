import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import cookie from 'js-cookie';
import Router from 'next/router';
import Config from "../config";
import { reduxStore } from "../redux"
import { ErrorSetAction } from "../redux/store"


const instance: AxiosInstance = axios.create({
  baseURL: Config.API_URL
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
    const success: boolean = response.data.success
    const message: string = response.data.message || "Mayday mayday, We found error."
    if (!success) {
      reduxStore.dispatch(ErrorSetAction({ message }))
    }
    return response;
  },
  (error) => {
    // Do something with request error
    const status = error.response.status
    if (status === 422 || status === 401) {
      cookie.remove("access_token")
      Router.push('/lobby', '/lobby')
    }
    reduxStore.dispatch(ErrorSetAction({ message: "Mayday mayday, We found error."}))
    return Promise.reject(error);
  }
);

export default instance;
