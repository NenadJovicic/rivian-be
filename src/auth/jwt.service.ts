import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { User } from '../entities/user.entity';

export interface JwtPayload {
  id: string;
}

@Injectable()
export class JwtService {
  private jwtSecret = process.env.JWT_SECRET;

  generateToken(user: User): string {
    const payload: JwtPayload = {
      id: user.id,
    };
    return sign(payload, this.jwtSecret, { algorithm: 'HS512', expiresIn: process.env.TOKEN_EXP });
  }

  verifyToken(token: string): JwtPayload {
    const payload: JwtPayload = verify(token, this.jwtSecret) as JwtPayload;
    // pravi payload sadrzi i neke jwt podatke, koji ne trebaju
    return { id: payload.id };
  }

  generateRefreshToken(user: User): string {
    const payload = {
      id: user.id,
    };
    return sign(payload, this.jwtSecret, { algorithm: 'HS512', expiresIn: process.env.REFRESH_TOKEN_EXP });
  }
}
