import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PicturifyService } from './picturify.service';
import { ImageGenerationDto } from './dtos/imageGeneration.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '@prisma/client';

@Controller('picturify')
export class PicturifyController {
  constructor(private readonly pictufifyService: PicturifyService) {}

  @Post('image-generation')
  @UseGuards(AuthGuard())
  async ImageGeneration(
    @Body() imageGenerationDto: ImageGenerationDto,
    @GetUser() user: User,
  ) {
    return this.pictufifyService.generateImage(imageGenerationDto, user);
  }

  @Get('get-messages')
  @UseGuards(AuthGuard())
  async getAllMessagesByUsers(@GetUser() user: User) {
    return this.pictufifyService.getMessages(user);
  }
}
