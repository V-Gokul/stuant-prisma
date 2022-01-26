import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MaterialService } from 'src/material/material.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, MaterialService, PrismaService],
})
export class QuestionModule {}
