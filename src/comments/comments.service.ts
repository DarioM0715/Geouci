import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCommentDto) {
    return this.prisma.comment.create({ data });
  }

  findAll() {
    return this.prisma.comment.findMany();
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`Comentario con id ${id} no encontrado`);
    }

    return comment;
  }

  async update(id: number, data: UpdateCommentDto) {
    await this.findOne(id);

    return this.prisma.comment.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.comment.delete({ where: { id } });
  }
}