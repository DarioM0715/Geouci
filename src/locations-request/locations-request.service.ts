import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationsRequestDto } from './dto/create-locations-request.dto.js';
import { UpdateLocationsRequestDto } from './dto/update-locations-request.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { executeBulkDelete } from '../common/helpers/bulk-delete.helper.js';

@Injectable()
export class LocationsRequestService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLocationsRequestDto) {
    return this.prisma.locationRequest.create({ data });
  }

  findAll() {
    return this.prisma.locationRequest.findMany();
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

  async removeMany(ids: number[]): Promise<void> {
    const unique = [...new Set(ids)];

    await this.prisma.$transaction(async (tx) => {
      await executeBulkDelete({
        ids: unique,
        label: 'solicitudes de ubicación',
        fetchExisting: () =>
          tx.locationRequest.findMany({ where: { id: { in: unique } }, select: { id: true } }),
        performDelete: () => tx.locationRequest.deleteMany({ where: { id: { in: unique } } }),
      });
    });
  }
}