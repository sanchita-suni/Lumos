// --- Configuration ---
// IMPORTANT: Replace this with your actual API key from Google AI Studio.
const API_KEY = 'AIzaSyC2e5zuFFUBZeDYaFyu9bBOle_mRj2KUrM';

// ✅ Use a supported Gemini model
const MODEL_NAME = 'gemini-2.5-pro'; // or 'gemini-2.5-flash'

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

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
  // ✅ Clean the Base64 string (strip "data:*;base64," if present)
  const cleanedBase64 = base64Image.includes(',')
    ? base64Image.split(',')[1]
    : base64Image;

  // Map short codes to full names (optional — improves results)
  const languageMap: Record<string, string> = {
    en: 'English',
    hi: 'Hindi',
    kn: 'Kannada',
  };
  const language = languageMap[languageCode] || 'English';

  // The prompt we send to Gemini
  const prompt = `Describe this image in one detailed sentence in ${language}.`;

  // Request body
  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: 'image/jpeg', // change to 'image/png' if needed
              data: cleanedBase64,     // ✅ use cleaned version
            },
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    // Safely extract description
    const description =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      'No description generated.';

    return description;
  } catch (error: any) {
    console.error('Error fetching online description:', error);
    return `Error: ${error.message}`;
  }
}
