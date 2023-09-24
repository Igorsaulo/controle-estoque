import { Injectable } from '@nestjs/common';
import { handlePrismaError } from '../utils/handlePrismaError';
import { Customer } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) { }

    async create(data: Customer): Promise<Customer> {
        return await handlePrismaError(this.prisma.customer.create({ data }));
    }

    async delete(customerId: number): Promise<Customer> {
        return await handlePrismaError(
            this.prisma.customer.delete({
                where: { customerId },
            })
        );
    }

    async update(customerId: number, data: Customer): Promise<Customer> {
        return await handlePrismaError(
            this.prisma.customer.update({
                where: { customerId },
                data,
            })
        );
    }

    async getById(customerId: number): Promise<Customer> {
        return await handlePrismaError(
            this.prisma.customer.findUnique({
                where: { customerId },
            })
        );
    }

    async getAll(): Promise<Customer[]> {
        return await handlePrismaError(this.prisma.customer.findMany());
    }
}
