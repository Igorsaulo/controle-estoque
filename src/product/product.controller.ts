import {
  Controller,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
  Dependencies,
  Get,
} from "@nestjs/common";
import { handleException } from '../utils/handleException';
import { ProductService } from './product.service';
import { AuthGuard } from '../auth/auth.guard';
import { Product } from "@prisma/client";


@Controller('product')
@Dependencies(ProductService)
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() product: Product) {
    return await handleException(this.productService.create(product));
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await handleException(this.productService.delete(id));
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() product: Product) {
    return await handleException(this.productService.update(id, product));
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await handleException(this.productService.getById(id));
  }

  @Get()
  async getAll() {
    return await handleException(this.productService.getAll());
  }
}