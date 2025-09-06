import { getLastDetections } from "./offlineDetector";
import { fetchOnlineDescription } from "./onlineDescriber";
import { i18n } from "../translations/i18n";
import NetInfo from "@react-native-community/netinfo";

/**
 * Provides a description of the scene, prioritizing an online Gemini-based description if a network connection is available.
 * If not, it falls back to a synthesized description from on-device detections.
 * @param base64Image The base64-encoded string of the image (used for the online description).
 * @returns A promise that resolves to the scene description string.
 */
export async function describeSmart(base64Image: string): Promise<string> {
  const state = await NetInfo.fetch();
  const currentLanguage = i18n.language;

  // Check if an internet connection is available
  if (state.isConnected) {
    console.log("Internet connection detected. Using online description.");
    const onlineDescription = await fetchOnlineDescription(base64Image, currentLanguage);
    
    if (onlineDescription) {
      return onlineDescription;
    }
  }

  // Fallback to offline description if no internet or online description fails
  console.log("No internet connection or online description failed. Using offline description.");
  const detections = getLastDetections();
  
  if (detections && detections.length > 0) {
    // This is a placeholder for your offline logic.
    // The plan suggests synthesizing a sentence from on-device detections.
    const detectedLabels = detections.map(d => i18n.t(d.label)).join(", ");
    return `Offline description: I see ${detectedLabels}.`;
  } else {
    return i18n.t("no_detections_found");
  }
}