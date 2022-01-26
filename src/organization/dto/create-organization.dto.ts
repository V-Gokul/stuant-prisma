import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrganizationDto {
  @IsOptional()
  @IsNotEmpty()
  Name: string;

  @IsNotEmpty()
  Type: string;

  @IsNotEmpty()
  @IsOptional()
  Address: string;

  @IsNotEmpty()
  Phone: number;

  @IsNotEmpty()
  @IsOptional()
  email: string;
}
