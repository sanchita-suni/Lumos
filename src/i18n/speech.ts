import * as Speech from "expo-speech";
import i18n from "./i18n";

export const speakKey = (key: string, vars: Record<string, string> = {}) => {
  const text = i18n.t(key, vars) as string;
  const lang = i18n.language;
  const opts: any = {};

  if (lang === "hi") opts.language = "hi-IN";
  else if (lang === "kn") opts.language = "kn-IN";
  else opts.language = "en-US";

  Speech.stop();
  Speech.speak(text, opts);
};