import { UserData } from "./UserData";

export interface UserDataWithTokens extends UserData {
  tokens: {
    accessToken: string,
    refreshToken: string,
  }  
};