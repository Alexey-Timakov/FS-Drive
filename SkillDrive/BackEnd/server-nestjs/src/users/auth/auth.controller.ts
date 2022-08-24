import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';

import { IAuthCredentials } from '../interfaces/IAuthCredentials';
import { IAccessToken } from '../interfaces/ITokens';
import { IUserLoggedInWithRefreshToken } from '../interfaces/IUserLoggedInWithRefreshToken';
import { IUserLoggedIn } from '../interfaces/IUserLoggedIn';


@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('auth')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() credentials: IAuthCredentials, @Res() res: Response): Promise<Response<IUserLoggedIn> | Error> {
    const result = await this.authService.login(credentials)
    if (result) {
      res.cookie("refreshToken", result.refreshToken, {
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
        httpOnly: true,
      })
      const {refreshToken, ...rest} = result;
      return res.send(rest);
    } else {
      return new HttpException("Some critical error", HttpStatus.BAD_REQUEST)
    }
  }
}