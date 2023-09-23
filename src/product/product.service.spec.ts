import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';


describe('ProductService', () => {
    let service: ProductService;
    let prismaService: PrismaService;

    const product: Product = {
        productId: 1,
        name: 'Product 1',
        price: 100,
        characteristcs: 'Product 1 description',
        desciption: 'Product 1 description',
        imageUrl: 'https://picsum.photos/200/300',
        orderId: null,
        saleId: null,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductService, PrismaService],
        }).compile();

        service = module.get<ProductService>(ProductService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('create', () => {
        it('should create a product', async () => {
            // Arrange
            jest.spyOn(prismaService.product, 'create').mockResolvedValue(product);

            // Act
            const result = await service.create(product);

            // Assert
            expect(result).toEqual(product);
        });

        it('should throw NotFoundException if product creation fails', async () => {
            // Arrange
            jest.spyOn(prismaService.product, 'create').mockRejectedValue(new Error());

            // Act & Assert
            await expect(service.create(product)).rejects.toThrow(NotFoundException);
        });
    });

    describe('delete', () => {
        it('should delete a product', async () => {
            // Arrange
            jest.spyOn(prismaService.product, 'delete').mockResolvedValue(product);

            // Act
            const result = await service.delete(product.productId);

            // Assert
            expect(result).toEqual(product);
        });

        it('should throw NotFoundException if product deletion fails', async () => {
            // Arrange
            jest.spyOn(prismaService.product, 'delete').mockRejectedValue(new Error());

            // Act & Assert
            await expect(service.delete(product.productId)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update a product', async () => {
            // Arrange
            jest.spyOn(prismaService.product, 'update').mockResolvedValue(product);

            // Act
            const result = await service.update(product.productId, product);

            // Assert
            expect(result).toEqual(product);
        });

        it('should throw NotFoundException if product update fails', async () => {
            // Arrange
            jest.spyOn(prismaService.product, 'update').mockRejectedValue(new Error());

            // Act & Assert
            await expect(service.update(product.productId, product)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getById', () => {
        it('should get a product by id', async () => {
            // Arrange
            jest.spyOn(prismaService.product, 'findUnique').mockResolvedValue(product);

            // Act
            const result = await service.getById(product.productId);

            // Assert
            expect(result).toEqual(product);
        });

        it('should throw NotFoundException if product retrieval fails', async () => {
            // Arrange
            jest.spyOn(prismaService.product, 'findUnique').mockRejectedValue(new Error());

            // Act & Assert
            await expect(service.getById(product.productId)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getAll', () => {
        it('should get all products', async () => {
            // Arrange
            jest.spyOn(prismaService.product, 'findMany').mockResolvedValue([product]);

            // Act
            const result = await service.getAll();

            // Assert
            expect(result).toEqual([product]);
        });

        it('should throw NotFoundException if product retrieval fails', async () => {
            // Arrange
            jest.spyOn(prismaService.product, 'findMany').mockRejectedValue(new Error());

            // Act & Assert
            await expect(service.getAll()).rejects.toThrow(NotFoundException);
        });
    });
});