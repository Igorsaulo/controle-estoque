import { Injectable } from '@nestjs/common';
import { Prisma, Sale } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { handlePrismaError } from '../utils/handlePrismaError';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.SaleCreateInput): Promise<Sale> {
    return await handlePrismaError(this.prisma.sale.create({ data }));
  }

  async delete(saleId: number): Promise<Sale> {
    return await handlePrismaError(
      this.prisma.sale.delete({
        where: { saleId },
      })
    );
  }

  async update(
    saleId: number,
    data: Prisma.SaleUpdateInput
  ): Promise<Sale> {
    return await handlePrismaError(
      this.prisma.sale.update({
        where: { saleId },
        data,
      })
    );
  }

  async getById(saleId: number): Promise<Sale> {
    return await handlePrismaError(
      this.prisma.sale.findUnique({
        where: { saleId },
      })
    );
  }

  async getAll(): Promise<Sale[]> {
    return await handlePrismaError(this.prisma.sale.findMany());
  }
}