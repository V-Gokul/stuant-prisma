import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService, private user: UsersService) {}
  async create(createPostDto: CreatePostDto) {
    await this.user.findById(createPostDto.userId);
    const newPost = await this.prisma.posts.create({
      data: {
        about: createPostDto.about,
        user: {
          connect: { id: createPostDto.userId },
        },
      },
    });
    return newPost;
  }

  findAll() {
    return this.prisma.posts.findMany();
  }

  findById(id: number) {
    return this.prisma.posts.findUnique({
      where: { id },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findById(id);
    return await this.prisma.posts.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number) {
    await this.findById(id);
    return await this.prisma.posts.delete({
      where: { id },
    });
  }
}
