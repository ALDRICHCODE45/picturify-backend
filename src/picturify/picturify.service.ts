import { Injectable } from '@nestjs/common';

@Injectable()
export class PicturifyService {
  private readonly openai: string;

  async generateImage() {
    return 'imagen generada';
  }
}
