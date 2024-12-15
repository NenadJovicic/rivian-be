import { IsNotEmpty, IsString } from 'class-validator';

export class ChargingSpotValidator {
  @IsString()
  @IsNotEmpty()
  spotName: string;

  @IsString()
  @IsNotEmpty()
  officeId: string;
}
