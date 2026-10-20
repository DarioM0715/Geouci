import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { executeBulkDelete } from '../common/helpers/bulk-delete.helper.js';
import { Prisma } from '../generated/prisma/client.js';
import { FindCategoriesQueryDto } from './dto/find-categories-query.dto.js';
import {
  buildOrderBy,
  buildPagination,
  toPaginatedResult,
} from '../common/helpers/pagination.helper.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCategoryDto) {
    return this.prisma.category.create({ data });
  }

  async findAll(query: FindCategoriesQueryDto) {
    const sortable = ['id', 'name'] as const;
    const where: Prisma.CategoryWhereInput = {};

    if (query.name) where.name = { contains: query.name, mode: 'insensitive' };
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const orderBy = buildOrderBy(query.sort, query.order, sortable, 'id');

    const [data, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({ where, orderBy, skip, take }),
      this.prisma.category.count({ where }),
    ]);

    return toPaginatedResult(data, total, page, limit);
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }

    return category;
  }

  async update(id: number, data: UpdateCategoryDto) {
    await this.findOne(id);

    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.category.delete({ where: { id } });
  }

  async removeMany(ids: number[]): Promise<void> {
    const unique = [...new Set(ids)];

    await this.prisma.$transaction(async (tx) => {
      await executeBulkDelete({
        ids: unique,
        label: 'categorías',
        fetchExisting: () =>
          tx.category.findMany({ where: { id: { in: unique } }, select: { id: true } }),
        checks: [
          {
            relation: 'eventos',
            getBlockedIds: async (ids) =>
              (
                await tx.event.findMany({
                  where: { categoryId: { in: ids } },
                  select: { categoryId: true },
                })
              ).map((row) => row.categoryId),
          },
          {
            relation: 'localizaciones',
            getBlockedIds: async (ids) =>
              (
                await tx.location.findMany({
                  where: { categoryId: { in: ids } },
                  select: { categoryId: true },
                })
              ).map((row) => row.categoryId),
          },
          {
            relation: 'solicitudes',
            getBlockedIds: async (ids) =>
              (
                await tx.locationRequest.findMany({
                  where: { categoryId: { in: ids } },
                  select: { categoryId: true },
                })
              ).map((row) => row.categoryId),
          },
        ],
        performDelete: () => tx.category.deleteMany({ where: { id: { in: unique } } }),
      });
    });
  }
}