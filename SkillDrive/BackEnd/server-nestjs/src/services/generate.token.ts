const jwt = require('jsonwebtoken');

import { IAccessAndRefreshTokens, IResetToken } from '../users/interfaces/ITokens';
import { ACCES_TOKEN_SECRET, ACCES_TOKEN_LIFE_SEC, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE_SEC } from '../common/variables';
import { RESET_TOKEN_SECRET, RESET_TOKEN_LIFE_SEC } from '../common/variables';
import { IUserDataFromJWT } from '@/users/interfaces/IUserDataFromJWT';

export const generateToken = (mail: string): IAccessAndRefreshTokens => {

  const payload: IUserDataFromJWT = {
    "userMail": mail,
    "userRole": "user",
  };

  const accessToken = jwt.sign(payload, ACCES_TOKEN_SECRET, { expiresIn: ACCES_TOKEN_LIFE_SEC });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFE_SEC });

  return {
    accessToken,
    refreshToken
  };
};

export const generateResetToken = (userMail: string): IResetToken => {

  const payload = {
    "userMail": userMail,
  };

  const resetToken = jwt.sign(payload, RESET_TOKEN_SECRET, { expiresIn: RESET_TOKEN_LIFE_SEC });

  return {
    resetToken
  };
};