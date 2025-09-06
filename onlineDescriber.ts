// src/ai/onlineDescriber.ts

import { Alert } from 'react-native';

// Replace this with your actual Gemini API endpoint
const GEMINI_API_URL = 'https://api.gemini.example.com/v1/describe';

interface GeminiResponse {
  descriptionText: string; // Adjust according to actual API response
}

// Function to send image to Gemini API and get a description
export async function fetchOnlineDescription(
  base64Image: string,
  langCode: string = 'en' // default to English
): Promise<string> {
  try {
    const response = await fetch(GEMINI_API_URL, {
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
  }
}

