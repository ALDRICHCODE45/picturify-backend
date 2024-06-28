import { InternalServerErrorException } from '@nestjs/common';
import * as sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const downloadImageAsPng = async (
  url: string,
  fullPath: boolean = false,
) => {
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new InternalServerErrorException('download error');
  }

  const buffer = Buffer.from(await resp.arrayBuffer());

  // Convierte la imagen a PNG usando sharp
  const pngBuffer = await sharp(buffer).png().ensureAlpha().toBuffer();

  // Convierte el buffer a base64
  const base64Image = pngBuffer.toString('base64');

  // Sube la imagen a Cloudinary
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        folder: 'picturify',
      },
    );
    return result.secure_url;
  } catch (error) {
    throw new InternalServerErrorException('upload error');
  }
};
