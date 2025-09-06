import { Buffer } from 'buffer';

/**
 * Fetches a description of a Base64 encoded image from the Gemini API.
 * @param {string} base64Image The Base64 string of the image to describe.
 * @param {string} languageCode The language code for the description (e.g., 'en', 'es').
 * @returns {Promise<string>} A promise that resolves to the text description or an error message.
 */
export async function fetchOnlineDescription(base64Image, languageCode) {
  const apiKey = 'YOUR_GEMINI_API_KEY'; // 🔑 Replace with your actual Gemini API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
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
  }
}