import {
    Controller,
    Post,
    Delete,
    Patch,
    Body,
    Param,
    UseGuards,
    Get,
} from "@nestjs/common";
import { handleException } from '../utils/handleException';
import { AuthGuard } from '../auth/auth.guard';
import { OrderService } from "./order.service";
import { Order } from "@prisma/client";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    async create(@Body() order: Order) {
        return await handleException(this.orderService.create(order));
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await handleException(this.orderService.delete(id));
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() order: Order) {
        return await handleException(this.orderService.update(id, order));
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return await handleException(this.orderService.getById(id));
    }

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        return await handleException(this.orderService.getAll());
    }
}
