import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { IUserUnreg } from '../interfaces/IUserUnreg';
import { IUserLoggedIn } from '../interfaces/IUserLoggedIn';
import { Response } from 'express';

@Controller('users')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {
  }

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() newUser: IUserUnreg, @Res() res: Response): Promise<Response<IUserLoggedIn>> {
    const result = await this.registrationService.createUser(newUser);
    if (result) {
      res.cookie("refreshToken", result.refreshToken, {
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
        httpOnly: true,
      });
      const answer = new IUserLoggedIn(result);
      return res.send(answer);
    }
    // else {
    //   return new HttpException("Some critical error", HttpStatus.BAD_REQUEST)
    // }
  }

  // @Put(":id")
  // update(@Body() updateUser: IUserUnreg, @Param("id") id: string): Promise<User> {
  //   return this.registrationService.update(id, updateUser)
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string): Promise<User> {
  //   return this.registrationService.remove(id)
  // }


  // @Get("findusers")
  // findUser(@Param("id") id: string) {
  //   return this.registrationService.findUsers();
  // }
}
