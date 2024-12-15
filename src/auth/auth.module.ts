import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, AuthMiddleware],
  exports: [JwtService],
})
export class AuthModule {}
