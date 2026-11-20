// components/ui/AuthInput.js
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function AuthInput({
  label,
  iconName,
  iconLibrary = 'ion',
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        {iconLibrary === 'mci' ? (
          <MaterialCommunityIcons name={iconName} size={20} color="#7A8680" />
        ) : (
          <Ionicons name={iconName} size={19} color="#7A8680" />
        )}
      </View>
      <View style={styles.fieldCol}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8B9890"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E9E6',
    marginBottom: 12,
  },
  iconWrap: {
    width: 28,
    alignItems: 'center',
    marginRight: 10,
  },
  fieldCol: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#7C8A82',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  input: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E2923',
    padding: 0,
    height: 22,
  },
});