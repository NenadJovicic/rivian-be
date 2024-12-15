import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { UserDto } from '../dto/user.dto';
import { UserRepository } from '../user/user.repository';
import { LoginValidator } from '../validators/login.validator';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async login(body: LoginValidator, response: Response): Promise<LoginDto> {
    const user = await this.userRepository.findByEmailForLogin(body.email);
    if (!user) {
      throw BadRequestException.createBody({ message: 'Wrong credentials' });
    }
    await this.validatePassword(user.password, body.password);
    const token: string = this.jwtService.generateToken(user);
    const refreshToken: string = this.jwtService.generateRefreshToken(user);
    this.setRefreshTokenCookie(response, refreshToken);
    return { token, user: new UserDto(user) };
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    const daysInMilliseconds = 90 * 24 * 60 * 60 * 1000;
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + daysInMilliseconds),
    });
  }

  private async validatePassword(encryptedUserPassword: string, passwordForCompare: string): Promise<void> {
    const isValidPassword = await compare(passwordForCompare, encryptedUserPassword);
    if (!isValidPassword) {
      throw BadRequestException.createBody({ message: 'Wrong credentials' });
    }
  }
}
