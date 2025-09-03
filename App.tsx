import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, StatusBar} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.content}>
        <Text style={styles.title}>Lumos</Text>
        <Text style={styles.subtitle}>illuminating the world, through sound.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // A light grey background
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333333', // A dark grey color
  },
  subtitle: {
    fontSize: 24,
    color: '#666666', // A medium grey color
  },
});

export default App;