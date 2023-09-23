import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Customer } from '@prisma/client';

describe('CustomerService', () => {
  let service: CustomerService;
  let prismaService: PrismaService;

  const customer: Customer = {
    customerId: 1,
    name: 'John Doe',
    address: 'Rua A, 1',
    city: 'São Paulo',
    firstNumber: '147582263',
    secondNumber: '147582263',
    orderId: null,
    taskId: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService, PrismaService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a customer', async () => {
      // Arrange
      jest.spyOn(prismaService.customer, 'create').mockResolvedValue(customer);

      // Act
      const result = await service.create(customer);

      // Assert
      expect(result).toEqual(customer);
    });

    it('should throw NotFoundException if customer creation fails', async () => {
      // Arrange
      jest.spyOn(prismaService.customer, 'create').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.create(customer)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a customer', async () => {
      // Arrange
      jest.spyOn(prismaService.customer, 'delete').mockResolvedValue(customer);

      // Act
      const result = await service.delete(customer.customerId);

      // Assert
      expect(result).toEqual(customer);
    });

    it('should throw NotFoundException if customer deletion fails', async () => {
      // Arrange
      jest.spyOn(prismaService.customer, 'delete').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.delete(customer.customerId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a customer', async () => {
      // Arrange
      jest.spyOn(prismaService.customer, 'update').mockResolvedValue(customer);

      // Act
      const result = await service.update(customer.customerId, customer);

      // Assert
      expect(result).toEqual(customer);
    });

    it('should throw NotFoundException if customer update fails', async () => {
      // Arrange
      jest.spyOn(prismaService.customer, 'update').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.update(customer.customerId, customer)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getById', () => {
    it('should get a customer by id', async () => {
      // Arrange
      jest.spyOn(prismaService.customer, 'findUnique').mockResolvedValue(customer);

      // Act
      const result = await service.getById(customer.customerId);

      // Assert
      expect(result).toEqual(customer);
    });

    it('should throw NotFoundException if customer retrieval fails', async () => {
      // Arrange
      jest.spyOn(prismaService.customer, 'findUnique').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.getById(customer.customerId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAll', () => {
    it('should get all customers', async () => {
      // Arrange
      jest.spyOn(prismaService.customer, 'findMany').mockResolvedValue([customer]);

      // Act
      const result = await service.getAll();

      // Assert
      expect(result).toEqual([customer]);
    });

    it('should throw NotFoundException if customer retrieval fails', async () => {
      // Arrange
      jest.spyOn(prismaService.customer, 'findMany').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.getAll()).rejects.toThrow(NotFoundException);
    });
  });
});
