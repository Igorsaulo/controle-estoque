import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);

    if (!user || !(await this.usersService.comparePasswords(password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      id: user.id,
      nome: user.name,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
