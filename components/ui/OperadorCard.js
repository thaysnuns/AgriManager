// components/ui/OperadorCard.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function obterIniciais(nome = '') {
  return nome
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('');
}

export default function OperadorCard({ operador, onPress, style }) {
  if (!operador) return null;

  const iniciais = operador.iniciais || obterIniciais(operador.nome) || 'OP';
  const estadoLabel = operador.estado || (operador.ativo === false ? 'Pendente' : 'Ativo');
  const isAtivo = estadoLabel.toLowerCase() === 'ativo';

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      activeOpacity={0.85}
      delayPressIn={0}
      onPress={() => onPress && onPress(operador)}
    >
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>{iniciais}</Text>
      </View>

      <View style={styles.infoCol}>
        <Text numberOfLines={1} style={styles.name}>
          {operador.nome}
        </Text>
        <Text numberOfLines={1} style={styles.email}>
          {operador.email}
        </Text>
      </View>

      <View style={styles.statusRow}>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: isAtivo ? '#2D7A4F' : '#C26D1F' },
          ]}
        />
        <Text
          style={[
            styles.statusText,
            { color: isAtivo ? '#2D7A4F' : '#C26D1F' },
          ]}
        >
          {estadoLabel}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DCE8E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#2D6A4F',
  },
  infoCol: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E2923',
  },
  email: {
    fontSize: 12.5,
    color: '#6B7871',
    marginTop: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
});