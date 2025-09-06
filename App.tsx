// App.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Speech from "expo-speech";

import { startAlerts, stopAlerts, getLastDetections } from "./src/ai/offlineDetector";
import { fetchOnlineDescription } from "./src/ai/onlineDescriber";
import { describeSmart } from "./src/ai/smartSwitch";
import "./src/i18n"; // loads translations
import { useTranslation } from "react-i18next";

export default function App() {
  const { t, i18n } = useTranslation();

  const [mode, setMode] = useState<"offline" | "online">("offline");
  const [description, setDescription] = useState("");
  const [lang, setLang] = useState("en");
  const [image, setImage] = useState<string | null>(null);

  // OFFLINE MODE LOOP
  useEffect(() => {
    let interval: NodeJS.Timer;
    if (mode === "offline") {
      startAlerts();
      interval = setInterval(() => {
        const detections = getLastDetections();
        const sentence = describeSmart(detections);
        setDescription(sentence);
        if (sentence) Speech.speak(sentence, { language: lang });
      }, 2000);
    } else {
      stopAlerts();
    }
    return () => clearInterval(interval);
  }, [mode, lang]);

  // ONLINE MODE HANDLER
  async function handleOnlineDescribe() {
    if (!image) {
      setDescription(t("no_image"));
      return;
    }
    try {
      const result = await fetchOnlineDescription(image, lang);
      setDescription(result);
      Speech.speak(result, { language: lang });
    } catch (err) {
      setDescription(t("error_message"));
    }
  }

  // LANGUAGE SWITCH
  function toggleLang() {
    const nextLang = lang === "en" ? "hn" : lang === "hn" ? "kn" : "en";
    setLang(nextLang);
    i18n.changeLanguage(nextLang);
  }

  // IMAGE PICKER (for online mode)
  async function pickImage() {
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.5,
    });
    if (!result.canceled && result.assets[0].base64) {
      setImage(result.assets[0].base64);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("app_title")}</Text>

      <Text style={styles.modeText}>
        {t("current_mode")}: {mode.toUpperCase()}
      </Text>

      <Button
        title={mode === "offline" ? t("switch_to_online") : t("switch_to_offline")}
        onPress={() => setMode(mode === "offline" ? "online" : "offline")}
      />

      {mode === "online" && (
        <View style={{ marginTop: 20 }}>
          <Button title={t("take_photo")} onPress={pickImage} />
          <Button title={t("describe_online")} onPress={handleOnlineDescribe} />
          {image && (
            <Image
              source={{ uri: "data:image/jpg;base64," + image }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}
        </View>
      )}

      <Text style={styles.result}>{description}</Text>

      <Button title={t("change_language")} onPress={toggleLang} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modeText: {
    fontSize: 16,
    marginVertical: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
