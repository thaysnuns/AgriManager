// components/ui/SearchFilterBar.js
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchFilterBar({
  value = '',
  onChangeText,
  placeholder = 'Pesquisar...',
  onFilterPress,
}) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={19}
        color="#7C8A82"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8B9890"
      />
      <TouchableOpacity
        style={styles.filterBtn}
        onPress={onFilterPress}
        activeOpacity={0.8}
      >
        <Ionicons name="options-outline" size={18} color="#244735" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingLeft: 14,
    paddingRight: 8,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E9E6',
    marginBottom: 14,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1E2923',
    paddingVertical: 0,
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#DCE7DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});