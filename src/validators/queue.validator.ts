import { IsNotEmpty, IsString } from 'class-validator';

export class AddQueueValidator {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  officeId: string;
}
