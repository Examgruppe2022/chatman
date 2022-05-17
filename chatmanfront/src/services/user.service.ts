import http from "./http.client";
import type { User } from "@/models/User"

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
    localStorage.setItem('loggedInUser', JSON.stringify(res.data));
    return res.data;
  }

  async loginUser(
    username: string,
    password: string
  ): Promise<User> {
    const res = await http.post<User>("auth/login", {
      username: username,
      password: password
    });
    localStorage.setItem('loggedInUser', JSON.stringify(res.data));
    return res.data
  }
}
