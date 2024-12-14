import { Injectable } from '@nestjs/common';
import { UserValidator } from '../dto/user.validator';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  async findByEmailForLogin(email: string): Promise<User> {
    return User.scope('login').findOne({ where: { email } });
  }

  async saveUser(user: UserValidator): Promise<User> {
    return User.create({ ...user });
  }
}
