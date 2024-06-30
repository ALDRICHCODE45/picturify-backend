import { Injectable } from '@nestjs/common';
import { ImageGenerationDto } from './dtos/imageGeneration.dto';
import OpenAI from 'openai';
import { ImageGenerationUseCase } from './use-cases/imageGeneration.use-case';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { TranslateDto } from './dtos/translate.dto';
import { translateUseCase } from './use-cases/translateUseCase.use-case';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PicturifyService {
  private readonly openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async generateImage(imageGenerationDto: ImageGenerationDto, user: User) {
    const prismatsx = await this.prismaService.$transaction(
      async (tx) => {
        // Crear el primer mensaje
        await tx.message.create({
          data: {
            isPicturify: false,
            text: imageGenerationDto.prompt,
            userId: user.id,
          },
        });

        // Obtener la cantidad de imágenes actuales
        const currentImageQuantity = await tx.user.findUnique({
          where: {
            id: user.id,
          },
          select: {
            image_quantity: true,
          },
        });

        if (currentImageQuantity.image_quantity >= 2) {
          // Crear el mensaje de límite alcanzado
          await this.emailService.sendMotivationEmail({
            subject: 'actualizar plan',
            to: user.email,
          });
          await tx.message.create({
            data: {
              isPicturify: true,
              text: 'haz alcanzado el limite gratuito, actualiza tu suscripcion',
              userId: user.id,
            },
          });
          return {
            ok: false,
            msg: 'ha ocurrido un error, limite gratuito alcanzado',
          };
        }

        // Actualizar la cantidad de imágenes
        await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            image_quantity: currentImageQuantity.image_quantity + 1,
          },
        });

        return {
          ok: true,
        };
      },
      { timeout: 10000 },
    ); // Incrementar el tiempo de espera a 10 segundos

    if (!prismatsx.ok) {
      return {
        msg: 'ha ocurrido un error inesperado, consulta con el administrador',
        ok: false,
      };
    }

    // Generar la imagen fuera de la transacción
    const image = await ImageGenerationUseCase(this.openai, imageGenerationDto);

    // Crear el mensaje final fuera de la transacción
    await this.prismaService.message.create({
      data: {
        Image: image.url,
        isPicturify: true,
        userId: user.id,
      },
    });

    return {
      msg: 'procedimiento terminado con exito',
      url: image.url,
      ok: true,
    };
  }

  async translate(transalteDto: TranslateDto, user: User) {
    const prismatsx = await this.prismaService.$transaction(async (tx) => {
      // Crear el primer mensaje
      await tx.message.create({
        data: {
          isPicturify: false,
          text: transalteDto.prompt,
          userId: user.id,
          isTraduction: true,
        },
      });

      // Obtener la cantidad de  traducciones actuales
      const currentTranslationQuantity = await tx.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          translate_quantity: true,
        },
      });

      if (currentTranslationQuantity.translate_quantity >= 5) {
        // Crear el mensaje de límite alcanzado
        await this.emailService.sendMotivationEmail({
          subject: 'actualizar plan',
          to: user.email,
        });

        await tx.message.create({
          data: {
            isPicturify: true,
            text: 'haz alcanzado el limite gratuito, actualiza tu suscripcion',
            userId: user.id,
            isTraduction: true,
          },
        });
        return {
          ok: false,
          msg: 'ha ocurrido un error, limite gratuito alcanzado',
        };
      }

      // Actualizar la cantidad de traduccciones
      await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          translate_quantity: currentTranslationQuantity.translate_quantity + 1,
        },
      });

      return {
        ok: true,
        msg: 'procedimiento completado',
      };
    });

    if (!prismatsx.ok) {
      return {
        msg: 'ha ocurrido un error inesperado, consulta con el administrador',
        ok: false,
      };
    }

    // Generar la traduccion fuera de la transacción
    const traslate = await translateUseCase(this.openai, transalteDto);

    // Crear el mensaje final fuera de la transacción
    await this.prismaService.message.create({
      data: {
        text: traslate,
        isPicturify: true,
        userId: user.id,
        isTraduction: true,
      },
    });

    return {
      msg: 'procedimiento terminado con exito',
      ok: true,
    };
  }

  async getImagesMessages(user: User) {
    const messages = await this.prismaService.message.findMany({
      where: {
        userId: user.id,
        isTraduction: false,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return {
      messages,
    };
  }
  async getTraductionMessages(user: User) {
    const messages = await this.prismaService.message.findMany({
      where: {
        userId: user.id,
        isTraduction: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return {
      messages,
    };
  }
}
