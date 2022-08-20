import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { userDTO } from '../dto/user.dto';
import { UserLoggedInDTO } from '../dto/userLoggedIn.dto';
import { Response } from 'express';
import { UserLoggedInWithRefreshTokenDTO } from '../dto/userLoggedInWithRefresh.dto';

@Controller('users')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {
  }

  @Get("findusers")
  findUser(@Param("id") id: string) {
    return this.registrationService.findUsers();
  }

  @Post("createtest")
  createTest(@Body() newUser: userDTO) {
    return this.registrationService.createTempUser(newUser);
  }

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() newUser: userDTO, @Res() res: Response) {
    const result = await this.registrationService.createUser(newUser);
    if (result) {
      res.cookie("refreshToken", result.refreshToken, {
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
        httpOnly: true,
      });
      const {refreshToken, ...rest} = result;
      return res.send(rest);
    } else {
      return new HttpException("Some critical error", HttpStatus.BAD_REQUEST)
    }
  }

  // @Put(":id")
  // update(@Body() updateUser: userDTO, @Param("id") id: string): Promise<User> {
  //   return this.registrationService.update(id, updateUser)
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string): Promise<User> {
  //   return this.registrationService.remove(id)
  // }
}
