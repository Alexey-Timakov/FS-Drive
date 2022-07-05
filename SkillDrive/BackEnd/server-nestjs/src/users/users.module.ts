import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RegistrationModule } from './registration/registration.module';
import { AuthModule } from './auth/auth.module';
import { ResetPassModule } from './reset-pass/reset-pass.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    RegistrationModule,
    AuthModule,
    ResetPassModule
  ]
})
export class UsersModule {}
