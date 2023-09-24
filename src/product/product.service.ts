import { Injectable } from '@nestjs/common';
import { handlePrismaError } from '../utils/handlePrismaError';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        return await handlePrismaError(this.prisma.product.create({ data }));
    }

    async delete(productId: number): Promise<Product> {
        return await handlePrismaError(
            this.prisma.product.delete({
                where: { productId },
            })
        );
    }

    async update(
        productId: number,
        data: Prisma.ProductUpdateInput
    ): Promise<Product> {
        return await handlePrismaError(
            this.prisma.product.update({
                where: { productId },
                data,
            })
        );
    }

    async getById(productId: number): Promise<Product> {
        return await handlePrismaError(
            this.prisma.product.findUnique({
                where: { productId },
            })
        );
    }

    async getAll(): Promise<Product[]> {
        return await handlePrismaError(this.prisma.product.findMany());
    }
}