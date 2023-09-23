import {
    Controller,
    Post,
    Delete,
    Patch,
    Body,
    Param,
    UseGuards,
    HttpException,
    HttpStatus,
    Dependencies,
    Get,
} from "@nestjs/common";
import { SaleService } from './sale.service';
import { Sale } from "@prisma/client";
import { AuthGuard } from '../auth/auth.guard';

@Controller('sale')
@Dependencies(SaleService)
export class SaleController {
    constructor(private readonly saleService: SaleService) { }

    private async handleException(promise: Promise<any>) {
        try {
            return await promise;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@Body() sale: Sale) {
        return await this.handleException(this.saleService.create(sale));
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.handleException(this.saleService.delete(id));
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() sale: Sale) {
        return this.handleException(this.saleService.update(id, sale));
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.handleException(this.saleService.getById(id));
    }
}