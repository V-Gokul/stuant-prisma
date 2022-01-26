import { IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  Name: string;

  @IsNotEmpty()
  materialId: [number];

  @IsNotEmpty()
  requiredCredits: number;

  @IsNotEmpty()
  enrolledStudents: number[];

  @IsNotEmpty()
  organizationId: number;
}
