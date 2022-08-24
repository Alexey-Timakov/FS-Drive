export interface IAccessToken {
  accessToken: string
}

export interface IRefreshToken {
  refreshToken: string
}

export interface IResetToken {
  resetToken: string
}

export interface IAccessAndRefreshTokens extends IAccessToken, IRefreshToken {
}