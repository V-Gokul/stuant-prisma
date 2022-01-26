import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) {}
  async createMaterial(createMaterialDto: CreateMaterialDto) {
    return await this.prisma.material.create({
      data: {
        tittle: createMaterialDto.tittle,
        description: createMaterialDto.description,
        content: createMaterialDto.content,
      },
    });
  }

  async findAll() {
    return await this.prisma.material.findMany({
      include: {
        question: {
          include: { choice: true },
        },
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.material.findUnique({ where: { id } });
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    await this.findById(id);
    return await this.prisma.material.update({
      where: { id },
      data: updateMaterialDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.material.delete({ where: { id } });
  }
}
