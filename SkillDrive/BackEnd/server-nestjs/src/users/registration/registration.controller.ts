import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { User } from '../schemas/user.schema';
import { userDTO } from '../dto/user.dto';

@Controller('users')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {
  }

  // @Get(":id")
  // getOne(@Param("id") id: string): Promise<User> {
  //   return this.registrationService.getById(id)
  // }

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUser: userDTO): Promise<User> {
    return this.registrationService.createUser(createUser)
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
