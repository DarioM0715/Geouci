import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto.js';
import { UpdateReactionDto } from './dto/update-reaction.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { executeBulkDelete } from '../common/helpers/bulk-delete.helper.js';
import { Prisma } from '../generated/prisma/client.js';
import { FindReactionsQueryDto } from './dto/find-reactions-query.dto.js';
import {
  buildOrderBy,
  buildPagination,
  toPaginatedResult,
} from '../common/helpers/pagination.helper.js';

@Injectable()
export class ReactionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateReactionDto) {
    return this.prisma.reaction.create({ data });
  }

  async findAll(query: FindReactionsQueryDto) {
    const sortable = ['id', 'created_at'] as const;
    const where: Prisma.ReactionWhereInput = {};

    if (query.eventId !== undefined) where.eventId = query.eventId;
    if (query.userId !== undefined) where.userId = query.userId;
    if (query.type) where.type = { contains: query.type, mode: 'insensitive' };
    if (query.validated !== undefined) where.validated = query.validated;
    if (query.search) where.type = { contains: query.search, mode: 'insensitive' };

    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const orderBy = buildOrderBy(query.sort, query.order, sortable, 'id');

    const [data, total] = await this.prisma.$transaction([
      this.prisma.reaction.findMany({ where, orderBy, skip, take }),
      this.prisma.reaction.count({ where }),
    ]);

    return toPaginatedResult(data, total, page, limit);
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

  async removeMany(ids: number[]): Promise<void> {
    const unique = [...new Set(ids)];

    await this.prisma.$transaction(async (tx) => {
      await executeBulkDelete({
        ids: unique,
        label: 'reacciones',
        fetchExisting: () =>
          tx.reaction.findMany({ where: { id: { in: unique } }, select: { id: true } }),
        performDelete: () => tx.reaction.deleteMany({ where: { id: { in: unique } } }),
      });
    });
  }
}