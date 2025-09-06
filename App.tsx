// App.tsx

import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ObjectDetector } from './src/components/ObjectDetector';
import './i18n'; // Make sure this is here from your setup!

const App = () => {
  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      
      {/* This is your teammate's main component */}
      <ObjectDetector />

      {/* This is your test component at the bottom */}
      <View style={styles.testBox}>
        <Text style={styles.testText}>Test Translation:</Text>
        <Text style={styles.testText}>{t('welcome_message')}</Text>
        <View style={styles.buttons}>
          <Button title="English" onPress={() => i18n.changeLanguage('en')} />
          <Button title="Hindi" onPress={() => i18n.changeLanguage('hi')} />
          <Button title="Kannada" onPress={() => i18n.changeLanguage('kn')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Kept your teammate's background color
  },
  testBox: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  testText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#000', // Set text color to be visible
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default App;