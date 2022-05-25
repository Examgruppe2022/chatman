import type { AxiosInstance, AxiosRequestConfig } from "axios";

export function jwtInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    (request: AxiosRequestConfig) => {
      console.log(request);
      // add auth header with jwt if account is logged in and request is to the api url
      const token = localStorage.getItem("loggedInUserToken");
      const isApiUrl = request.baseURL.startsWith("http://localhost:80");
      if (token && isApiUrl) {
        request.headers.common.Authorization = `Bearer ${token}`;
      }
      return request;
    },
    (error) => {
      console.log(error);
    }
  );
}
