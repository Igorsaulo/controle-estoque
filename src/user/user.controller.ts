import {
  Controller,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
  Dependencies,
} from "@nestjs/common";
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { User } from "@prisma/client";
import { handleException } from '../utils/handleException';


@Controller('user')
@Dependencies(UserService)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User) {
    return await handleException(this.userService.create(user));
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await handleException(this.userService.delete(id));
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() user: User) {
    return await handleException(this.userService.update(id, user));
  }
}
