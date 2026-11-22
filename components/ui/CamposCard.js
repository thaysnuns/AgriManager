import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function formatarArea(area) {
  if (typeof area === 'number') {
    return `${area.toFixed(1).replace('.', ',')} ha`;
  }
  if (typeof area === 'string' && area.trim().length > 0) {
    const limpa = area.trim().replace('.', ',');
    return limpa.includes('ha') ? limpa : `${limpa} ha`;
  }
  return '0,0 ha';
}

export default function CamposCard({
  campo,
  icon,
  iconBoxStyle,
  onPress,
  onEdit,
  onDelete,
  style,
}) {
  if (!campo) return null;

  const isAlerta = campo.estado === 'Atencao' || Boolean(campo.alerta);
  const tituloEstado =
    campo.estadoTitulo || (isAlerta ? 'Atenção' : 'Saudável');
  const subEstado =
    campo.detalheEstado || (isAlerta ? 'Humidade baixa' : 'NDVI 0,78');
  const parcelas = campo.parcelasCount ?? 0;

  return (
    <View style={[styles.campoCard, style]}>
      <TouchableOpacity
        style={styles.campoLeftPressable}
        activeOpacity={0.85}
        delayPressIn={0}
        onPress={() => onPress && onPress(campo)}
      >
        {icon ? (
          <View style={[styles.iconBox, iconBoxStyle]}>{icon}</View>
        ) : null}

        <View style={styles.campoInfoCol}>
          <Text numberOfLines={1} style={styles.campoTitle}>
            {campo.nome}
          </Text>
          <Text numberOfLines={1} style={styles.campoSubtitle}>
            {formatarArea(campo.area)} · {parcelas} parcelas
          </Text>
        </View>

        <View style={styles.statusCol}>
          <Text style={styles.statusTitle}>{tituloEstado}</Text>
          <Text
            style={[
              styles.statusSub,
              isAlerta ? styles.statusSubAlerta : styles.statusSubOk,
            ]}
          >
            {subEstado}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actionsCol}>
        <TouchableOpacity
          style={styles.editBtn}
          activeOpacity={0.8}
          delayPressIn={0}
          onPress={() => onEdit && onEdit(campo)}
        >
          <Ionicons name="pencil" size={14} color="#24593F" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          activeOpacity={0.8}
          delayPressIn={0}
          onPress={() => onDelete && onDelete(campo)}
        >
          <Ionicons name="trash-outline" size={14} color="#B85D19" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  campoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  campoLeftPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
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
  campoInfoCol: {
    flex: 1,
    marginRight: 8,
  },
  campoTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#1E2923',
  },
  campoSubtitle: {
    fontSize: 12,
    color: '#7A8680',
    marginTop: 2,
  },
  statusCol: {
    alignItems: 'flex-end',
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E2923',
  },
  statusSub: {
    fontSize: 11.5,
    fontWeight: '700',
    marginTop: 2,
  },
  statusSubOk: {
    color: '#2D7A4F',
  },
  statusSubAlerta: {
    color: '#B85D19',
  },
  actionsCol: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  editBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#E1ECE4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F7E7D5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});