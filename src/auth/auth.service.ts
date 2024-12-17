import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { LoginValidator } from '../validators/login.validator';
import { JwtPayload, JwtService } from './jwt.service';

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

  public async refreshAuthToken(req: Request, res: Response): Promise<LoginDto> {
    const refreshToken: string = this.getRefreshTokenFromRequest(req);
    const payload: JwtPayload = this.jwtService.verifyToken(refreshToken);
    const user: User = await this.userRepository.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    const newRefreshToken = this.jwtService.generateRefreshToken(user);
    this.setRefreshTokenCookie(res, newRefreshToken);
    const newAuthToken: string = this.jwtService.generateToken(user);
    return { token: newAuthToken, user: new UserDto(user) };
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

  private getRefreshTokenFromRequest(req: Request): string {
    const cookies = req.cookies;
    const refreshToken: string = cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException({ message: 'No token' });
    }
    return refreshToken;
  }
}
