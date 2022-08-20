import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { changePassCredentialsDTO } from '../dto/changePass.credentials.dto';
import { resetPassCredentialsDTO } from '../dto/resetPass.credentials.dto';
import { ResetPassService } from './reset-pass.service';

@Controller('users')
export class ResetPassController {
  constructor(private readonly resetPassService: ResetPassService) { }

  @Post('resetpass')
  sendResetPasswordLink(@Body() body: resetPassCredentialsDTO): Promise<string> {
    return this.resetPassService.sendResetPasswordLink(body.userMail)
  }
  
  @Get("resetpass/:id")
  async sendResetPasswordForm(@Param("id") resetToken: string, @Res() res: Response) {
    const result = await this.resetPassService.sendResetPasswordForm(resetToken);
    if (result) {
      res.sendFile("resetPass/index.html", { root: "static" });
    }
  }

  @Post('changepass')
  changePassword(@Body() body: changePassCredentialsDTO): Promise<boolean | Error> {
   return this.resetPassService.changePassword(body.userMail, body.userPassword);
  }
}