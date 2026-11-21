import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

function formatarArea(area) {
  if (typeof area === 'number') {
    return `${String(area).replace('.', ',')} ha`;
  }
  if (typeof area === 'string' && area.trim().length > 0) {
    const limpa = area.trim().replace('.', ',');
    return limpa.includes('ha') ? limpa : `${limpa} ha`;
  }
  return '0,0 ha';
}

function renderCampoIcon(campo) {
  const tipo = campo?.tipoCultura || campo?.iconTipo || 'olival';
  const cor = campo?.iconColor || '#2A6F4E';

  switch (tipo) {
    case 'vinha':
      return <MaterialCommunityIcons name="grape" size={21} color={cor} />;
    case 'cereal':
      return <MaterialCommunityIcons name="sprout" size={21} color={cor} />;
    case 'horta':
      return <Ionicons name="leaf-outline" size={21} color={cor} />;
    case 'olival':
    default:
      return <MaterialCommunityIcons name="pine-tree" size={21} color={cor} />;
  }
}

export default function CamposCard({
  campo,
  onPress,
  onQr,
  onEdit,
  onDelete,
  style,
}) {
  if (!campo) return null;

  const tituloCard = campo.codigo
    ? `${campo.codigo} - ${campo.nome}`
    : campo.nome;

  const areaTexto = formatarArea(campo.area);
  const subtituloTexto = campo.cultura
    ? `${areaTexto} · ${campo.cultura}`
    : areaTexto;

  const metricaValor =
    campo.metricaValor !== undefined && campo.metricaValor !== null
      ? String(campo.metricaValor)
      : campo.humidade !== undefined && campo.humidade !== null
        ? `${campo.humidade}%`
        : '64%';

  const metricaLabel = campo.humidadeLabel || 'Humidade';
  const isAlerta = Boolean(campo.metricaAlerta);

  return (
    <View style={[styles.card, style]}>
      <TouchableOpacity
        style={styles.leftMainTouchable}
        activeOpacity={0.85}
        delayPressIn={0}
        onPress={() => onPress && onPress(campo)}
      >
        <View
          style={[
            styles.iconBox,
            campo.iconBg ? { backgroundColor: campo.iconBg } : null,
          ]}
        >
          {renderCampoIcon(campo)}
        </View>

        <View style={styles.infoCol}>
          <Text numberOfLines={1} style={styles.title}>
            {tituloCard}
          </Text>
          <Text numberOfLines={1} style={styles.subtitle}>
            {subtituloTexto}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.rightCol}>
        <View style={styles.metricBlock}>
          <Text style={styles.metricValue}>{metricaValor}</Text>
          <Text
            style={[
              styles.metricLabel,
              isAlerta && styles.metricLabelAlerta,
            ]}
          >
            {metricaLabel}
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionBtnGreen}
            activeOpacity={0.8}
            delayPressIn={0}
            onPress={() => onQr && onQr(campo)}
          >
            <Ionicons name="qr-code-outline" size={13} color="#24593F" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtnGreen}
            activeOpacity={0.8}
            delayPressIn={0}
            onPress={() => onEdit && onEdit(campo)}
          >
            <Ionicons name="pencil" size={12} color="#24593F" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtnAmber}
            activeOpacity={0.8}
            delayPressIn={0}
            onPress={() => onDelete && onDelete(campo)}
          >
            <Ionicons name="trash-outline" size={13} color="#B85D19" />
          </TouchableOpacity>
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
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  leftMainTouchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E1ECE4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 12,
    color: '#7A8680',
    marginTop: 2,
  },
  rightCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  metricBlock: {
    alignItems: 'flex-end',
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E2923',
    lineHeight: 18,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2D7A4F',
    marginTop: 1,
  },
  metricLabelAlerta: {
    color: '#B85D19',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionBtnGreen: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: '#E1ECE4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnAmber: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: '#F7E7D5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});