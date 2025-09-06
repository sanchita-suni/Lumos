import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { Camera, useCameraDevices, CameraDevice, useFrameProcessor } from 'react-native-vision-camera';
import { runOnJS } from 'react-native-reanimated';

// Dummy detection function
const detectObject = (frame: any) => Math.random() < 0.05;

const onDetectionDetected = () => {
  Vibration.vibrate(500);
};

export default function ObjectDetector() {
  const devices = useCameraDevices();
  const device: CameraDevice | undefined = devices.find(d => d.position === 'back');
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    async function requestPermission() {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    }
    requestPermission();
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    if (detectObject(frame)) {
      runOnJS(onDetectionDetected)();
    }
  }, []);

  if (!device) return <Text>Loading Camera...</Text>;
  if (!hasPermission) return <Text>Requesting Camera Permission...</Text>;

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});


