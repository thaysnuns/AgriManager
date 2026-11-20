// components/ui/BrandLogo.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BrandLogo({ size = 'md' }) {
  const isSmall = size === 'sm';
  return (
    <View style={styles.row}>
      <View style={[styles.badge, isSmall && styles.badgeSm]}>
        <MaterialCommunityIcons
          name="sprout-outline"
          size={isSmall ? 18 : 22}
          color="#FFFFFF"
        />
      </View>
      <Text style={[styles.title, isSmall && styles.titleSm]}>Terra Clara</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#244735',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeSm: {
    width: 34,
    height: 34,
    borderRadius: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
    color: '#1E2923',
  },
  titleSm: {
    fontSize: 18,
  },
});