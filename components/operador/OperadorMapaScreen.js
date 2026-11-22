// components/operador/OperadorMapaScreen.js
import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FOTO_CAMPO = {
  uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
};

export const PARCELAS_CAMPO = [
  {
    id: 'VP-01', nome: 'Parcela VP-01', cultura: 'Touriga Nacional',
    detalhe: 'Vinha · 5,8 ha', estado: 'Normal', cor: '#2D6A4F', bg: '#E3ECE6',
    distancia: 'Está a 120 m da entrada', humidade: '58%', solo: '21°', ndvi: '0,74',
  },
  {
    id: 'VP-02', nome: 'Parcela VP-02', cultura: 'Touriga Franca',
    detalhe: 'Vinha · 4,4 ha', estado: 'Em curso', cor: '#2B6C8F', bg: '#DCE8EE',
    distancia: 'Está a 150 m da entrada', humidade: '52%', solo: '22°', ndvi: '0,71',
  },
  {
    id: 'VP-03', nome: 'Parcela VP-03', cultura: 'Touriga Nacional',
    detalhe: 'Vinha · 6,2 ha · Fase: pintor', estado: 'Atenção', cor: '#C26D1F', bg: '#F6E8D8',
    distancia: 'Está a 180 m da entrada', humidade: '38%', solo: '23°', ndvi: '0,68',
  },
  {
    id: 'VP-04', nome: 'Parcela VP-04', cultura: 'Aragonês',
    detalhe: 'Vinha · 3,8 ha', estado: 'Normal', cor: '#2D6A4F', bg: '#E3ECE6',
    distancia: 'Está a 220 m da entrada', humidade: '61%', solo: '20°', ndvi: '0,77',
  },
];

export default function OperadorMapaScreen({ onSelectParcela }) {
  const [filtro, setFiltro] = useState('Todas');

  const parcelasVisiveis = filtro === 'Todas'
    ? PARCELAS_CAMPO
    : PARCELAS_CAMPO.filter((parcela) => parcela.estado === filtro);

  const filtros = ['Todas', 'Em curso', 'Atenção'];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Mapa do campo</Text>
          <Text style={styles.subtitle}>Vinha do Poente · 4 parcelas</Text>
        </View>
        <View style={styles.campoBadge}>
          <Ionicons name="leaf-outline" size={16} color="#244735" />
        </View>
      </View>

      <View style={styles.mapWrapper}>
        <ImageBackground source={FOTO_CAMPO} style={styles.mapImage} imageStyle={styles.mapRadius}>
          <View style={styles.mapBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.mapBadgeText}>4 parcelas disponíveis</Text>
          </View>

          <TouchableOpacity style={styles.locateBtn} activeOpacity={0.85}>
            <Ionicons name="locate-outline" size={20} color="#1B3B2B" />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={styles.filtersRow}>
        {filtros.map((item) => {
          const ativo = filtro === item;
          return (
            <TouchableOpacity
              key={item}
              style={[styles.filterPill, ativo && styles.filterPillActive]}
              onPress={() => setFiltro(item)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, ativo && styles.filterTextActive]}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Parcelas do campo</Text>

      {parcelasVisiveis.map((parcela) => (
        <TouchableOpacity
          key={parcela.id}
          style={styles.parcelaCard}
          onPress={() => onSelectParcela && onSelectParcela(parcela)}
          activeOpacity={0.85}
        >
          <View style={[styles.parcelaIcon, { backgroundColor: parcela.bg }]}>
            <Ionicons name="grid-outline" size={21} color={parcela.cor} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.parcelaNome}>{parcela.nome}</Text>
            <Text style={styles.parcelaDetalhe}>{parcela.detalhe}</Text>
          </View>
          <View style={styles.parcelaRight}>
            <Text style={[styles.estadoText, { color: parcela.cor }]}>{parcela.estado}</Text>
            <Ionicons name="chevron-forward" size={18} color="#7A8680" />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 16, paddingBottom: 30, backgroundColor: '#F4F6F3' },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 13, color: '#6B7871', marginTop: 2 },
  campoBadge: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#DCE7DF', justifyContent: 'center', alignItems: 'center' },
  mapWrapper: { borderRadius: 20, overflow: 'hidden', marginBottom: 14 },
  mapImage: { height: 220, width: '100%', padding: 12, justifyContent: 'space-between' },
  mapRadius: { borderRadius: 20 },
  mapBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.94)', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 7 },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2D6A4F', marginRight: 7 },
  mapBadgeText: { fontSize: 12, fontWeight: '700', color: '#1E2923' },
  mapPlots: { position: 'absolute', left: 30, right: 30, top: 70, bottom: 55, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignContent: 'space-around' },
  plotMarker: { width: 72, height: 40, borderRadius: 10, backgroundColor: 'rgba(27,59,43,0.82)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.75)' },
  plotLeft: { transform: [{ rotate: '-4deg' }] },
  plotRight: { transform: [{ rotate: '4deg' }] },
  plotCode: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  locateBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' },
  filtersRow: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  filterPill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E9E6' },
  filterPillActive: { backgroundColor: '#1B3B2B', borderColor: '#1B3B2B' },
  filterText: { fontSize: 12, fontWeight: '700', color: '#4B5751' },
  filterTextActive: { color: '#FFFFFF' },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1E2923', marginBottom: 10 },
  parcelaCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5E9E6', padding: 14, marginBottom: 10 },
  parcelaIcon: { width: 44, height: 44, borderRadius: 13, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  parcelaNome: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  parcelaDetalhe: { fontSize: 12, color: '#6B7871', marginTop: 3 },
  parcelaRight: { alignItems: 'flex-end', gap: 4 },
  estadoText: { fontSize: 11, fontWeight: '800' },
});
