import { IsNotEmpty, IsString } from 'class-validator';

export class StartChargingSessionValidator {
  @IsString()
  @IsNotEmpty()
  /**
   * This was just easier solution to implement, but in general, this can be extracted from auth token
   */
  userId: string;

  @IsString()
  @IsNotEmpty()
  officeId: string;
}
