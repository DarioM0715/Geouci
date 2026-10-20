import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto.js';
import { UpdateLocationDto } from './dto/update-location.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { executeBulkDelete } from '../common/helpers/bulk-delete.helper.js';
import { Prisma } from '../generated/prisma/client.js';
import { FindLocationsQueryDto } from './dto/find-locations-query.dto.js';
import {
  buildOrderBy,
  buildPagination,
  toPaginatedResult,
} from '../common/helpers/pagination.helper.js';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLocationDto) {
    return this.prisma.location.create({ data });
  }

  async findAll(query: FindLocationsQueryDto) {
    const sortable = ['id', 'name', 'created_at'] as const;
    const where: Prisma.LocationWhereInput = {};

    if (query.name) where.name = { contains: query.name, mode: 'insensitive' };
    if (query.description)
      where.description = { contains: query.description, mode: 'insensitive' };
    if (query.its_official !== undefined) where.its_official = query.its_official;
    if (query.categoryId !== undefined) where.categoryId = query.categoryId;
    if (query.mapId !== undefined) where.mapId = query.mapId;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const orderBy = buildOrderBy(query.sort, query.order, sortable, 'id');

    const [data, total] = await this.prisma.$transaction([
      this.prisma.location.findMany({ where, orderBy, skip, take }),
      this.prisma.location.count({ where }),
    ]);

    return toPaginatedResult(data, total, page, limit);
  }

  async findOne(id: number) {
    const location = await this.prisma.location.findUnique({ where: { id } });

    if (!location) {
      throw new NotFoundException(`Ubicación con id ${id} no encontrada`);
    }

    return location;
  }

  async update(id: number, data: UpdateLocationDto) {
    await this.findOne(id);

    return this.prisma.location.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.location.delete({ where: { id } });
  }

  async removeMany(ids: number[]): Promise<void> {
    const unique = [...new Set(ids)];

    await this.prisma.$transaction(async (tx) => {
      await executeBulkDelete({
        ids: unique,
        label: 'localizaciones',
        fetchExisting: () =>
          tx.location.findMany({ where: { id: { in: unique } }, select: { id: true } }),
        performDelete: () => tx.location.deleteMany({ where: { id: { in: unique } } }),
      });
    });
  }
}