// components/ui/PrimaryButton.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrimaryButton({
  title = '',
  onPress,
  iconName = 'arrow-forward',
  showIcon = true,
}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {showIcon ? (
        <Ionicons name={iconName} size={18} color="#FFFFFF" style={styles.icon} />
      ) : null}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#244735',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});