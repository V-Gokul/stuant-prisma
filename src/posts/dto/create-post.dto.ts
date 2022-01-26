import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsOptional()
  about: string;

  @IsOptional()
  userId: number;
}
