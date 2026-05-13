import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  timeout: 45000,
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError<{ message?: string }>) =>
    Promise.reject(new Error(error.response?.data?.message ?? "An unknown error occurred")),
);

const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) => instance.get<T, T>(url, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => instance.post<T, T>(url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => instance.put<T, T>(url, data, config),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => instance.patch<T, T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) => instance.delete<T, T>(url, config),
};

export default http;
