import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { HttpStatus, HttpException } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Product } from '@prisma/client';

describe('ProductController', () => {
    let productController: ProductController;
    let productService: ProductService;
    let prismaService: PrismaService;

    // Crie um produto para ser usado nos testes
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
            controllers: [ProductController],
            providers: [
                ProductService,
                PrismaService,
                {
                    provide: JwtService,
                    useValue: {},
                },
            ],
            imports: [PrismaModule],
        }).compile();

        productController = module.get<ProductController>(ProductController);
        productService = module.get<ProductService>(ProductService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('create', () => {
        it('should create a product', async () => {
            // Arrange
            jest.spyOn(productService, 'create').mockResolvedValue(product);

            // Act
            const result = await productController.create(product);

            // Assert
            expect(result).toEqual(product);
        });

        it('should handle create product error', async () => {
            // Arrange
            jest.spyOn(productService, 'create').mockRejectedValue(new HttpException('Product creation failed', HttpStatus.BAD_REQUEST));

            // Act & Assert
            try {
                await productController.create(product);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('Product creation failed');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
    });

    describe('delete', () => {
        it('should delete a product', async () => {
            // Arrange
            jest.spyOn(productService, 'delete').mockResolvedValue(product);

            // Act
            const result = await productController.delete(product.productId);

            // Assert
            expect(result).toEqual(product);
        });

        it('should handle delete product error', async () => {
            // Arrange
            jest.spyOn(productService, 'delete').mockRejectedValue(new HttpException('Product deletion failed', HttpStatus.BAD_REQUEST));

            // Act & Assert
            try {
                await productController.delete(product.productId);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('Product deletion failed');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
    });

    describe('update', () => {
        it('should update a product', async () => {
            // Arrange
            jest.spyOn(productService, 'update').mockResolvedValue(product);

            // Act
            const result = await productController.update(product.productId, product);

            // Assert
            expect(result).toEqual(product);
        });

        it('should handle update product error', async () => {
            // Arrange
            jest.spyOn(productService, 'update').mockRejectedValue(new HttpException('Product update failed', HttpStatus.BAD_REQUEST));

            // Act & Assert
            try {
                await productController.update(product.productId, product);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('Product update failed');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
    });

    describe('getById', () => {
        it('should get a product by id', async () => {
            // Arrange
            jest.spyOn(productService, 'getById').mockResolvedValue(product);

            // Act
            const result = await productController.getById(product.productId);

            // Assert
            expect(result).toEqual(product);
        });

        it('should handle get product by id error', async () => {
            // Arrange
            jest.spyOn(productService, 'getById').mockRejectedValue(new HttpException('Product getById failed', HttpStatus.BAD_REQUEST));

            // Act & Assert
            try {
                await productController.getById(product.productId);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toEqual('Product getById failed');
                expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            }
        });
    });
});
