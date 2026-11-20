// components/ui/FilterChips.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FilterChips({ items = [], activeKey, onSelect, style }) {
  return (
    <View style={[styles.row, style]}>
      {items.map((item) => {
        const ativa = activeKey === item.key;
        const isWarning = item.variant === 'warning';

        return (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.chip,
              isWarning && !ativa && styles.chipWarning,
              ativa && styles.chipActive,
            ]}
            onPress={() => onSelect && onSelect(item.key)}
            activeOpacity={0.8}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.chipText,
                isWarning && !ativa && styles.chipTextWarning,
                ativa && styles.chipTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  chipWarning: {
    backgroundColor: '#F6E8D8',
    borderColor: '#F6E8D8',
  },
  chipActive: {
    backgroundColor: '#1B3B2B',
    borderColor: '#1B3B2B',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5751',
  },
  chipTextWarning: {
    color: '#C26D1F',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
});