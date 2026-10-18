import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { FindCommentsQueryDto } from './dto/find-comments-query.dto.js';
import {
  buildOrderBy,
  buildPagination,
  toPaginatedResult,
} from '../common/helpers/pagination.helper.js';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCommentDto) {
    return this.prisma.comment.create({ data });
  }

  async findAll(query: FindCommentsQueryDto) {
    const sortable = ['id', 'created_at', 'edited_at'] as const;
    const where: Prisma.CommentWhereInput = {};

    if (query.eventId !== undefined) where.eventId = query.eventId;
    if (query.userId !== undefined) where.userId = query.userId;
    if (query.search) where.text = { contains: query.search, mode: 'insensitive' };

    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const orderBy = buildOrderBy(query.sort, query.order, sortable, 'id');

    const [data, total] = await this.prisma.$transaction([
      this.prisma.comment.findMany({ where, orderBy, skip, take }),
      this.prisma.comment.count({ where }),
    ]);

    return toPaginatedResult(data, total, page, limit);
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