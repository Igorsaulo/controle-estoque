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
import { AuthGuard } from '../auth/auth.guard';
import { OrderService } from "./order.service";
import { Order } from "@prisma/client";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    private async handleException(promise: Promise<any>) {
        try {
            return await promise;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@Body() order: Order) {
        return await this.handleException(this.orderService.create(order));
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.handleException(this.orderService.delete(id));
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() order: Order) {
        return this.handleException(this.orderService.update(id, order));
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.handleException(this.orderService.getById(id));
    }

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        return this.handleException(this.orderService.getAll());
    }
}
