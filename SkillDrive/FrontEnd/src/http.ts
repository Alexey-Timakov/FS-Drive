import axios, { AxiosRequestConfig } from "axios";
import { UserDataWithTokens } from "./Interfaces/UserDataWithTokens";
import { setAccessToken } from "./services/setToken";

export const API_URL = "http://localhost:3000";
export const controller = new AbortController();

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  return config
})

$api.interceptors.response.use((config) => {
  return config
}, async (error) => {
  const originalReq = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalReq._isRetry = true;
    try {
      const response = await axios.get<UserDataWithTokens>(`${API_URL}/users/refresh`, { withCredentials: true })
      setAccessToken(response.data.accessToken);
      return $api.request(originalReq);
    }
    catch (error) {
      console.log("Unauthorized!", error)
    }
  }
  throw error;
})