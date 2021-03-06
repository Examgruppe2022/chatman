import http from "./http.client";
import type { User } from "@/models/User";
import type { Key } from "readline";
import type { Login } from "@/DTOs/Login";

export class UserService {
  async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const res = await http.post<User>("/auth/register", {
      username: email,
      email: username,
      password: password,
    });
    localStorage.setItem("loggedInUser", JSON.stringify(res.data));
    return res.data;
  }

  async loginUser(username: string, password: string): Promise<User> {
    const res = await http.post<Login>("auth/login", {
      username: username,
      password: password,
    });
    localStorage.setItem(
      "loggedInUserToken",
      JSON.stringify(res.data.access_token)
    );
    return this.getMe(username, password);
  }

  async getUser(token: string) {
    const res = localStorage.getItem("loggedInUserToken");
    await http.get("auth/user");
  }

  async findNonFriends(username: string): Promise<User[]> {
    const res = await http.post<User[]>("/user/getNonFriends", {
      firstString: username,
      secondString: "",
    });
    return res.data;
  }

  async getInfo(search: string): Promise<User> {
    const res = await http.post<User>("/profiles/info", {
      name: search,
      username: "",
      password: "",
    });
    return res.data;
  }

  async findMyFriends(username: string): Promise<User[]> {
    const res = await http.post<User[]>("/user/friends", {
      text: username,
    });
    return res.data;
  }

  async getMe(username: string, password: string): Promise<User> {
    const res = await http.post("/user/getMe", {
      username: username,
      password: password,
    });
    localStorage.setItem("returnedUserName", res.data.username);
    return res.data;
  }
}
