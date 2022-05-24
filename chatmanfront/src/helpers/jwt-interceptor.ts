import axios from 'axios';


export function jwtInterceptor() {
  axios.interceptors.request.use((request) => {
    // add auth header with jwt if account is logged in and request is to the api url
  if (request != undefined) {
    const token = localStorage.getItem("loggedInUserToken");
    const isApiUrl = request.url.startsWith(process.env.VUE_APP_API_URL);

    if (token && isApiUrl) {
        request.headers.common.Authorization = `Bearer ${token}`;
    }
  }
    return request;
  });
}
