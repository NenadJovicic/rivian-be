import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class OfficeValidator {
  @IsString()
  @IsNotEmpty()
  address: string;

  @Min(1)
  @IsInt()
  zipCode: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
