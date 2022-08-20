export interface IAccessAndRefreshTokens extends IAccessToken, IRefreshToken {
}

export interface IAccessToken {
  readonly accessToken: string
}

export interface IRefreshToken {
  readonly refreshToken: string
}

export interface IResetToken {
  resetToken: string
}