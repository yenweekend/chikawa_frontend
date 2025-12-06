import axios from "axios";
import { SERVER_URL } from "@/lib/constants/common"; 

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (err: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];


const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const axiosClient = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);


axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // Nếu request đã retry rồi thì không retry nữa
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu refresh đang diễn ra → đưa request vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosClient(originalRequest));
            },
            reject: (err) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // gọi API refresh token
        const refreshToken = localStorage.getItem("refresh_token");
        const res = await axios.post(`${SERVER_URL}/api/v1/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const newAccessToken = res.data?.access_token;

        // lưu token mới
        localStorage.setItem("access_token", newAccessToken);

        // xử lý queue
        processQueue(null, newAccessToken);

        // gắn token mới
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        // refresh thất bại → xoá token → logout
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
