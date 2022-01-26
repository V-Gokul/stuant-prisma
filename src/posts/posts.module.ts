import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, UsersService, PrismaService],
})
export class PostsModule {}
