import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMapDto } from './dto/create-map.dto.js';
import { UpdateMapDto } from './dto/update-map.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MapsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateMapDto) {
    return this.prisma.map.create({ data });
  }

  findAll() {
    return this.prisma.map.findMany();
  }

  async findOne(id: number) {
    const map = await this.prisma.map.findUnique({ where: { id } });

    if (!map) {
      throw new NotFoundException(`Mapa con id ${id} no encontrado`);
    }

    return map;
  }

  async update(id: number, data: UpdateMapDto) {
    await this.findOne(id);

    return this.prisma.map.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.map.delete({ where: { id } });
  }
}