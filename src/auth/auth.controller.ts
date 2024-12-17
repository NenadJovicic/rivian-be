import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { LoginValidator } from '../validators/login.validator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: LoginValidator, @Res({ passthrough: true }) response: Response): Promise<LoginDto> {
    return this.authService.login(body, response);
  }

  @Get('refresh-token')
  public async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshAuthToken(req, res);
  }
}
