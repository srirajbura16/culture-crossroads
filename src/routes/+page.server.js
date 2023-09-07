import OpenAI from 'openai';
import { SECRET_API_KEY } from '$env/static/private';

const openai = new OpenAI({
	apiKey: SECRET_API_KEY
});

console.log(`--${SECRET_API_KEY}--`);

export async function load() {
	const response = await openai.chat.completions.create({
		// model: 'gpt-3.5-turbo',
		model: 'gpt-3.5-turbo-16k',
		messages: [
			{
				role: 'system',
				content: `Generate an intriguing question related to a country -- on various topics. The answer should always equal to the coutry. Structure the response in a json object, for example:
                    {
                    "question": "Which nation is renowned for its ancient civilization that built massive pyramids along the Nile River?",
                    "country_name": "Egypt"
                    }
                    The question should reflect only one country and the country should not be revealed in the question.
                    `
			}
		],
		temperature: 1.5,
		max_tokens: 200,
		top_p: 1,
		frequency_penalty: 0.5,
		presence_penalty: 0.5
	});

	const content = response.choices[0].message.content;

	const data = JSON.parse(content);

	return data;
}
