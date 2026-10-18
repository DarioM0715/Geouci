import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, scryptSync } from 'node:crypto';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { FindUsersQueryDto } from './dto/find-users-query.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
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

  private hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');

    return `${salt}:${hash}`;
  }
}