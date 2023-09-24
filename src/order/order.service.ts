import { Injectable } from '@nestjs/common';
import { handlePrismaError } from '../utils/handlePrismaError';

import { PrismaService } from '../prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }

    async create(data: Order): Promise<Order> {
        return await handlePrismaError(this.prisma.order.create({ data }));
    }

    async delete(orderId: number): Promise<Order> {
        return await handlePrismaError(
            this.prisma.order.delete({
                where: { orderId },
            })
        );
    }

    async update(orderId: number, data: Order): Promise<Order> {
        return await handlePrismaError(
            this.prisma.order.update({
                where: { orderId },
                data,
            })
        );
    }

    async getAll(): Promise<Order[]> {
        return await handlePrismaError(this.prisma.order.findMany());
    }

    async getById(orderId: number): Promise<Order> {
        return await handlePrismaError(
            this.prisma.order.findUnique({
                where: { orderId },
            })
        );
    }
}
