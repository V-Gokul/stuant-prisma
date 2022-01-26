import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMaterialDto {
  @IsNotEmpty()
  tittle: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsOptional()
  content: string;

  @IsNotEmpty()
  organizationId: number;
}
