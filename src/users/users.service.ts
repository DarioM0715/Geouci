import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, scryptSync } from 'node:crypto';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserDto) {
    const { password, ...rest } = data;

    return this.prisma.user.create({
      data: { ...rest, password_hash: this.hashPassword(password) },
      omit: { password_hash: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({ omit: { password_hash: true } });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: { password_hash: true },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    await this.findOne(id);

    const { password, ...rest } = data;
    const userData = password
      ? { ...rest, password_hash: this.hashPassword(password) }
      : rest;

    return this.prisma.user.update({
      where: { id },
      data: userData,
      omit: { password_hash: true },
    });
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