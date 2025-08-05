import { Base } from "./base";

export interface LoginResponse {
  access_token: string;
  token_type: string;
  account_id: number;
}

export interface User extends Base {
  fullname: string;
}
