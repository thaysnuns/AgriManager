// components/Header.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ farmName, userName }) {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.greeting}>Olá, {userName}</Text>
        <Text style={styles.farmTitle}>{farmName}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="notifications-outline" size={24} color="#064e3b" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  greeting: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  farmTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#064e3b',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
});