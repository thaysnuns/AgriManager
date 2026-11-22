// components/ui/PlantacaoCard.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function resolverVisualCultura(plantacao) {
  const texto = `${plantacao?.tipo || ''} ${plantacao?.nome || ''} ${
    plantacao?.variedade || ''
  }`
    .toLowerCase()
    .trim();

  if (texto.includes('vinha') || texto.includes('touriga') || texto.includes('uva')) {
    return {
      icon: 'nutrition-outline',
      iconColor: '#2D6A4F',
      boxBg: '#E1ECE4',
      barColor: '#1B3B2B',
    };
  }

  if (texto.includes('trigo') || texto.includes('cereal') || texto.includes('milho')) {
    return {
      icon: 'flower-outline',
      iconColor: '#2D6A4F',
      boxBg: '#E1ECE4',
      barColor: '#1B3B2B',
    };
  }

  return {
    icon: 'leaf-outline',
    iconColor: '#2D6A4F',
    boxBg: '#E1ECE4',
    barColor: '#1B3B2B',
  };
}

export default function PlantacaoCard({
  plantacao,
  onPress,
  style,
}) {
  if (!plantacao) return null;

  const visual = resolverVisualCultura(plantacao);
  const nome = plantacao.nome || 'Oliveira';
  const variedade = plantacao.variedade || 'Galega · Cobrançosa';
  const fase = plantacao.fase || 'Fruto em crescimento';
  const dataInicio = plantacao.dataInicio || '03-06-2026';
  const dataFim = plantacao.dataFim || '03-12-2026';

  const areaFormatada =
    typeof plantacao.area === 'number'
      ? `${plantacao.area.toLocaleString('pt-PT', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })} ha`
      : plantacao.area || '52,4 ha';

  const progressoNum = Math.max(
    0,
    Math.min(100, Number(plantacao.progresso ?? 68))
  );

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      activeOpacity={0.86}
      delayPressIn={0}
      onPress={() => onPress && onPress(plantacao)}
    >
      {/* Topo: ícone + título/variedade à esquerda, área à direita */}
      <View style={styles.topRow}>
        <View style={styles.topLeft}>
          <View style={[styles.iconBox, { backgroundColor: visual.boxBg }]}>
            <Ionicons name={visual.icon} size={22} color={visual.iconColor} />
          </View>

          <View style={styles.titleCol}>
            <Text numberOfLines={1} style={styles.title}>
              {nome}
            </Text>
            <Text numberOfLines={1} style={styles.subtitle}>
              {variedade}
            </Text>
          </View>
        </View>

        <Text style={styles.areaText}>{areaFormatada}</Text>
      </View>

      {/* Fase atual e percentagem */}
      <View style={styles.phaseRow}>
        <Text numberOfLines={1} style={styles.phaseText}>
          {fase}
        </Text>
        <Text style={styles.percentText}>{progressoNum}%</Text>
      </View>

      {/* Datas de início e previsão */}
      <View style={styles.datesRow}>
        <Text style={styles.dateText}>{dataInicio}</Text>
        <Text style={styles.dateText}>{dataFim}</Text>
      </View>

      {/* Barra de progresso */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progressoNum}%`,
              backgroundColor: visual.barColor,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleCol: { flex: 1 },
  title: { fontSize: 16, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 12.5, color: '#6B7871', marginTop: 2 },
  areaText: { fontSize: 16, fontWeight: '800', color: '#1E2923' },
  phaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  phaseText: { fontSize: 12.5, color: '#6B7871', flex: 1, marginRight: 8 },
  percentText: { fontSize: 13.5, fontWeight: '800', color: '#2D6A4F' },
  datesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateText: { fontSize: 12, color: '#7A8680' },
  progressTrack: {
    height: 5,
    borderRadius: 999,
    backgroundColor: '#E8ECE9',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
});