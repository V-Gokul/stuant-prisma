import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}
  async create(createOrganizationDto: CreateOrganizationDto) {
    return await this.prisma.organization.create({
      data: createOrganizationDto,
    });
  }

  async findAll() {
    return await this.prisma.organization.findMany({
      include: {
        profile: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.organization.findUnique({ where: { id } });
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return await this.prisma.organization.update({
      data: updateOrganizationDto,
      where: { id },
    });
  }

  async remove(id: number) {
    await this.findById(id);
    return await this.prisma.organization.delete({ where: { id } });
  }
}
