import type { LoginUser } from "@/DTOs/LoginUser";

export class UserAndTokenDTO {
  loginDto: LoginUser;

  constructor(loginDto: LoginUser, token: {}) {
    this.loginDto = loginDto;
    this.token = token;
  }

  token: {};
}
