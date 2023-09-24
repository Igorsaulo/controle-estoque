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
import { AuthGuard } from '../auth/auth.guard';
import { CustomerService } from "./customer.service";
import { Customer } from "@prisma/client";

@Controller('customer')
@Dependencies(CustomerService)
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post()
    async create(@Body() customer: Customer) {
        return await handleException(this.customerService.create(customer));
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await handleException(this.customerService.delete(id));
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() customer: Customer) {
        return await handleException(this.customerService.update(id, customer));
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return await handleException(this.customerService.getById(id));
    }
}
