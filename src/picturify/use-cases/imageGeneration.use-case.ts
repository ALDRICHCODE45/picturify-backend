import OpenAI from 'openai';
import { downloadImageAsPng } from '../helpers/downloadImageAsPng';

interface Props {
  prompt: string;
}

export const ImageGenerationUseCase = async (
  openai: OpenAI,
  { prompt }: Props,
) => {
  const resp = await openai.images.generate({
    prompt,
    model: 'dall-e-3',
    n: 1,
    size: '1024x1024',
    quality: 'standard',
    response_format: 'url',
  });

  //todo:guardar la imagen en fs

  const url = await downloadImageAsPng(resp.data.at(0).url);

  return {
    url,
    msg: 'imagen generada correctamente',
    ok: true,
  };
};
