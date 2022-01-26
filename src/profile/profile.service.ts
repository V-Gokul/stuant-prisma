import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService, private user: UsersService) {}
  async createProfile(createProfileDto: CreateProfileDto) {
    await this.user.findById(createProfileDto.userId);
    const newProfile = await this.prisma.profile.create({
      data: {
        Dob: createProfileDto.Dob,
        address: createProfileDto.address,
        user: {
          connect: { id: createProfileDto.userId },
        },
        organization: {
          connect: { id: createProfileDto.organizationId },
        },
      },
    });
    return newProfile;
  }
  async findAll() {
    return await this.prisma.profile.findMany();
  }

  async findById(id: number) {
    return await this.prisma.profile.findUnique({ where: { id } });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    await this.findById(id);
    return await this.prisma.profile.update({
      where: { id },
      data: updateProfileDto,
    });
  }

  async remove(id: number) {
    await this.findById(id);
    return await this.prisma.profile.delete({ where: { id } });
  }
}
