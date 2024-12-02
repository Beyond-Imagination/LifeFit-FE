import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthError, ForbiddenError, NotFoundError } from "./error";

const HOST = process.env.NEXT_PUBLIC_API_SERVER_HOST;
const PORT = process.env.NEXT_PUBLIC_API_SERVER_PORT;
export const BASE_URL = `${HOST}:${PORT}`;

export interface RequestConfig extends AxiosRequestConfig {
  suppressStatusCode?: number[];
}

function AxiosAuthInterceptor<T>(response: AxiosResponse<T>): AxiosResponse {
  const status = response.status;

  if (status === 404) {
    throw new NotFoundError();
  }

  if (status === 403) {
    throw new ForbiddenError();
  }

  if (status === 401) {
    throw new AuthError();
  }

  return response;
}

function AxiosErrorAuthInterceptor<T>(error: AxiosError<T>) {
  throw error;
}

export default async function withAxios(requestConfig: RequestConfig) {
  const instance = axios.create();

  instance.interceptors.response.use(
    (response) => AxiosAuthInterceptor(response),
    (error) => AxiosErrorAuthInterceptor(error),
  );

  instance.interceptors.request.use(
    (config) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return await instance.request({
    ...requestConfig,
    baseURL: BASE_URL,
    validateStatus: (status) =>
      [...(requestConfig.suppressStatusCode || [])].includes(status) ||
      status < 500,
  });
}
