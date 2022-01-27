import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsOptional()
  mobile: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  password: string;
}
