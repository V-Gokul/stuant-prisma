import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsDate()
  @IsOptional()
  Dob: Date;

  @IsNotEmpty()
  @IsOptional()
  address: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  organizationId: number;
}
