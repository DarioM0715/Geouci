import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto.js';
import { UpdateComplaintDto } from './dto/update-complaint.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { FindComplaintsQueryDto } from './dto/find-complaints-query.dto.js';
import {
  buildOrderBy,
  buildPagination,
  toPaginatedResult,
} from '../common/helpers/pagination.helper.js';

@Injectable()
export class ComplaintsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateComplaintDto) {
    return this.prisma.complaint.create({ data });
  }

  async findAll(query: FindComplaintsQueryDto) {
    const sortable = ['id', 'created_at'] as const;
    const where: Prisma.ComplaintWhereInput = {};

    if (query.eventId !== undefined) where.eventId = query.eventId;
    if (query.userId !== undefined) where.userId = query.userId;
    if (query.search)
      where.reason = { contains: query.search, mode: 'insensitive' };

    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const orderBy = buildOrderBy(query.sort, query.order, sortable, 'id');

    const [data, total] = await this.prisma.$transaction([
      this.prisma.complaint.findMany({ where, orderBy, skip, take }),
      this.prisma.complaint.count({ where }),
    ]);

    return toPaginatedResult(data, total, page, limit);
  }

  async findOne(id: number) {
    const complaint = await this.prisma.complaint.findUnique({ where: { id } });

    if (!complaint) {
      throw new NotFoundException(`Reclamo con id ${id} no encontrado`);
    }

    return complaint;
  }

  async update(id: number, data: UpdateComplaintDto) {
    await this.findOne(id);

    return this.prisma.complaint.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.complaint.delete({ where: { id } });
  }
}