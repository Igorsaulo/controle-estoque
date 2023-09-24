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
import { SaleService } from './sale.service';
import { Sale } from "@prisma/client";
import { AuthGuard } from '../auth/auth.guard';


@Controller('sale')
@Dependencies(SaleService)
export class SaleController {
    constructor(private readonly saleService: SaleService) { }

    @Post()
    async create(@Body() sale: Sale) {
        return await handleException(this.saleService.create(sale));
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return  await handleException(this.saleService.delete(id));
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() sale: Sale) {
        return await handleException(this.saleService.update(id, sale));
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return await handleException(this.saleService.getById(id));
    }
}