import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMapDto } from './dto/create-map.dto.js';
import { UpdateMapDto } from './dto/update-map.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { FindMapsQueryDto } from './dto/find-maps-query.dto.js';
import {
  buildOrderBy,
  buildPagination,
  toPaginatedResult,
} from '../common/helpers/pagination.helper.js';

@Injectable()
export class MapsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateMapDto) {
    return this.prisma.map.create({ data });
  }

  async findAll(query: FindMapsQueryDto) {
    const sortable = ['id', 'name'] as const;
    const where: Prisma.MapWhereInput = {};

    if (query.name) where.name = { contains: query.name, mode: 'insensitive' };
    if (query.search) where.name = { contains: query.search, mode: 'insensitive' };

    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const orderBy = buildOrderBy(query.sort, query.order, sortable, 'id');

    const [data, total] = await this.prisma.$transaction([
      this.prisma.map.findMany({ where, orderBy, skip, take }),
      this.prisma.map.count({ where }),
    ]);

    return toPaginatedResult(data, total, page, limit);
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