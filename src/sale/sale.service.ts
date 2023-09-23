import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Sale } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  private async handlePrismaError<T>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: Prisma.SaleCreateInput): Promise<Sale> {
    return this.handlePrismaError(this.prisma.sale.create({ data }));
  }

  async delete(saleId: number): Promise<Sale> {
    return this.handlePrismaError(
      this.prisma.sale.delete({
        where: { saleId },
      })
    );
  }

  async update(
    saleId: number,
    data: Prisma.SaleUpdateInput
  ): Promise<Sale> {
    return this.handlePrismaError(
      this.prisma.sale.update({
        where: { saleId },
        data,
      })
    );
  }

  async getById(saleId: number): Promise<Sale> {
    return this.handlePrismaError(
      this.prisma.sale.findUnique({
        where: { saleId },
      })
    );
  }

  async getAll(): Promise<Sale[]> {
    return this.handlePrismaError(this.prisma.sale.findMany());
  }
}