import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${API_KEY}`;

export const fetchOnlineDescription = async (base64Image: string, language: string): Promise<string> => {
    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: `Describe this product or object in detail. The description should be professional and suitable for an e-commerce product page. Use clear and concise language. Write the description in ${language}.`,
                    },
                    {
                        inline_data: {
                            mime_type: 'image/jpeg',
                            data: base64Image,
                        },
                    },
                ],
            },
        ],
    };

    try {
        const response = await axios.post(API_URL, requestBody);
        const description = response.data.candidates[0].content.parts[0].text;
        return description;
    } catch (error) {
        console.error('Error fetching description from Gemini API:', error);
        throw new Error('Failed to fetch online description.');
    }
};