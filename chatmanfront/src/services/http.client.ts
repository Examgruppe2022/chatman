import axios from "axios"
import {jwtInterceptor} from "@/helpers/jwt-interceptor";

const instance = axios.create({
  baseURL: "http://localhost:80",
  headers: {
    "content-type": "application/json",
  },
})
jwtInterceptor(instance);
export default instance
