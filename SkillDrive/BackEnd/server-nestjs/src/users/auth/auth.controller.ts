import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { authCredentialsDTO } from '../dto/auth.credentials.dto';
import { IAccessToken } from '../interfaces/tokens';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserLoggedInWithRefreshTokenDTO } from '../dto/userLoggedInWithRefresh.dto';


@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('auth')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() credentials: authCredentialsDTO, @Res() res: Response) {
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