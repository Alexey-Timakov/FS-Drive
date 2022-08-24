import { IUserData } from "./IUserData";

export interface UserDataWithTokens extends IUserData {
  id: string;
  accessToken: string,
};