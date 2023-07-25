import { OPENAI_API_KEY, OPENAI_API_URL } from 'data/constants';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const useAIDescription = () => {
  const getDescription = async (breed: string) => {
    const prompt = `This is a small description of a dog breed. The breed is ${breed}. The description is:`;
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return result.data.choices[0].message?.content;
  };

  return { getDescription };
};
