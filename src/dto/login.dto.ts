import { UserDto } from './user.dto';

export interface LoginDto {
  token: string;
  user: UserDto;
}
