import { User } from '../entities/user.entity';

export class UserDto {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly defaultOfficeId: string;
  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.defaultOfficeId = user.defaultOfficeId;
  }
}
