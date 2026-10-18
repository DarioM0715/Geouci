import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationsRequestDto } from './dto/create-locations-request.dto.js';
import { UpdateLocationsRequestDto } from './dto/update-locations-request.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { FindLocationsRequestQueryDto } from './dto/find-locations-request-query.dto.js';
import {
  buildOrderBy,
  buildPagination,
  toPaginatedResult,
} from '../common/helpers/pagination.helper.js';

@Injectable()
export class LocationsRequestService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLocationsRequestDto) {
    return this.prisma.locationRequest.create({ data });
  }

  async findAll(query: FindLocationsRequestQueryDto) {
    const sortable = ['id', 'name', 'request_date', 'done_at'] as const;
    const where: Prisma.LocationRequestWhereInput = {};

    if (query.name) where.name = { contains: query.name, mode: 'insensitive' };
    if (query.status) where.status = query.status;
    if (query.applicantId !== undefined) where.applicantId = query.applicantId;
    if (query.categoryId !== undefined) where.categoryId = query.categoryId;
    if (query.managerId !== undefined) where.managerId = query.managerId;
    if (query.locationId !== undefined) where.locationId = query.locationId;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
        { reason: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const orderBy = buildOrderBy(query.sort, query.order, sortable, 'id');

    const [data, total] = await this.prisma.$transaction([
      this.prisma.locationRequest.findMany({ where, orderBy, skip, take }),
      this.prisma.locationRequest.count({ where }),
    ]);

    return toPaginatedResult(data, total, page, limit);
  }

  async findOne(id: number) {
    const locationsRequest = await this.prisma.locationRequest.findUnique({ where: { id } });

    if (!locationsRequest) {
      throw new NotFoundException(`Solicitud de ubicación con id ${id} no encontrada`);
    }

    return locationsRequest;
  }

  async update(id: number, data: UpdateLocationsRequestDto) {
    await this.findOne(id);

    return this.prisma.locationRequest.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.locationRequest.delete({ where: { id } });
  }
}