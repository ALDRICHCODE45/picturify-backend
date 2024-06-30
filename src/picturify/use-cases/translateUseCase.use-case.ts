import OpenAI from 'openai';

interface Args {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (
  openai: OpenAI,
  { lang, prompt }: Args,
) => {
  const textToPrompt = `traduce el siguiente texto al idioma ${lang}: ${prompt}`;

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: textToPrompt,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.8,
  });
  return response.choices[0].message.content;
};
