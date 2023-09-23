import { Test, TestingModule } from '@nestjs/testing';
import { SaleService } from './sale.service';
import { Sale } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('SaleService', () => {
  let service: SaleService;
  let prismaService: PrismaService;

  const sale: Sale = {
    saleId: 1,
    date: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleService, PrismaService],
    }).compile();

    service = module.get<SaleService>(SaleService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a sale', async () => {
      // Arrange
      jest.spyOn(prismaService.sale, 'create').mockResolvedValue(sale);

      // Act
      const result = await service.create(sale);

      // Assert
      expect(result).toEqual(sale);
    });

    it('should throw NotFoundException if sale creation fails', async () => {
      // Arrange
      jest.spyOn(prismaService.sale, 'create').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.create(sale)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a sale', async () => {
      // Arrange
      jest.spyOn(prismaService.sale, 'delete').mockResolvedValue(sale);

      // Act
      const result = await service.delete(sale.saleId);

      // Assert
      expect(result).toEqual(sale);
    });

    it('should throw NotFoundException if sale deletion fails', async () => {
      // Arrange
      jest.spyOn(prismaService.sale, 'delete').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.delete(sale.saleId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a sale', async () => {
      // Arrange
      jest.spyOn(prismaService.sale, 'update').mockResolvedValue(sale);

      // Act
      const result = await service.update(sale.saleId, sale);

      // Assert
      expect(result).toEqual(sale);
    });

    it('should throw NotFoundException if sale update fails', async () => {
      // Arrange
      jest.spyOn(prismaService.sale, 'update').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.update(sale.saleId, sale)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getById', () => {
    it('should get a sale by id', async () => {
      // Arrange
      jest.spyOn(prismaService.sale, 'findUnique').mockResolvedValue(sale);

      // Act
      const result = await service.getById(sale.saleId);

      // Assert
      expect(result).toEqual(sale);
    });

    it('should throw NotFoundException if sale retrieval fails', async () => {
      // Arrange
      jest.spyOn(prismaService.sale, 'findUnique').mockRejectedValue(new Error());

      // Act & Assert
      await expect(service.getById(sale.saleId)).rejects.toThrow(NotFoundException);
    });
  });
});
