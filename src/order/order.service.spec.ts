import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';

describe('OrderService', () => {
  let service: OrderService;
  let prismaService: PrismaService;

  const order : Order = {
    orderId: 1,
    date: new Date(),
    deliveryDate: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, PrismaService],
    }).compile();

    service = module.get<OrderService>(OrderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a order', async () => {
      // Arrange
      jest.spyOn(prismaService.order, 'create').mockResolvedValue(order);

      // Act
      const result = await service.create(order);

      // Assert
      expect(result).toEqual(order);
    });

    it('should throw NotFoundException if order creation fails', async () => {
      // Arrange
      jest.spyOn(prismaService.order, 'create').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.create(order)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a order', async () => {
      // Arrange
      jest.spyOn(prismaService.order, 'delete').mockResolvedValue(order);

      // Act
      const result = await service.delete(order.orderId);

      // Assert
      expect(result).toEqual(order);
    });

    it('should throw NotFoundException if order deletion fails', async () => {
      // Arrange
      jest.spyOn(prismaService.order, 'delete').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.delete(order.orderId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a order', async () => {
      // Arrange
      jest.spyOn(prismaService.order, 'update').mockResolvedValue(order);

      // Act
      const result = await service.update(order.orderId, order);

      // Assert
      expect(result).toEqual(order);
    });

    it('should throw NotFoundException if order update fails', async () => {
      // Arrange
      jest.spyOn(prismaService.order, 'update').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.update(order.orderId, order)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAll', () => {
    it('should return an array of orders', async () => {
      // Arrange
      jest.spyOn(prismaService.order, 'findMany').mockResolvedValue([order]);

      // Act
      const result = await service.getAll();

      // Assert
      expect(result).toEqual([order]);
    });

    it('should throw NotFoundException if no order is found', async () => {
      // Arrange
      jest.spyOn(prismaService.customer, 'findMany').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.getAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('getById', () => {
    it('should return a order', async () => {
      // Arrange
      jest.spyOn(prismaService.order, 'findUnique').mockResolvedValue(order);

      // Act
      const result = await service.getById(order.orderId);

      // Assert
      expect(result).toEqual(order);
    });

    it('should throw NotFoundException if no order is found', async () => {
      // Arrange
      jest.spyOn(prismaService.customer, 'findUnique').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.getById(order.orderId)).rejects.toThrow(NotFoundException);
    });
  });
});
