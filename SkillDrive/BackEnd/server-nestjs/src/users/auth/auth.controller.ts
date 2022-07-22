import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { authCredentialsDTO } from '../dto/auth.credentials.dto';
import { accessAndRefreshTokens } from '../interfaces/tokens';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('auth')
  @HttpCode(HttpStatus.CREATED)
  login(@Body() credentials: authCredentialsDTO): Promise<accessAndRefreshTokens> {
    return this.authService.login(credentials)
  }
}