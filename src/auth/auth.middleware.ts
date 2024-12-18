import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { JwtService } from '../auth/jwt.service';
import { User } from '../entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserRequest } from './user.request';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async use(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
    const authHeader: string = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'Invalid authorization' });
    }
    const [prefix, token] = authHeader.split(' ');
    if (prefix !== 'Bearer') {
      throw new UnauthorizedException({ message: 'Invalid authorization' });
    }
    if (!token || token.length === 0) {
      throw new UnauthorizedException();
    }
    try {
      const { id } = this.jwtService.verifyToken(token);
      const user: User = await this.userRepository.findById(id);
      if (!user) {
        throw new UnauthorizedException();
      }
      req.userId = id;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return next();
  }
}
