import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) { }
    
    private async handlePrismaError<T>(promise: Promise<T>): Promise<T> {
        try {
        return await promise;
        } catch (error) {
        throw new NotFoundException(error.message);
        }
    }
    
    async create(data: Customer): Promise<Customer> {
        return this.handlePrismaError(this.prisma.customer.create({ data }));
    }
    
    async delete(customerId: number): Promise<Customer> {
        return this.handlePrismaError(
        this.prisma.customer.delete({
            where: { customerId },
        })
        );
    }
    
    async update(customerId: number, data: Customer): Promise<Customer> {
        return this.handlePrismaError(
        this.prisma.customer.update({
            where: { customerId },
            data,
        })
        );
    }
    
    async getById(customerId: number): Promise<Customer> {
        return this.handlePrismaError(
        this.prisma.customer.findUnique({
            where: { customerId },
        })
        );
    }
    
    async getAll(): Promise<Customer[]> {
        return this.handlePrismaError(this.prisma.customer.findMany());
    }
}
