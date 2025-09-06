// src/components/BigButton.tsx
import React, {useRef, useEffect} from 'react';
import {Animated, TouchableOpacity, Text, StyleSheet} from 'react-native';

type Props = {
  onPress: () => void;
  label?: string;
  disabled?: boolean;
};

export default function BigButton({onPress, label = 'Describe', disabled = false}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {toValue: 1.06, duration: 700, useNativeDriver: true}),
        Animated.timing(scale, {toValue: 1.0, duration: 700, useNativeDriver: true}),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [scale]);

  return (
    <Animated.View style={[styles.wrap, {transform: [{scale}]}]}>
      <TouchableOpacity
        accessible
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        style={[styles.button, disabled && styles.disabled]}
        activeOpacity={0.75}
        disabled={disabled}
      >
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 10,
    elevation: 6,
  },
  button: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e90ff',
  },
  disabled: {
    backgroundColor: '#9ec9ff',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
