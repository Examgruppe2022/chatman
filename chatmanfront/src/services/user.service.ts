import http from "./http.client";
import type { User } from "@/models/User";

export class UserService {
  async createUser(
    name: string,
    username: string,
    password: string
  ): Promise<User> {
    const res = await http.post<User>("/users", {
      name: name,
      username: username,
      password: password,
    });
    localStorage.setItem("loggedInUser", JSON.stringify(res.data));
    return res.data;
  }

  async loginUser(username: string, password: string): Promise<User> {
    const res = await http.post<User>("auth/login", {
      username: username,
      password: password,
    });
    localStorage.setItem("loggedInUserToken", JSON.stringify(res.data));
    return res.data;
  }

  async getUser(token: string){
    const res = localStorage.getItem("loggedInUserToken")
    await http.get("auth/user")
  }

  async findFriends(search:string): Promise<User[]> {
    const res = await http.post<User[]>("/getNonfriends",{
      name:search,
      username:"",
      password:"",
    });
    return res.data
  }

  async getInfo(search : string): Promise<User> {
    const res = await  http.post<User>("/profiles/info", {
      name: search,
      username:"",
      password:"",
    });
    return res.data;
  }
}
