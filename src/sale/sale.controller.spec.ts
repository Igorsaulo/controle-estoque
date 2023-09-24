import { Test, TestingModule } from '@nestjs/testing';
import { SaleController } from './sale.controller';
import { Sale } from '@prisma/client';
import { HttpStatus, HttpException } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SaleService } from './sale.service';

describe('SaleController', () => {
  let controller: SaleController;
  let saleService: SaleService;
  let prismaService: PrismaService;

  //crie um usuário para ser usado nos testes
  const sale: Sale = {
    saleId: 1,
    date: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleController],
      providers: [
        SaleService,
        PrismaService,
        {
          provide: JwtService,
          useValue: {},
        },
      ],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<SaleController>(SaleController);
    saleService = module.get<SaleService>(SaleService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a sale', async () => {
      // Arrange
      jest.spyOn(saleService, 'create').mockResolvedValue(sale);

      // Act
      const result = await controller.create(sale);

      // Assert
      expect(result).toEqual(sale);
    });

    it('should handle create sale error', async () => {
      // Arrange
      jest.spyOn(saleService, 'create').mockRejectedValue(new HttpException('Sale creation failed', HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await controller.create(sale);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('delete', () => {
    it('should delete a sale', async () => {
      // Arrange
      jest.spyOn(saleService, 'delete').mockResolvedValue(sale);

      // Act
      const result = await controller.delete(sale.saleId);

      // Assert
      expect(result).toEqual(sale);
    });

    it('should handle delete sale error', async () => {
      // Arrange
      jest.spyOn(saleService, 'delete').mockRejectedValue(new HttpException('Sale deletion failed', HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await controller.delete(sale.saleId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('update', () => {
    it('should update a sale', async () => {
      // Arrange
      jest.spyOn(saleService, 'update').mockResolvedValue(sale);

      // Act
      const result = await controller.update(sale.saleId, sale);

      // Assert
      expect(result).toEqual(sale);
    });

    it('should handle update sale error', async () => {
      // Arrange
      jest.spyOn(saleService, 'update').mockRejectedValue(new HttpException('Sale update failed', HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await controller.update(sale.saleId, sale);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('getById', () => {
    it('should get a sale by id', async () => {
      // Arrange
      jest.spyOn(saleService, 'getById').mockResolvedValue(sale);

      // Act
      const result = await controller.getById(sale.saleId);

      // Assert
      expect(result).toEqual(sale);
    });

    it('should handle get sale by id error', async () => {
      // Arrange
      jest.spyOn(saleService, 'getById')
      .mockRejectedValue(
        new HttpException('Sale getById failed', 
        HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await controller.getById(sale.saleId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
