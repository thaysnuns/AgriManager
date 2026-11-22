// components/adm/AdminCampoDetalheScreen.js
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import StatCard from '../ui/StatCard';
import SectionHeader from '../ui/SectionHeader';

const FOTO = {
  uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
};

const PARCELAS_POR_CAMPO = {
  k1: [
    { id: 'VP-01', nome: 'Parcela VP-01', area: '5,8 ha', cultura: 'Touriga Nacional', estado: 'Normal', estadoCor: '#2D6A4F', iconBg: '#DCE7DF' },
    { id: 'VP-02', nome: 'Parcela VP-02', area: '6,4 ha', cultura: 'Touriga Franca', estado: 'Em curso', estadoCor: '#2B6C8F', iconBg: '#DCE8EE' },
    { id: 'VP-03', nome: 'Parcela VP-03', area: '6,2 ha', cultura: 'Touriga Nacional', estado: 'Atenção', estadoCor: '#C26D1F', iconBg: '#F6E8D8' },
  ],
  k2: [
    { id: 'AM-01', nome: 'Parcela AM-01', area: '17,1 ha', cultura: 'Amendoeira', estado: 'Offline', estadoCor: '#2B6C8F', iconBg: '#DCE8EE' },
    { id: 'AM-02', nome: 'Parcela AM-02', area: '17,1 ha', cultura: 'Amendoeira', estado: 'Normal', estadoCor: '#2D6A4F', iconBg: '#DCE7DF' },
  ],
  k3: [
    { id: 'HT-01', nome: 'Parcela HT-01', area: '3,2 ha', cultura: 'Tomate', estado: 'Atenção', estadoCor: '#C26D1F', iconBg: '#F6E8D8' },
    { id: 'HT-02', nome: 'Parcela HT-02', area: '2,6 ha', cultura: 'Alface', estado: 'Normal', estadoCor: '#2D6A4F', iconBg: '#DCE7DF' },
    { id: 'HT-03', nome: 'Parcela HT-03', area: '2,6 ha', cultura: 'Couve', estado: 'Atenção', estadoCor: '#C26D1F', iconBg: '#F6E8D8' },
  ],
};

export default function AdminCampoDetalheScreen({ campo, onBack, onSelectParcela, onAbrirMapa }) {
  const id = campo?.id || 'k1';
  const parcelas = PARCELAS_POR_CAMPO[id] || PARCELAS_POR_CAMPO.k1;
  const area = campo?.sub?.match(/\d+[,.]?\d*\s*ha/)?.[0] || '18,6 ha';

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.roundBtn} onPress={onBack} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.title}>{campo?.nome || 'Campo da rede'}</Text>
          <Text numberOfLines={1} style={styles.subtitle}>{campo?.sub || 'Detalhe administrativo do campo'}</Text>
        </View>
        <TouchableOpacity style={[styles.roundBtn, styles.white]} onPress={onAbrirMapa} activeOpacity={0.8}>
          <Ionicons name="map-outline" size={18} color="#244735" />
        </TouchableOpacity>
      </View>

      <ImageBackground source={FOTO} style={styles.photo} imageStyle={{ borderRadius: 20 }}>
        <View style={styles.mapBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.mapBadgeText}>{area} · monitorizado</Text>
        </View>
        <TouchableOpacity style={styles.locateBtn} activeOpacity={0.85}>
          <Ionicons name="locate-outline" size={20} color="#1B3B2B" />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.metricsRow}>
        <StatCard value={String(parcelas.length)} label="Parcelas" />
        <StatCard value={area} label="Área" />
        <StatCard value="95%" label="Cobertura" />
      </View>

      <SectionHeader title="Parcelas do campo" actionLabel={`${parcelas.length} parcelas`} />

      {parcelas.map((parcela) => (
        <TouchableOpacity
          key={parcela.id}
          style={styles.parcelaCard}
          onPress={() => onSelectParcela && onSelectParcela(parcela)}
          activeOpacity={0.85}
        >
          <View style={[styles.parcelaIcon, { backgroundColor: parcela.iconBg }]}>
            <MaterialCommunityIcons name="grid" size={21} color={parcela.estadoCor} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.parcelaNome}>{parcela.nome}</Text>
            <Text style={styles.parcelaDetalhe}>{parcela.area} · {parcela.cultura}</Text>
          </View>
          <View style={styles.parcelaRight}>
            <Text style={[styles.parcelaEstado, { color: parcela.estadoCor }]}>{parcela.estado}</Text>
            <Ionicons name="chevron-forward" size={18} color="#7A8680" />
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.infoCard}>
        <View style={styles.infoIcon}>
          <Ionicons name="information-circle-outline" size={20} color="#2D6A4F" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>Estado geral do campo</Text>
          <Text style={styles.infoText}>Dados recebidos da rede nas últimas 24 horas.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 16, paddingBottom: 30, backgroundColor: '#F4F6F3' },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  roundBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E8ECE7', justifyContent: 'center', alignItems: 'center' },
  white: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E9E6' },
  title: { fontSize: 22, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 12, color: '#6B7871', marginTop: 2 },
  photo: { height: 185, borderRadius: 20, overflow: 'hidden', justifyContent: 'space-between', padding: 12, marginBottom: 14 },
  mapBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.94)', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 7 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2D6A4F', marginRight: 7 },
  mapBadgeText: { fontSize: 12, fontWeight: '700', color: '#1E2923' },
  locateBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' },
  metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  parcelaCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5E9E6', padding: 14, marginBottom: 10 },
  parcelaIcon: { width: 44, height: 44, borderRadius: 13, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  parcelaNome: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  parcelaDetalhe: { fontSize: 12, color: '#6B7871', marginTop: 3 },
  parcelaRight: { alignItems: 'flex-end', gap: 4 },
  parcelaEstado: { fontSize: 11, fontWeight: '800' },
  infoCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5E9E6', padding: 14, marginTop: 4 },
  infoIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#DCE7DF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  infoTitle: { fontSize: 14, fontWeight: '800', color: '#1E2923' },
  infoText: { fontSize: 12, color: '#6B7871', marginTop: 2 },
});
