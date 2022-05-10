import { defineStore } from "pinia";
import type { User } from "@/models/User";
import { UserService } from "@/services/user.service";

const userService: UserService = new UserService();

export const UserStore = defineStore({
  id: "userStore",
  state: () => ({
    loggedInUser: undefined as User | undefined,
  }),
  getters: {
    userName: (state) => {
      if (state.loggedInUser) return state.loggedInUser.name;
      return "";
    },
    isLoggedIn: (state) => {
      return state.loggedInUser != undefined;
    },
  },
  actions: {
    createUser(name: string, email: string, password: string) {
      userService
        .createUser(name, email, password)
        .then((user) => {
          this.loggedInUser = user;
        })
        .catch((err) => console.log(err));
    },
    logOut() {
      this.loggedInUser = undefined;
    },
    loginUser(username: string, password: string) {
      userService
        .loginUser(username, password)
        .then((user) => {
          this.loggedInUser = user;
        })
        .catch((err) => console.log(err));
      this.loggedInUser = {
        username: username,
        password: password,
        uuid: "5f144613-fc1b-4ee0-98e7-a171b7c94b2d",
        name: "",
      };
      /*
      userService
        .loginUser(username,password)
        .then((user) => {this.loggedInUser = user})
        .catch((err) => console.log(err))
       */
    },
  },
});
