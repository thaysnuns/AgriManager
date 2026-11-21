// components/ui/ParcelaCard.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function resolverVisualTipo(parcela) {
  const tipo = (parcela?.tipo || parcela?.categoria || parcela?.cultura || '')
    .toString()
    .toLowerCase();

  if (tipo.includes('vinha') || tipo.includes('touriga') || tipo.includes('uva')) {
    return {
      icon: 'nutrition-outline',
      iconColor: '#B5651D',
      boxBg: '#F6E7D7',
    };
  }
  if (tipo.includes('cereal') || tipo.includes('trigo') || tipo.includes('milho')) {
    return {
      icon: 'flower-outline',
      iconColor: '#24593F',
      boxBg: '#E1ECE4',
    };
  }
  if (tipo.includes('horta') || tipo.includes('tomate')) {
    return {
      icon: 'leaf-outline',
      iconColor: '#24593F',
      boxBg: '#E1ECE4',
    };
  }
  return {
    icon: 'leaf-outline',
    iconColor: '#24593F',
    boxBg: '#E1ECE4',
  };
}

export default function ParcelaCard({
  parcela,
  onPress,
  onQrPress,
  onEdit,
  onDelete,
  style,
}) {
  if (!parcela) return null;

  const visual = resolverVisualTipo(parcela);
  const codigo = parcela.codigo || 'ON-01';
  const campo = parcela.campo || 'Olival Norte';
  const titulo = parcela.titulo || `${codigo} · ${campo}`;
  const cultura = parcela.cultura || 'Galega vulgar';
  const areaFormatada =
    typeof parcela.area === 'number'
      ? `${parcela.area.toLocaleString('pt-PT', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })} ha`
      : parcela.area || '12,4 ha';

  const valorPrincipal = parcela.valorPrincipal || '64%';
  const legendaMetric =
    parcela.legendaMetric || (parcela.alerta ? 'Rega hoje' : 'Humidade');
  const isAlerta = Boolean(parcela.alerta) || legendaMetric === 'Rega hoje';

  return (
    <View style={[styles.card, style]}>
      <TouchableOpacity
        style={styles.mainTouchable}
        activeOpacity={0.85}
        delayPressIn={0}
        onPress={() => onPress && onPress(parcela)}
      >
        <View style={[styles.iconBox, { backgroundColor: visual.boxBg }]}>
          <Ionicons name={visual.icon} size={22} color={visual.iconColor} />
        </View>

        <View style={styles.infoCol}>
          <Text numberOfLines={1} style={styles.title}>
            {titulo}
          </Text>
          <Text numberOfLines={1} style={styles.subtitle}>
            {areaFormatada} · {cultura}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.rightCol}>
        <Text style={styles.metricValue}>{valorPrincipal}</Text>
        <Text
          style={[
            styles.metricLabel,
            isAlerta ? styles.metricLabelAlert : styles.metricLabelNormal,
          ]}
        >
          {legendaMetric}
        </Text>

        <View style={styles.actionsRow}>
          {onQrPress && (
            <TouchableOpacity
              style={styles.actionBtnGreen}
              activeOpacity={0.8}
              delayPressIn={0}
              onPress={() => onQrPress(parcela)}
            >
              <Ionicons name="qr-code-outline" size={14} color="#24593F" />
            </TouchableOpacity>
          )}

          {onEdit && (
            <TouchableOpacity
              style={styles.actionBtnGreen}
              activeOpacity={0.8}
              delayPressIn={0}
              onPress={() => onEdit(parcela)}
            >
              <Ionicons name="pencil-outline" size={14} color="#24593F" />
            </TouchableOpacity>
          )}

          {onDelete && (
            <TouchableOpacity
              style={styles.actionBtnDanger}
              activeOpacity={0.8}
              delayPressIn={0}
              onPress={() => onDelete(parcela)}
            >
              <Ionicons name="trash-outline" size={14} color="#B85D19" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  mainTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoCol: { flex: 1 },
  title: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 12, color: '#6B7871', marginTop: 3 },
  rightCol: { alignItems: 'flex-end' },
  metricValue: { fontSize: 17, fontWeight: '800', color: '#1E2923' },
  metricLabel: { fontSize: 11, fontWeight: '700', marginTop: 1 },
  metricLabelNormal: { color: '#2D6A4F' },
  metricLabelAlert: { color: '#C26D1F' },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 7,
  },
  actionBtnGreen: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#E1ECE4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnDanger: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#F7E8D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});