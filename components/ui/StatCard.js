// components/ui/StatCard.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StatCard({
  iconName = 'map-outline',
  iconColor = '#2D6A4F',
  iconBg = '#DCE7DF',
  value = '0',
  label = '',
  note = '',
  noteColor = '#2D6A4F',
  onPress,
}) {
  const content = (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Ionicons name={iconName} size={20} color={iconColor} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {note ? (
        <Text style={[styles.note, { color: noteColor }]}>{note}</Text>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity style={styles.touchableWrap} onPress={onPress} activeOpacity={0.85}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.touchableWrap}>{content}</View>;
}

const styles = StyleSheet.create({
  touchableWrap: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E2923',
  },
  label: {
    fontSize: 13,
    color: '#6B7871',
    marginTop: 2,
    marginBottom: 8,
  },
  note: {
    fontSize: 12,
    fontWeight: '700',
  },
});