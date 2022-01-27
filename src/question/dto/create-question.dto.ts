import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  questionText: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  answerText: string;

  @IsNotEmpty()
  materialId: number;

  @IsNotEmpty()
  choice: CreateChoiceDto[];

  @IsNotEmpty()
  organizationId: number;
}

export class CreateChoiceDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  choiceText: string;

  @IsNotEmpty()
  choiceAnswer: boolean;
}
