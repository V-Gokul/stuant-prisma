import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as _ from 'lodash';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.prisma.user.create({ data: createUserDto });
    return newUser;
  }

  async findAll() {
    const user = await this.prisma.user.findMany({
      include: { posts: true, profile: true },
    });
    return _.omit(user, 'password');
  }

  findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        password: false,
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findById(id);
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.findById(id);
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
