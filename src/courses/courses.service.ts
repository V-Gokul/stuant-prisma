import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}
  async create(createCourseDto: CreateCourseDto) {
    const newCourse = await this.prisma.courses.create({
      data: {
        Name: createCourseDto.Name,
        requiredCredits: createCourseDto.requiredCredits,
        enrolledStudents: {
          connect: createCourseDto.enrolledStudents.map((id) => {
            return { id };
          }),
        },
        organization: {
          connect: { id: createCourseDto.organizationId },
        },
        material: {
          connect: createCourseDto.materialId.map((id) => {
            return { id };
          }), //getting the value as array in many to many relation ship so we are using  map function to return the value as an array
        },
      },
    });
    return newCourse;
  }

  async findAll() {
    return await this.prisma.courses.findMany({
      include: { material: true, enrolledStudents: true, organization: true },
    });
  }

  async findOne(id: number) {
    return await this.prisma.courses.findUnique({
      where: { id },
      include: { material: true, enrolledStudents: true, organization: true },
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    await this.findOne(id);
    return await this.prisma.courses.update({
      data: {
        Name: updateCourseDto.Name,
        requiredCredits: updateCourseDto.requiredCredits,
      },
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.courses.delete({ where: { id } });
  }
}
