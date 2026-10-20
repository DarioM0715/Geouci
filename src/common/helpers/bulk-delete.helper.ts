import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';

export interface BulkDeleteCheck {
  relation: string;
  getBlockedIds: (ids: number[]) => Promise<number[]>;
}

export interface BulkDeleteOptions {
  ids: number[];
  label: string;
  fetchExisting: () => Promise<Array<{ id: number }>>;
  checks?: BulkDeleteCheck[];
  performDelete: () => Promise<unknown>;
}

export async function executeBulkDelete(options: BulkDeleteOptions): Promise<void> {
  const { label, checks, performDelete } = options;
  const ids = [...new Set(options.ids)];

  const existing = await options.fetchExisting();
  const foundIds = new Set(existing.map((row) => row.id));
  const missing = ids.filter((id) => !foundIds.has(id));

  if (missing.length > 0) {
    throw new NotFoundException(
      `No se encontraron ${label} con ids: ${missing.join(', ')}`,
    );
  }

  if (checks && checks.length > 0) {
    const blockedIds = new Set<number>();
    const details: string[] = [];

    for (const check of checks) {
      const blocked = await check.getBlockedIds(ids);
      if (blocked.length > 0) {
        const unique = [...new Set(blocked)];
        unique.forEach((id) => blockedIds.add(id));
        details.push(`${check.relation}: ${unique.join(', ')}`);
      }
    }

    if (blockedIds.size > 0) {
      throw new ConflictException(
        `No se pueden eliminar ${label} con ids: ${[...blockedIds].sort((a, b) => a - b).join(', ')} — registros relacionados → ${details.join('; ')}`,
      );
    }
  }

  try {
    await performDelete();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === 'P2003' || error.code === 'P2014')
    ) {
      throw new ConflictException(
        `No se pueden eliminar ${label}: existen registros relacionados que impiden la operación`,
      );
    }
    throw error;
  }
}
