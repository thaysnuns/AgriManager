// components/ui/SectionHeader.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SectionHeader({
  title,
  actionLabel,
  onActionPress,
  rightElement,
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {rightElement ? (
        rightElement
      ) : actionLabel ? (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.75}>
          <Text style={styles.actionText}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E2923',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D6A4F',
  },
});