import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto.js';
import { UpdateReactionDto } from './dto/update-reaction.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ReactionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateReactionDto) {
    return this.prisma.reaction.create({ data });
  }

  findAll() {
    return this.prisma.reaction.findMany();
  }

  async findOne(id: number) {
    const reaction = await this.prisma.reaction.findUnique({ where: { id } });

    if (!reaction) {
      throw new NotFoundException(`Reacción con id ${id} no encontrada`);
    }

    return reaction;
  }

  async update(id: number, data: UpdateReactionDto) {
    await this.findOne(id);

    return this.prisma.reaction.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.reaction.delete({ where: { id } });
  }
}