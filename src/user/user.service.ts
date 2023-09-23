import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  private async handlePrismaError<T>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: User): Promise<User> {
    data.password = await this.hashPassword(data.password);
    return this.handlePrismaError(this.prisma.user.create({ data }));
  }

  async delete(id: number): Promise<User> {
    return this.handlePrismaError(
      this.prisma.user.delete({
        where: { id },
      })
    );
  }

  async update(id: number, data: User): Promise<User> {
    return this.handlePrismaError(
      this.prisma.user.update({
        where: { id },
        data,
      })
    );
  }

  async getByEmail(email: string): Promise<User> {
    return this.handlePrismaError(
      this.prisma.user.findUnique({
        where: { email },
      })
    );
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }
}
