import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';

import { IAuthCredentials } from '../interfaces/IAuthCredentials';
import { IUserLoggedIn } from '../interfaces/IUserLoggedIn';
import { IUserDataOnRefreshPage } from '../interfaces/IUserDataOnRefreshPage';
import { AuthGuard } from '@/guards/auth.guard';


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
      const { refreshToken, ...rest } = result;
      return res.send(rest);
    } else {
      return new HttpException("Some critical error", HttpStatus.BAD_REQUEST)
    }
  }

  @Get('refresh')
  async refreshToken(@Req() request: Request, @Res() res: Response): Promise<Response<IUserLoggedIn>> {
    try {
      const refreshToken = request.cookies["refreshToken"];
      const result = await this.authService.refreshToken(refreshToken);

      if (result) {
        res.cookie("refreshToken", result.refreshToken, {
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
          httpOnly: true,
        })
        const { refreshToken, ...rest } = result;
        return res.send(rest);
      } else {
        throw new HttpException("Permission denied", HttpStatus.UNAUTHORIZED);
      }

    } catch (error) {
      throw new HttpException("Permission denied", HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('get-user-data/:id')
  @UseGuards(AuthGuard)
  async getUserInfo(@Param("id") id: string): Promise<IUserDataOnRefreshPage> {
    return await this.authService.getUserData(id);
  }
}