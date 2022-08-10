import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { User } from '../schemas/user.schema';
import { userDTO } from '../dto/user.dto';

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
  createUser(@Body() newUser: userDTO): Promise<User> {
    return this.registrationService.createUser(newUser)
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
