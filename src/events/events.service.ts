import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { executeBulkDelete } from '../common/helpers/bulk-delete.helper.js';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateEventDto) {
    return this.prisma.event.create({ data });
  }

  findAll() {
    return this.prisma.event.findMany();
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({ where: { id } });

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

  async removeMany(ids: number[]): Promise<void> {
    const unique = [...new Set(ids)];

    await this.prisma.$transaction(async (tx) => {
      await executeBulkDelete({
        ids: unique,
        label: 'eventos',
        fetchExisting: () =>
          tx.event.findMany({ where: { id: { in: unique } }, select: { id: true } }),
        checks: [
          {
            relation: 'comentarios',
            getBlockedIds: async (ids) =>
              (
                await tx.comment.findMany({
                  where: { eventId: { in: ids } },
                  select: { eventId: true },
                })
              ).map((row) => row.eventId),
          },
          {
            relation: 'reacciones',
            getBlockedIds: async (ids) =>
              (
                await tx.reaction.findMany({
                  where: { eventId: { in: ids } },
                  select: { eventId: true },
                })
              ).map((row) => row.eventId),
          },
          {
            relation: 'reclamos',
            getBlockedIds: async (ids) =>
              (
                await tx.complaint.findMany({
                  where: { eventId: { in: ids } },
                  select: { eventId: true },
                })
              ).map((row) => row.eventId),
          },
        ],
        performDelete: () => tx.event.deleteMany({ where: { id: { in: unique } } }),
      });
    });
  }
}