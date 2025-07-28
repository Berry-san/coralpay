import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL, sessionStorageName } from "../config";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  requiresAuth?: boolean;
}

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

// Interceptor with custom flag handling
axiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    if (typeof window !== "undefined" && config.requiresAuth !== false) {
      const storedSession = sessionStorage.getItem(sessionStorageName);
      if (storedSession) {
        try {
          const { token } = JSON.parse(storedSession);
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (err) {
          console.error("Invalid session token format in sessionStorage");
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios factory function
const axios = (url?: string): AxiosInstance => {
  if (url) {
    axiosInstance.defaults.baseURL = `${API_BASE_URL}${url}`;
  }
  return axiosInstance;
};

export const AxiosObject = axiosInstance;
export default axios;
