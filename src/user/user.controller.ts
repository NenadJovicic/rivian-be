import { Body, Controller, Post } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UserDto } from '../dto/user.dto';
import { UserValidator } from '../validators/user.validator';
import { UserRepository } from './user.repository';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  /**
   * Method created only for testing purposes, to add test data.
   * In real case scenario, it would go like in other cases, where we have service that will call repository
   */
  public async createUser(@Body() body: UserValidator): Promise<UserDto> {
    const encryptedPassword = await hash(body.password, 10);
    return this.userRepository.saveUser({ ...body, password: encryptedPassword });
  }
}
