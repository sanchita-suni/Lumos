<<<<<<< HEAD
// --- Configuration ---
// IMPORTANT: Replace this with your actual API key from Google AI Studio.
const API_KEY = 'AIzaSyC2e5zuFFUBZeDYaFyu9bBOle_mRj2KUrM';
const MODEL_NAME = 'gemini-1.5-pro-vision';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
=======
// src/ai/onlineDescriber.ts

import { Alert } from 'react-native';

// Replace this with your actual Gemini API endpoint
const GEMINI_API_URL = 'https://api.gemini.example.com/v1/describe';

interface GeminiResponse {
  descriptionText: string; // Adjust according to actual API response
}
>>>>>>> 6f84ced (Add Online AI module and integrate button in App.tsx)

// Function to send image to Gemini API and get a description
export async function fetchOnlineDescription(
  base64Image: string,
  langCode: string = 'en' // default to English
): Promise<string> {
<<<<<<< HEAD
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
              mime_type: 'image/jpeg', // Use image/png if needed
              data: base64Image,
            },
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(API_URL, {
=======
  try {
    const response = await fetch(GEMINI_API_URL, {
>>>>>>> 6f84ced (Add Online AI module and integrate button in App.tsx)
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer AIzaSyC2e5zuFFUBZeDYaFyu9bBOle_mRj2KUrM',
      },
      body: JSON.stringify({
        image: base64Image,
        language: langCode,
      }),
    });

    if (!response.ok) {
<<<<<<< HEAD
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
=======
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data: GeminiResponse = await response.json();

    // Extract description text
    if (!data.descriptionText) {
      throw new Error('No description received from API');
    }

    return data.descriptionText;

  } catch (error: any) {
    console.error('Error fetching online description:', error.message);
    Alert.alert('Online AI Error', error.message);
    return 'Unable to describe the scene right now.';
>>>>>>> 6f84ced (Add Online AI module and integrate button in App.tsx)
  }
}

