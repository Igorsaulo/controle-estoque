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
import { AuthGuard } from '../auth/auth.guard';
import { CustomerService } from "./customer.service";
import { Customer } from "@prisma/client";

@Controller('customer')
@Dependencies(CustomerService)
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    private async handleException(promise: Promise<any>) {
        try {
            return await promise;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@Body() customer: Customer) {
        return await this.handleException(this.customerService.create(customer));
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.handleException(this.customerService.delete(id));
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() customer: Customer) {
        return this.handleException(this.customerService.update(id, customer));
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.handleException(this.customerService.getById(id));
    }
}
