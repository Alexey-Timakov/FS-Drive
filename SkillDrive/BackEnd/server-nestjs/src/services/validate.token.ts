const jwt = require('jsonwebtoken');

import { ACCES_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@/common/variables";
import { IUserDataFromJWT } from "@/users/interfaces/IUserDataFromJWT";

export const validateAccessToken = (token: string) => {
  try {
    const queryUser: IUserDataFromJWT = jwt.verify(token, ACCES_TOKEN_SECRET);
    return queryUser;
  } catch (error) {
    return null;
  }
}

export const validateRefreshToken = (token: string) => {
  try {
    const queryUser: IUserDataFromJWT = jwt.verify(token, REFRESH_TOKEN_SECRET);
    return queryUser;
  } catch (error) {
    return null;
  }
}