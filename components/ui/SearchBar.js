// components/ui/SearchBar.js
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({
  value = '',
  onChangeText,
  placeholder = 'Pesquisar...',
  onClear,
  style,
}) {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChangeText) {
      onChangeText('');
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Ionicons
        name="search-outline"
        size={18}
        color="#6B7871"
        style={styles.searchIcon}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#84918A"
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="never"
      />

      {value.length > 0 && (
        <TouchableOpacity
          style={styles.clearBtn}
          activeOpacity={0.75}
          delayPressIn={0}
          onPress={handleClear}
        >
          <Ionicons name="close-circle" size={18} color="#84918A" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1E2923',
    paddingVertical: 0,
  },
  clearBtn: {
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});