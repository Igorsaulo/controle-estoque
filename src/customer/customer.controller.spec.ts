import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { HttpStatus, HttpException } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from './customer.service';
import { Customer } from '@prisma/client';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;
  let prismaService: PrismaService;

  //crie um usuário para ser usado nos testes
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
      controllers: [CustomerController],
      providers: [
        CustomerService,
        PrismaService,
        {
          provide: JwtService,
          useValue: {},
        },
      ],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a customer', async () => {
      // Arrange
      jest.spyOn(service, 'create').mockResolvedValue(customer);

      // Act
      const result = await controller.create(customer);

      // Assert
      expect(result).toEqual(customer);
    });

    it('should handle create customer error', async () => {
      // Arrange
      jest.spyOn(service, 'create').mockRejectedValue(new HttpException('Customer creation failed', HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await controller.create(customer);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('delete', () => {
    it('should delete a customer', async () => {
      // Arrange
      jest.spyOn(service, 'delete').mockResolvedValue(customer);

      // Act
      const result = await controller.delete(customer.customerId);

      // Assert
      expect(result).toEqual(customer);
    });

    it('should handle delete customer error', async () => {
      // Arrange
      jest.spyOn(service, 'delete').mockRejectedValue(new HttpException('Customer deletion failed', HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await controller.delete(customer.customerId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('update', () => {
    it('should update a customer', async () => {
      // Arrange
      jest.spyOn(service, 'update').mockResolvedValue(customer);

      // Act
      const result = await controller.update(customer.customerId, customer);

      // Assert
      expect(result).toEqual(customer);
    });

    it('should handle update customer error', async () => {
      // Arrange
      jest.spyOn(service, 'update').mockRejectedValue(new HttpException('Customer update failed', HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await controller.update(customer.customerId, customer);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('getById', () => {
    it('should get a customer by id', async () => {
      // Arrange
      jest.spyOn(service, 'getById').mockResolvedValue(customer);

      // Act
      const result = await controller.getById(customer.customerId);

      // Assert
      expect(result).toEqual(customer);
    });

    it('should handle get customer by id error', async () => {
      // Arrange
      jest.spyOn(service, 'getById').mockRejectedValue(new HttpException('Customer getById failed', HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await controller.getById(customer.customerId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
