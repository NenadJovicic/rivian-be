import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { LoginValidator } from '../dto/login.validator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: LoginValidator, @Res({ passthrough: true }) response: Response): Promise<LoginDto> {
    return this.authService.login(body, response);
  }
}
