import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, scryptSync } from 'node:crypto';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { FindUsersQueryDto } from './dto/find-users-query.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { executeBulkDelete } from '../common/helpers/bulk-delete.helper.js';
import { Prisma } from '../generated/prisma/client.js';
import { buildOrderBy, buildPagination, toPaginatedResult} from '../common/helpers/pagination.helper.js';

const USER_SORTABLE = [ 'id', 'name', 'email', 'lapel', 'role', 'created_at'] as const;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async findAll(query: FindUsersQueryDto) {
    const where: Prisma.UserWhereInput = {};

    if (query.name) where.name = { contains: query.name, mode: 'insensitive' };
    if (query.email) where.email = { contains: query.email, mode: 'insensitive' };
    if (query.lapel) where.lapel = { contains: query.lapel, mode: 'insensitive' };
    if (query.role) where.role = query.role;
    if (query.ist_resident !== undefined) where.ist_resident = query.ist_resident;
    if (query.suspended !== undefined) where.suspended = query.suspended;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { lapel: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const { page, limit, skip, take } = buildPagination(query.page, query.limit);
    const orderBy = buildOrderBy(query.sort, query.order, USER_SORTABLE, 'id');

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({ where, orderBy, skip, take }),
      this.prisma.user.count({ where }),
    ]);

    return toPaginatedResult(data, total, page, limit);
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    await this.findOne(id);

    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.user.delete({ where: { id } });
  }

  async removeMany(ids: number[]): Promise<void> {
    const unique = [...new Set(ids)];

    await this.prisma.$transaction(async (tx) => {
      await executeBulkDelete({
        ids: unique,
        label: 'usuarios',
        fetchExisting: () =>
          tx.user.findMany({ where: { id: { in: unique } }, select: { id: true } }),
        checks: [
          {
            relation: 'eventos',
            getBlockedIds: async (ids) =>
              (
                await tx.event.findMany({
                  where: { organizerId: { in: ids } },
                  select: { organizerId: true },
                })
              ).map((row) => row.organizerId),
          },
          {
            relation: 'comentarios',
            getBlockedIds: async (ids) =>
              (
                await tx.comment.findMany({
                  where: { userId: { in: ids } },
                  select: { userId: true },
                })
              ).map((row) => row.userId),
          },
          {
            relation: 'reacciones',
            getBlockedIds: async (ids) =>
              (
                await tx.reaction.findMany({
                  where: { userId: { in: ids } },
                  select: { userId: true },
                })
              ).map((row) => row.userId),
          },
          {
            relation: 'reclamos',
            getBlockedIds: async (ids) =>
              (
                await tx.complaint.findMany({
                  where: { userId: { in: ids } },
                  select: { userId: true },
                })
              ).map((row) => row.userId),
          },
          {
            relation: 'solicitudes (solicitante)',
            getBlockedIds: async (ids) =>
              (
                await tx.locationRequest.findMany({
                  where: { applicantId: { in: ids } },
                  select: { applicantId: true },
                })
              ).map((row) => row.applicantId),
          },
        ],
        performDelete: () => tx.user.deleteMany({ where: { id: { in: unique } } }),
      });
    });
  }

  private hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');

    return `${salt}:${hash}`;
  }
}