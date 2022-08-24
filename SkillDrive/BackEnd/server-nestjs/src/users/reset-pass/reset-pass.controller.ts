import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { IChangePassCredentials } from '../interfaces/IChangePassCredentials';
import { IResetPassCredentials } from '../interfaces/IResetPassCredentials';
import { ResetPassService } from './reset-pass.service';

@Controller('users')
export class ResetPassController {
  constructor(private readonly resetPassService: ResetPassService) { }

  @Post('resetpass')
  sendResetPasswordLink(@Body() body: IResetPassCredentials): Promise<string> {
    return this.resetPassService.sendResetPasswordLink(body.userMail)
  }
  
  @Get("resetpass/:id")
  async sendResetPasswordForm(@Param("id") resetToken: string, @Res() res: Response): Promise<any> {
    const result = await this.resetPassService.sendResetPasswordForm(resetToken);
    if (result) {
      res.sendFile("resetPass/index.html", { root: "static" });
    }
  }

  @Post('changepass')
  changePassword(@Body() body: IChangePassCredentials): Promise<boolean | Error> {
   return this.resetPassService.changePassword(body.userMail, body.userPassword);
  }
}