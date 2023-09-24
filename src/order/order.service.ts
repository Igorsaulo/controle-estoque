import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }
    private async handlePrismaError<T>(promise: Promise<T>): Promise<T> {
        try {
            return await promise;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async create(data: Order): Promise<Order> {
        return this.handlePrismaError(this.prisma.order.create({ data }));
    }

    async delete(orderId: number): Promise<Order> {
        return this.handlePrismaError(
            this.prisma.order.delete({
                where: { orderId },
            })
        );
    }

    async update(orderId: number, data: Order): Promise<Order> {
        return this.handlePrismaError(
            this.prisma.order.update({
                where: { orderId },
                data,
            })
        );
    }

    async getAll(): Promise<Order[]> {
        return this.handlePrismaError(this.prisma.order.findMany());
    }

    async getById(orderId: number): Promise<Order> {
        return this.handlePrismaError(
            this.prisma.order.findUnique({
                where: { orderId },
            })
        );
    }
}
