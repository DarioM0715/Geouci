import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto.js';
import { UpdateLocationDto } from './dto/update-location.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { executeBulkDelete } from '../common/helpers/bulk-delete.helper.js';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLocationDto) {
    return this.prisma.location.create({ data });
  }

  findAll() {
    return this.prisma.location.findMany();
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