import axios, { AxiosRequestConfig } from "axios";

export const API_URL = "http://localhost:3000";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
  return config
})

export default $api;