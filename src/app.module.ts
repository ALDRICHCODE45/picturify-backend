import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PicturifyModule } from './picturify/picturify.module';

@Module({
  imports: [AuthModule, PicturifyModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
