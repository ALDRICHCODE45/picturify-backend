import { Module } from '@nestjs/common';
import { PicturifyController } from './picturify.controller';
import { PicturifyService } from './picturify.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PicturifyController],
  providers: [PicturifyService],
  imports: [PassportModule, AuthModule, PrismaModule],
  exports: [],
})
export class PicturifyModule {}
