import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserValidator } from '../validators/user.validator';

@Injectable()
export class UserRepository {
  async findByEmailForLogin(email: string): Promise<User> {
    return User.scope('login').findOne({ where: { email } });
  }

  async saveUser(user: UserValidator): Promise<User> {
    return User.create({ ...user });
  }

  async findById(id: string): Promise<User> {
    return User.findByPk(id);
  }
}
