import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto.js';
import { UpdateComplaintDto } from './dto/update-complaint.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { executeBulkDelete } from '../common/helpers/bulk-delete.helper.js';

@Injectable()
export class ComplaintsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateComplaintDto) {
    return this.prisma.complaint.create({ data });
  }

  findAll() {
    return this.prisma.complaint.findMany();
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

  async removeMany(ids: number[]): Promise<void> {
    const unique = [...new Set(ids)];

    await this.prisma.$transaction(async (tx) => {
      await executeBulkDelete({
        ids: unique,
        label: 'reclamos',
        fetchExisting: () =>
          tx.complaint.findMany({ where: { id: { in: unique } }, select: { id: true } }),
        performDelete: () => tx.complaint.deleteMany({ where: { id: { in: unique } } }),
      });
    });
  }
}