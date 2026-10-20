import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { FindEventsQueryDto } from './dto/find-events-query.dto.js';
import {
  buildOrderBy,
  buildPagination,
  toPaginatedResult,
} from '../common/helpers/pagination.helper.js';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateEventDto) {
    return this.prisma.event.create({ data });
  }

  async findAll(query: FindEventsQueryDto) {
    const sortable = ['id', 'name', 'start_date', 'end_date'] as const;
    const where: Prisma.EventWhereInput = {};

    if (query.name) where.name = { contains: query.name, mode: 'insensitive' };
    if (query.its_official !== undefined) where.its_official = query.its_official;
    if (query.outstanding !== undefined) where.outstanding = query.outstanding;
    if (query.categoryId !== undefined) where.categoryId = query.categoryId;
    if (query.organizerId !== undefined) where.organizerId = query.organizerId;
    if (query.mapId !== undefined) where.mapId = query.mapId;
    if (query.start_date_from || query.start_date_to) {
      where.start_date = { gte: query.start_date_from, lte: query.start_date_to };
    }
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const orderBy = buildOrderBy(query.sort, query.order, sortable, 'id');

    const [data, total] = await this.prisma.$transaction([
      this.prisma.event.findMany({ where, orderBy, skip, take, include : { category: true }}),
      this.prisma.event.count({ where }),
    ]);

    return toPaginatedResult(data, total, page, limit);
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        map: true,
        category: true,
        user: true,
      }
    });

    if (!event) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }

    return event;
  }

  async update(id: number, data: UpdateEventDto) {
    await this.findOne(id);

    return this.prisma.event.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.event.delete({ where: { id } });
  }
}