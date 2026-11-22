// components/OperadorParcelaScreen.js — "Parcela VP-03" vista do operador (aba Mapa)
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MiniStat from '../ui/MiniStat';
import PrimaryButton from '../ui/PrimaryButton';

const FOTO = {
  uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
};

const EXEMPLO = {
  nome: 'Parcela VP-03',
  distancia: 'Está a 180 m da entrada',
  cultura: 'Touriga Nacional',
  detalhe: 'Vinha · 6,2 ha · Fase: pintor',
  estado: 'ATENÇÃO',
  humidade: '38%',
  solo: '23°',
  ndvi: '0,68',
  tarefa: {
    id: '#4821',
    titulo: 'Inspeção fitossanitária',
    descricao: 'Verificar folhas em 5 pontos de amostragem. Registar fotografia e incidência estimada.',
    prazo: 'Até às 12:30',
    pontosFeitos: 3,
    pontosTotal: 5,
  },
};

export default function OperadorParcelaScreen({
  parcela = EXEMPLO,
  onBack,
  onNavegar,
  onLerQR,
  onContactar,
  onContinuar,
  onMais,
}) {
  const p = { ...EXEMPLO, ...(parcela || {}) };
  const t = parcela?.tarefa || EXEMPLO.tarefa;

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.roundBtn} onPress={onBack} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{p.nome}</Text>
          <Text style={styles.subtitle}>Atribuída à sua equipa</Text>
        </View>
        <TouchableOpacity style={[styles.roundBtn, styles.white]} onPress={onMais} activeOpacity={0.8}>
          <Ionicons name="ellipsis-horizontal" size={18} color="#1E2923" />
        </TouchableOpacity>
      </View>

      <ImageBackground source={FOTO} style={styles.photo} imageStyle={{ borderRadius: 20 }}>
        <View style={styles.distPill}>
          <View style={styles.greenDot} />
          <Text style={styles.distText}>{p.distancia}</Text>
        </View>
        <TouchableOpacity style={styles.locateBtn} activeOpacity={0.85}>
          <Ionicons name="locate-outline" size={20} color="#1B3B2B" />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionDark} onPress={onNavegar} activeOpacity={0.85}>
          <Ionicons name="navigate-outline" size={18} color="#FFFFFF" />
          <Text style={styles.actionDarkText}>Navegar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionLight} onPress={onLerQR} activeOpacity={0.85}>
          <Ionicons name="scan-outline" size={18} color="#1E2923" />
          <Text style={styles.actionLightText}>Ler QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionLight} onPress={onContactar} activeOpacity={0.85}>
          <Ionicons name="call-outline" size={18} color="#1E2923" />
          <Text style={styles.actionLightText}>Contactar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.culturaCard}>
        <View style={styles.culturaTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.culturaNome}>{p.cultura}</Text>
            <Text style={styles.culturaDetalhe}>{p.detalhe}</Text>
          </View>
          <View style={styles.estadoBadge}>
            <Text style={styles.estadoText}>{p.estado}</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <MiniStat tint value={p.humidade} label="Humidade" />
          <MiniStat tint value={p.solo} label="Solo" />
          <MiniStat tint value={p.ndvi} label="NDVI" />
        </View>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Tarefa atribuída</Text>
        <Text style={styles.sectionId}>ID {t.id}</Text>
      </View>

      <View style={styles.tarefaCard}>
        <Text style={styles.tarefaTitulo}>{t.titulo}</Text>
        <Text style={styles.tarefaDesc}>{t.descricao}</Text>
        <View style={styles.tarefaMeta}>
          <Text style={styles.prazo}>{t.prazo}</Text>
          <Text style={styles.pontos}>
            {t.pontosFeitos}/{t.pontosTotal} pontos
          </Text>
        </View>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${(t.pontosFeitos / t.pontosTotal) * 100}%` }]} />
        </View>
      </View>

      <PrimaryButton title="Continuar inspeção" iconName="play-outline" onPress={() => onContinuar && onContinuar(parcela)} />
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
  distPill: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.94)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 18 },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2D6A4F', marginRight: 7 },
  distText: { fontSize: 12, fontWeight: '700', color: '#1E2923' },
  locateBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' },
  actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  actionDark: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#244735', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 13 },
  actionDarkText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  actionLight: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: '#E5E9E6', paddingHorizontal: 14, paddingVertical: 13 },
  actionLightText: { color: '#1E2923', fontSize: 14, fontWeight: '800' },
  culturaCard: { backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5E9E6', padding: 16, marginBottom: 20 },
  culturaTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  culturaNome: { fontSize: 19, fontWeight: '800', color: '#1E2923' },
  culturaDetalhe: { fontSize: 12.5, color: '#6B7871', marginTop: 4 },
  estadoBadge: { backgroundColor: '#F6E8D8', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: '#EED6BC' },
  estadoText: { fontSize: 11, fontWeight: '800', color: '#C26D1F' },
  statsRow: { flexDirection: 'row', gap: 10 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1E2923' },
  sectionId: { fontSize: 13, fontWeight: '800', color: '#2D6A4F' },
  tarefaCard: { backgroundColor: '#DCE8EE', borderRadius: 18, borderWidth: 1, borderColor: '#C9DCE5', padding: 16, marginBottom: 16 },
  tarefaTitulo: { fontSize: 17, fontWeight: '800', color: '#1E2923' },
  tarefaDesc: { fontSize: 13, color: '#5F6D66', marginTop: 6, lineHeight: 19 },
  tarefaMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, marginBottom: 8 },
  prazo: { fontSize: 13, fontWeight: '800', color: '#2B6C8F' },
  pontos: { fontSize: 13, color: '#5F6D66' },
  progressBg: { height: 7, backgroundColor: '#FFFFFF', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#3F7A96', borderRadius: 4 },
});
