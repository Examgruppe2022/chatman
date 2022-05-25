import axios from "axios";
import { jwtInterceptor } from "@/helpers/jwt-interceptor";

const instance = axios.create({
  baseURL: "http://185.51.76.42:8091/",
  headers: {
    "content-type": "application/json",
  },
});
jwtInterceptor(instance);
export default instance;
