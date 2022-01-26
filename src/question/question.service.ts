import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MaterialService } from 'src/material/material.service';
import { PrismaService } from 'src/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    private prisma: PrismaService,
    private material: MaterialService,
  ) {}
  async create(createQuestionDto: CreateQuestionDto) {
    await this.material.findById(createQuestionDto.materialId);
    const newQuestion = await this.prisma.question.create({
      data: {
        questionText: createQuestionDto.questionText,
        type: createQuestionDto.type,
        answerText: createQuestionDto.answerText,
        choice: {
          createMany: { data: createQuestionDto.choice },
        },
        material: { connect: { id: createQuestionDto.materialId } },
      },
    });
    return newQuestion;
  }

  async findAll() {
    return await this.prisma.question.findMany({
      include: { choice: true },
    });
  }

  async findById(id: number) {
    return await this.prisma.question.findUnique({
      where: { id },
      select: {
        id: true,
        questionText: true,
        type: true,
        answerText: true,
        materialId: true,
        choice: true,
      },
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    await this.findById(id);
    const data: Prisma.QuestionUpdateInput = {
      questionText: updateQuestionDto.questionText,
      type: updateQuestionDto.type,
      answerText: updateQuestionDto.type,
    };
    if (updateQuestionDto.choice) {
      data.choice = {
        update: updateQuestionDto.choice.map(({ id, ...data }) => ({
          where: { id },
          data,
        })),
      };
    }
    return this.prisma.question.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.question.delete({ where: { id } });
  }
}
