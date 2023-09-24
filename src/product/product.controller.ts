import {
    Controller,
    Post,
    Delete,
    Get,
    Patch,
    Body,
    Param,
    UseGuards,
    HttpException,
    HttpStatus,
    Dependencies,
  } from "@nestjs/common";
  import { ProductService } from './product.service';
  import { AuthGuard } from '../auth/auth.guard';
  import { Product } from "@prisma/client";

  
  @Controller('product')
  @Dependencies(ProductService)
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
    private async handleException(promise: Promise<any>) {
      try {
        return await promise;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Post()
    async create(@Body() product: Product) {
      return await this.handleException(this.productService.create(product));
    }
  
    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
      return this.handleException(this.productService.delete(id));
    }
  
    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() product: Product) {
      return this.handleException(this.productService.update(id, product));
    }
  
    @Get(':id')
    async getById(@Param('id') id: number) {
      return this.handleException(this.productService.getById(id));
    }
  
    @Get()
    async getAll() {
      return this.handleException(this.productService.getAll());
    }
  }