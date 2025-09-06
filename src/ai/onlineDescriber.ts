<<<<<<< HEAD
import { Buffer } from 'buffer';

/**
 * Fetches a description of a Base64 encoded image from the Gemini API.
 * @param {string} base64Image The Base64 string of the image to describe.
 * @param {string} languageCode The language code for the description (e.g., 'en', 'es').
 * @returns {Promise<string>} A promise that resolves to the text description or an error message.
 */
export async function fetchOnlineDescription(base64Image, languageCode) {
  const apiKey = 'AIzaSyC2e5zuFFUBZeDYaFyu9bBOle_mRj2KUrM'; // 🔑 Replace with your actual Gemini API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`;

=======
// --- Configuration ---
// IMPORTANT: Replace 'YOUR_API_KEY' with your actual API key from Google AI Studio.
const API_KEY = 'AIzaSyC2e5zuFFUBZeDYaFyu9bBOle_mRj2KUrM';
const MODEL_NAME = 'gemini-1.5-pro-vision'; // Correct model for Vision API
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}';

// --- The Main Function ---

/**
 * Fetches a description for an image from the Gemini Vision API.
 * @param base64Image The image encoded as a base64 string.
 * @param languageCode The language for the description (e.g., 'en', 'kn', 'hi').
 * @returns A promise that resolves to the generated description string.
 */
export async function fetchOnlineDescription(
  base64Image: string,
  languageCode: string,
): Promise<string> {
  // Map language codes to full language names
  const languageMap: { [key: string]: string } = {
    en: 'English',
    kn: 'Kannada',
    hi: 'Hindi',
  };
  const language = languageMap[languageCode] || 'English';
  const prompt = Describe this image in one detailed sentence in ${language}.;

  // Construct the API request body
>>>>>>> 8b86830102f1727adcd26bd30b9e6ab09f0b43ff
  const requestBody = {
    contents: [
      {
        parts: [
<<<<<<< HEAD
          {
            text: `Describe the image in ${languageCode}.`
          },
          {
            inlineData: {
              mimeType: "image/jpeg", // or "image/png"
              data: base64Image
            }
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      // Handle HTTP errors (e.g., 400 Bad Request, 500 Server Error)
      const errorText = await response.text();
      console.error('API request failed:', response.status, errorText);
      return `Error: API call failed with status ${response.status}.`;
    }

    const data = await response.json();

    // Check if the response contains valid content
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
      const description = data.candidates[0].content.parts[0].text;
      return description;
    } else {
      console.error('API response format is not as expected:', data);
      return "Error: Could not retrieve a valid description from the online AI.";
    }

  } catch (error) {
    // Handle network errors or other exceptions
    console.error('Error fetching online description:', error);
    return `Error: ${error.message}`;
=======
          { text: prompt },
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
    // Make the POST request to the Gemini Vision API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(API request failed: ${response.status} ${errorText});
    }

    // Parse response JSON
    const responseData = await response.json();

    // Extract the description text safely
    const description = responseData?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No description generated.';

    console.log('Gemini Description:', description);
    return description;
  } catch (error) {
    console.error('Error fetching online description:', error);
    return 'Unable to get online description.';
>>>>>>> 8b86830102f1727adcd26bd30b9e6ab09f0b43ff
  }
}
