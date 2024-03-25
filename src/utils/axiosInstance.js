import axios from "axios";
import { BASE_URL } from "../constants/environments";
import { tokenMethod } from "../utils/token";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // gọi api để cập nhật token mới
        const { tokenData } = await axiosInstance.put("/customer/refresh", {
          refreshToken: tokenMethod.get()?.refreshToken,
        });
        // lưu lại token mới vào local or cooki
        tokenMethod.set({
          accessToken: tokenData?.token,
          refreshToken: tokenData?.refreshToken,
        });
        // thay đổi token của header theo iu cầu ban đầu
        originalRequest.headers.Authorization = `Bearer ${tokenData?.token}`;
        // gọi lại yêu cầu với token mới
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log("Err");
        tokenMethod.remove();
      }
    }
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${tokenMethod.get()?.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
