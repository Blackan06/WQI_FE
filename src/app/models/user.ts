import { Base } from "./base";

export interface LoginResponse {
  access_token: string;
  tokenType: string;
  userId: number;
  expiresIn: number;
  userName: string;
  email: string;
  phoneNumber?: string;
  currenNoticeCount: number;
}

export interface User extends Base {
  fullname: string;
}
