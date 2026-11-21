// components/ui/DiaChip.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function DiaChip({
  dia,
  isSelected = false,
  onPress,
  style,
}) {
  if (!dia) return null;

  return (
    <TouchableOpacity
      style={[
        styles.chip,
        isSelected ? styles.chipActive : styles.chipInactive,
        style,
      ]}
      activeOpacity={0.82}
      delayPressIn={0}
      onPress={() => onPress && onPress(dia)}
    >
      <Text style={[styles.diaSemana, isSelected && styles.diaSemanaActive]}>
        {dia.diaSemana}
      </Text>
      <Text style={[styles.numeroDia, isSelected && styles.numeroDiaActive]}>
        {dia.numeroDia}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  chipInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E9E6',
  },
  chipActive: {
    backgroundColor: '#1B3B2B',
    borderColor: '#1B3B2B',
  },
  diaSemana: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#6B7871',
    marginBottom: 2,
  },
  diaSemanaActive: {
    color: '#C8D8CE',
  },
  numeroDia: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E2923',
  },
  numeroDiaActive: {
    color: '#FFFFFF',
  },
});