import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from '@prisma/client';
import { HttpStatus, HttpException } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let prismaService: PrismaService;

  //crie um usuário para ser usado nos testes
  const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        PrismaService,
        {
          provide: JwtService,
          useValue: {},
        },
      ],
      imports: [PrismaModule],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      // Arrange
      jest.spyOn(userService, 'create').mockResolvedValue(user);

      // Act
      const result = await userController.create(user);

      // Assert
      expect(result).toEqual(user);
    });

    it('should handle create user error', async () => {
      // Arrange
      jest.spyOn(userService, 'create').mockRejectedValue(new HttpException('User creation failed', HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await userController.create(user);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('User creation failed');
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      // Arrange
      jest.spyOn(userService, 'delete').mockResolvedValue(user);

      // Act
      const result = await userController.delete(user.id);

      // Assert
      expect(result).toEqual(user);
    });

    it('should handle delete user error', async () => {
      // Arrange
      const userId = 1;

      jest.spyOn(userService, 'delete').mockRejectedValue(new HttpException('User deletion failed', HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await userController.delete(userId);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('User deletion failed');
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      // Arrange
      jest.spyOn(userService, 'update').mockResolvedValue(user);

      // Act
      const result = await userController.update(user.id, user);

      // Assert
      expect(result).toEqual(user);
    });

    it('should handle update user error', async () => {
      // Arrange
      const userId = 1;

      jest.spyOn(userService, 'update').mockRejectedValue(new HttpException('User update failed', HttpStatus.BAD_REQUEST));

      // Act & Assert
      try {
        await userController.update(userId, user);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('User update failed');
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });
});
