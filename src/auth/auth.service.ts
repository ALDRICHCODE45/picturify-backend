import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto, RegisterUserDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './interfaces/jwtPayload.interface';
import { EmailService } from 'src/email/email.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        email: true,
        password: true,
        username: true,
        id: true,
      },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('user does not exists');
    }

    const { id, ...userToReturn } = user;

    return {
      ok: true,
      user: userToReturn,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async register(user: RegisterUserDto) {
    const { password, ...userData } = user;
    try {
      const newUser = await this.prismaService.user.create({
        data: { ...userData, password: bcrypt.hashSync(password, 10) },
      });
      const { password: pass, id, subscription, isActive, ...user } = newUser;

      await this.emailService.sendPromoEmail({
        to: newUser.email,
        subject: 'Picturify Welcome',
      });

      return {
        ok: true,
        msg: 'user created',
        user,
        token: this.getJwtToken({ id: newUser.id }),
      };
    } catch (e) {
      /* handle error */
      this.handleErrror(e);
    }
  }

  private getJwtToken(payload: jwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async renewToken(user: User) {
    const jwt = this.getJwtToken({ id: user.id });
    return {
      ok: true,
      jwt,
    };
  }

  private handleErrror(e: any) {
    if (e.code === 'P2002') throw new BadRequestException('usuario existente');
    this.logger.error(e);
    throw new InternalServerErrorException('Unexpected error');
  }
}
