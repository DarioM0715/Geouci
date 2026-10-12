import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateRoleDto) {
    return this.prisma.role.create({ data });
  }

  findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({
      where: {id}
    });

    if (!role) {
      throw new NotFoundException(`Role con id ${id} no encontrado`);
    }

    return role
  }

  async update(id: number, data: UpdateRoleDto) {
    await this.findOne(id)

    return this.prisma.role.update({ where: { id }, data});
  }

  async remove(id: number) {
    await this.findOne(id)

    return this.prisma.role.delete({ where: {id} });
  }
}
