// src/ai/testOnline.js

const GEMINI_API_URL = 'https://api.gemini.example.com/v1/describe';
const API_KEY = 'AIzaSyC2e5zuFFUBZeDYaFyu9bBOle_mRj2KUrM';

async function fetchOnlineDescription(base64Image, langCode = 'en') {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        image: base64Image,
        language: langCode,
      }),
    });

    if (!response.ok) throw new Error(`Status: ${response.status}`);

    const data = await response.json();
    return data.descriptionText || 'No description received.';
  } catch (err) {
    console.error('Error fetching online description:', err.message);
    return 'Unable to describe the scene right now.';
  }
}

// Test the function
(async () => {
  const testImage = 'data:image/jpeg;base64,...'; // small placeholder
  const result = await fetchOnlineDescription(testImage, 'en');
  console.log('Online AI result:', result);
})();



