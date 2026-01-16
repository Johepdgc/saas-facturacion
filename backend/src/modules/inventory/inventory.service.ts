import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InventoryItem, Prisma } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(companyId: string): Promise<InventoryItem[]> {
    return this.prisma.inventoryItem.findMany({
      where: { companyId },
      orderBy: { name: 'asc' },
    });
  }

  async create(
    companyId: string,
    data: Prisma.InventoryItemCreateInput,
  ): Promise<InventoryItem> {
    return this.prisma.inventoryItem.create({
      data: {
        ...data,
        company: { connect: { id: companyId } },
      },
    });
  }

  async update(
    companyId: string,
    id: string,
    data: Partial<InventoryItem>,
  ): Promise<InventoryItem> {
    const exists = await this.prisma.inventoryItem.findUnique({
      where: { id },
    });
    if (!exists)
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);

    return this.prisma.inventoryItem.update({
      where: { id },
      data,
    });
  }

  async remove(companyId: string, id: string): Promise<InventoryItem> {
    const exists = await this.prisma.inventoryItem.findUnique({
      where: { id },
    });
    if (!exists)
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);

    return this.prisma.inventoryItem.delete({
      where: { id },
    });
  }
}
