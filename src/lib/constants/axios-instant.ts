import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { SERVER_URL } from "@/lib/constants/common";

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (err: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

// 👇 Extend AxiosRequestConfig để thêm _retry
interface CustomAxiosRequest extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosClient = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------- REQUEST INTERCEPTOR --------------------
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------- RESPONSE INTERCEPTOR --------------------
axiosClient.interceptors.response.use(
  (response) => response.data,

  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequest;

    // ----------- TOKEN EXPIRED (401) --------------
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              if (token) {
                originalRequest.headers = {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${token}`,
                };
              }
              resolve(axiosClient(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        const res = await axios.post(`${SERVER_URL}/api/v1/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const newAccessToken = res.data?.access_token;

        localStorage.setItem("access_token", newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
