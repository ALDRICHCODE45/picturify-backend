import { Controller, Post } from '@nestjs/common';
import { PicturifyService } from './picturify.service';

@Controller('pictufify')
export class PicturifyController {
  constructor(private readonly pictufifyService: PicturifyService) {}

  @Post('image-generation')
  async ImageGeneration() {
    return this.pictufifyService.generateImage();
  }
}
