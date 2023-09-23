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
} from "@nestjs/common";
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { User } from "@prisma/client";


@Controller('user')
@Dependencies(UserService)
export class UserController {
  constructor(private readonly userService: UserService) {}

  private async handleException(promise: Promise<any>) {
    try {
      return await promise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() user: User) {
    return await this.handleException(this.userService.create(user));
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.handleException(this.userService.delete(id));
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() user: User) {
    return this.handleException(this.userService.update(id, user));
  }
}
