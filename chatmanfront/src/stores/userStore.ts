import { defineStore } from "pinia";
import { UserService } from "@/services/user.service";
import type { User } from "@/models/User";
import router from "@/router";


const userService: UserService = new UserService();

export const UserStore = defineStore({
  id: "userStore",
  state: () => ({
    loggedInUser: undefined as User | undefined,
    users:[{ username:" Please Refresh"}],
    friends:[{ username:" Please Refresh"}],
    userInfo:{
      username:"",
    }
  }),
  getters: {
    userName: (state) => {
      if (state.loggedInUser) return state.loggedInUser.username;
      return "";
    },
    isLoggedIn: (state) => {
      return state.loggedInUser != undefined;
    },
  },
  actions: {
    createUser(username: string, email: string, password: string) {
      userService
        .createUser(username, email, password)
        .then((user) => {
          this.loggedInUser = user;
        })
        .catch((err) => console.log(err));
    },
    logOut() {
      this.loggedInUser = undefined;
      localStorage.clear()
      router.push("/")
    },

    findNonFriends(search: string) {
      userService
        .findNonFriends(search)
        .then((friends) => (this.users = friends))
        .catch((err) => console.log(err))
      console.log('test');
      console.log(this.users);
    },

    findMyFriends() {
      userService
        .findMyFriends("first")
        .then((friends) => (this.friends = friends))
        .catch((err) => console.log(err))
      console.log('test my friends');
      console.log(this.friends);
    },

    getUserInfo(search: string){
      userService
        .getInfo(search)
        .then((info) => (this.userInfo = info))
        .catch((err) => console.log(err))
    },

    loginUser(username: string, password: string) {
      userService
        .loginUser(username, password)
        .then((user) => {
          this.loggedInUser = user;
          console.log(user);
          console.log(this.loggedInUser);
          localStorage.setItem("state", JSON.stringify(this.$state))
        })
        .catch((err) => console.log(err));
    },

    getFriendRequest(loggedinUser: string){
      const res = userService.getFriendRequests(loggedinUser)
      return res
    },

    acceptFriendRequest(){
      
    }
  },
});
