import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;
  let prismaService: PrismaService;

  const order: Order = {
    orderId: 1,
    date: new Date(),
    deliveryDate: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        PrismaService,
        {
          provide: JwtService,
          useValue: {},
        },
      ],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a order', async () => {
      // Arrange
      jest.spyOn(service, 'create').mockResolvedValue(order);

      // Act
      const result = await controller.create(order);

      // Assert
      expect(result).toEqual(order);
    });

    it('should handle create order error', async () => {
      // Arrange
      jest.spyOn(service, 'create').mockRejectedValue(new HttpException('Order creation failed', HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await controller.create(order);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Order creation failed');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('delete', () => {
    it('should delete a order', async () => {
      // Arrange
      jest.spyOn(service, 'delete').mockResolvedValue(order);

      // Act
      const result = await controller.delete(order.orderId);

      // Assert
      expect(result).toEqual(order);
    });

    it('should handle delete order error', async () => {
      // Arrange
      jest.spyOn(service, 'delete').mockRejectedValue(new HttpException('Order deletion failed', HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await controller.delete(order.orderId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Order deletion failed');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('update', () => {
    it('should update a order', async () => {
      // Arrange
      jest.spyOn(service, 'update').mockResolvedValue(order);

      // Act
      const result = await controller.update(order.orderId, order);

      // Assert
      expect(result).toEqual(order);
    });

    it('should handle update order error', async () => {
      // Arrange
      jest.spyOn(service, 'update').mockRejectedValue(new HttpException('Order update failed', HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await controller.update(order.orderId, order);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Order update failed');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('getAll', () => {
    it('should return an array of orders', async () => {
      // Arrange
      const orders: Order[] = [order];
      jest.spyOn(service, 'getAll').mockResolvedValue(orders);

      // Act
      const result = await controller.getAll();

      // Assert
      expect(result).toEqual(orders);
    });

    it('should handle getAll orders error', async () => {
      // Arrange
      jest.spyOn(service, 'getAll').mockRejectedValue(new HttpException('Orders not found', HttpStatus.NOT_FOUND));

      // Act & Assert
      try {
        await controller.getAll();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Orders not found');
      }
    });
  });

  describe('getById', () => {
    it('should return a order', async () => {
      // Arrange
      jest.spyOn(service, 'getById').mockResolvedValue(order);

      // Act
      const result = await controller.getById(order.orderId);

      // Assert
      expect(result).toEqual(order);
    });

    it('should handle findOne order error', async () => {
      // Arrange
      jest.spyOn(service, 'getById').mockRejectedValue(new HttpException('Order not found', HttpStatus.NOT_FOUND));

      // Act & Assert
      try {
        await controller.getById(order.orderId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Order not found');
      }
    });
  });
});
