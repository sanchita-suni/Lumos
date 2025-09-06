// App.tsx
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Button,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { initI18n } from './src/i18n/i18n';
import { ObjectDetector } from './src/components/ObjectDetector';
import { describeSmart } from './src/ai/smartSwitch';
import { fetchOnlineDescription } from './src/ai/onlineDescriber';

const AppContent = () => {
  const { t, i18n } = useTranslation();
  const safeAreaInsets = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';

  const [descriptionText, setDescriptionText] = useState('Tap to get a description.');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleDescribePress = async () => {
    console.log('Button pressed!');
    setIsProcessing(true);

    try {
      // Get simulated detections from ObjectDetector
      const simulatedDetections = ['car', 'person', 'car'];
      const smartResult = await describeSmart(simulatedDetections, currentLanguage);

      // Get online description from test image
      const testImage = 'data:image/jpeg;base64,...';
      const onlineResult = await fetchOnlineDescription(testImage, currentLanguage);

      setDescriptionText(`${smartResult}\n${onlineResult}`);
    } catch (error) {
      console.error('Error fetching description:', error);
      setDescriptionText('Sorry, something went wrong.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Camera / Object detection component */}
      <ObjectDetector />

      {/* Description */}
      <View style={styles.content}>
        <Text style={styles.description}>{descriptionText}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDescribePress}
          disabled={isProcessing}
        >
          <Text style={styles.buttonText}>
            {isProcessing ? 'Thinking...' : t('tap_to_describe')}
          </Text>
        </TouchableOpacity>

        {/* Language switching */}
        <View style={styles.languageButtons}>
          <Button
            title="English"
            onPress={() => {
              i18n.changeLanguage('en');
              setCurrentLanguage('en');
            }}
          />
          <Button
            title="Hindi"
            onPress={() => {
              i18n.changeLanguage('hi');
              setCurrentLanguage('hi');
            }}
          />
          <Button
            title="Kannada"
            onPress={() => {
              i18n.changeLanguage('kn');
              setCurrentLanguage('kn');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    initI18n().then(() => setIsI18nInitialized(true));
  }, []);

  if (!isI18nInitialized) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  description: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
});

export default App;
