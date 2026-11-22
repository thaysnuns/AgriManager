// components/ui/TarefaCard.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function resolverVisualTarefa(tarefa) {
  const estado = (tarefa?.estado || '').toUpperCase();
  const tipo = (tarefa?.tipo || tarefa?.titulo || '').toLowerCase();

  let badgeColor = '#6B7871';
  if (estado.includes('ALTA')) {
    badgeColor = '#C26D1F';
  } else if (estado.includes('CURSO')) {
    badgeColor = '#3A6EA5';
  } else if (estado.includes('PENDENTE')) {
    badgeColor = '#5E7469';
  }

  let icon = 'clipboard-outline';
  let iconColor = '#2D6A4F';
  let boxBg = '#E1ECE4';

  if (tipo.includes('rega') || tipo.includes('água')) {
    icon = 'water-outline';
    iconColor = '#C26D1F';
    boxBg = '#F6E8D8';
  } else if (tipo.includes('inspe') || tipo.includes('scan') || tipo.includes('fitossan')) {
    icon = 'scan-outline';
    iconColor = '#3A6EA5';
    boxBg = '#DCEAF7';
  } else if (tipo.includes('setor') || tipo.includes('verificar') || tipo.includes('manut')) {
    icon = 'construct-outline';
    iconColor = '#2D6A4F';
    boxBg = '#E1ECE4';
  } else if (tipo.includes('colheita') || tipo.includes('trator')) {
    icon = 'leaf-outline';
    iconColor = '#2D6A4F';
    boxBg = '#E1ECE4';
  } else if (tipo.includes('registo') || tipo.includes('tratament')) {
    icon = 'document-text-outline';
    iconColor = '#2D6A4F';
    boxBg = '#E1ECE4';
  }

  return {
    badgeColor,
    icon: tarefa?.icon || icon,
    iconColor: tarefa?.iconColor || iconColor,
    boxBg: tarefa?.boxBg || boxBg,
  };
}

export default function TarefaCard({ tarefa, onPress, style }) {
  if (!tarefa) return null;

  const visual = resolverVisualTarefa(tarefa);

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      activeOpacity={0.85}
      delayPressIn={0}
      onPress={() => onPress && onPress(tarefa)}
    >
      <View style={[styles.iconBox, { backgroundColor: visual.boxBg }]}>
        <Ionicons name={visual.icon} size={20} color={visual.iconColor} />
      </View>

      <View style={styles.infoCol}>
        <Text numberOfLines={1} style={styles.title}>
          {tarefa.titulo}
        </Text>
        <Text numberOfLines={1} style={styles.subtitle}>
          {tarefa.subtitulo}
        </Text>
      </View>

      {tarefa.estado && (
        <Text style={[styles.estadoText, { color: visual.badgeColor }]}>
          {tarefa.estado}
        </Text>
      )}
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
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 2,
  },
  estadoText: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});