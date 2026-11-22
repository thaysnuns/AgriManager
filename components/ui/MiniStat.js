import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MiniStat({ value, label, tint = false }) {
  return (
    <View style={[styles.card, tint && styles.tintCard]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    borderRadius: 14,
    paddingVertical: 12,
  },
  tintCard: {
    backgroundColor: '#F4F7F5',
  },
  value: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E2923',
  },
  label: {
    fontSize: 11,
    color: '#6B7871',
    marginTop: 3,
  },
});
