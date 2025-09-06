// src/ai/testOnline.js

const GEMINI_API_URL = 'https://api.gemini.example.com/v1/describe';
const API_KEY = 'AIzaSyC2e5zuFFUBZeDYaFyu9bBOle_mRj2KUrM';

// Helper function to fetch image data as a Blob
async function fetchImageAsBlob(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  return response.blob();
}

// Helper function to convert a Blob to a Base64 string
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Main function to get a Base64 string from a URL
async function getImageBase64(imageUrl) {
  try {
    const imageBlob = await fetchImageAsBlob(imageUrl);
    const base64DataUrl = await blobToBase64(imageBlob);
    // Remove the "data:image/jpeg;base64," part
    return base64DataUrl.split(',')[1];
  } catch (error) {
    console.error("Error converting image to Base64:", error);
    return null;
  }
}

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

// Test the function with a real image
(async () => {
  const imageUrl = 'https://picsum.photos/300/200'; // A real image URL
  const testImage = await getImageBase64(imageUrl);

  if (testImage) {
    const result = await fetchOnlineDescription(testImage, 'en');
    console.log('Online AI result:', result);
  } else {
    console.log('Failed to get a valid image. Skipping API call.');
  }
})();



