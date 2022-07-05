import { userData } from "./userData";

export interface userDataWithTokens extends userData {
  tokens: {
    accessToken: string,
    refreshToken: string,
  }  
};