import { Module } from '@nestjs/common';
import { PicturifyController } from './picturify.controller';
import { PicturifyService } from './picturify.service';

@Module({
  controllers: [PicturifyController],
  providers: [PicturifyService],
  imports: [],
  exports: [],
})
export class PicturifyModule {}
