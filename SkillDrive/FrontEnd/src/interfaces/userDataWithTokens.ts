import { UserData } from "./UserData";

export interface UserDataWithTokens extends UserData {
  id: string;
  accessToken: string,
};