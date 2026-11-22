// components/AdminParcelaDetalheScreen.js — detalhe da parcela visto pelo administrador (só leitura)
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import StatCard from '../ui/StatCard';
import SectionHeader from '../ui/SectionHeader';

const FOTO = {
  uri: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=80',
};

const EXEMPLO = {
  nome: 'Parcela ON-01',
  subtitulo: 'Vinha do Poente · 6,2 ha',
  qr: 'QR · VP03-2026',
  alerta: 'Humidade abaixo do intervalo ideal',
  humidade: '38%',
  ndvi: '0,68',
  solo: '23°',
  cultura: 'Touriga Nacional',
  plantio: 'Plantada em mar. 2019 · 2 480 cepas',
  fase: 'Fase 5',
  faseNome: 'Pintor',
  recomendacao: 'Programar rega de 18 mm entre as 19:00 e as 22:00 para reduzir evaporação.',
};

export default function AdminParcelaDetalheScreen({ parcela = EXEMPLO, onBack, onAbrirMapa, onHistorico, onMais }) {
  const base = {
    ...EXEMPLO,
    ...parcela,
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.roundBtn} onPress={onBack} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{base.nome}</Text>
          <Text style={styles.subtitle}>{base.subtitulo}</Text>
        </View>
        <TouchableOpacity style={[styles.roundBtn, styles.white]} onPress={onMais} activeOpacity={0.8}>
          <Ionicons name="ellipsis-horizontal" size={18} color="#1E2923" />
        </TouchableOpacity>
      </View>

      <ImageBackground source={FOTO} style={styles.photo} imageStyle={{ borderRadius: 20 }}>
        <View style={styles.qrPill}>
          <Text style={styles.qrPillText}>{base.qr}</Text>
        </View>
        {!!base.alerta && (
          <View style={styles.alerta}>
            <Ionicons name="warning-outline" size={18} color="#F2B872" />
            <Text style={styles.alertaText}>{base.alerta}</Text>
          </View>
        )}
      </ImageBackground>

      <View style={styles.statsRow}>
        <StatCard value={base.humidade} label="Humidade" />
        <StatCard value={base.ndvi} label="NDVI" />
        <StatCard value={base.solo} label="Solo" />
      </View>

      <SectionHeader title="Cultura atual" actionLabel="Histórico" onActionPress={onHistorico} />

      <View style={styles.culturaCard}>
        <View style={styles.culturaIcon}>
          <MaterialCommunityIcons name="fruit-grapes-outline" size={22} color="#1B3B2B" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.culturaNome}>{base.cultura}</Text>
          <Text style={styles.culturaSub}>{base.plantio}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.culturaNome}>{base.fase}</Text>
          <Text style={styles.fase}>{base.faseNome}</Text>
        </View>
      </View>


      <View style={styles.qrCard}>
        <View style={styles.qrHeaderRow}>
          <Text style={styles.qrCardTitle}>QR code da parcela</Text>
          <Text style={styles.qrDateText}>Gerado em 2026</Text>
        </View>
        <View style={styles.qrBodyRow}>
          <View style={styles.qrMatrixBox}>
            <Ionicons name="qr-code-outline" size={50} color="#1E2923" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.qrCodeTitle}>{base.qr}</Text>
            <Text style={styles.qrDescText}>Identificador único associado à parcela.</Text>
            <Text style={styles.qrFooterLink}>Código QR associado · 2026</Text>
          </View>
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
  qrPill: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.94)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  qrPillText: { fontSize: 12, fontWeight: '800', color: '#1E2923' },
  alerta: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(68,42,18,0.86)', paddingHorizontal: 14, paddingVertical: 11, borderRadius: 14 },
  alertaText: { flex: 1, fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  culturaCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5E9E6', padding: 14, marginBottom: 14 },
  culturaIcon: { width: 44, height: 44, borderRadius: 13, backgroundColor: '#DCE7DF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  culturaNome: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  culturaSub: { fontSize: 12, color: '#6B7871', marginTop: 2 },
  fase: { fontSize: 12, fontWeight: '700', color: '#2D6A4F', marginTop: 2 },
  reco: { backgroundColor: '#F6E8D8', borderRadius: 18, padding: 16, marginBottom: 16 },
  recoTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  recoTitulo: { fontSize: 14, fontWeight: '800', color: '#1E2923' },
  recoTexto: { fontSize: 13, color: '#4A544E', lineHeight: 19 },
  qrCard: { backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5E9E6', padding: 16, marginBottom: 16 },
  qrHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  qrCardTitle: { fontSize: 14, fontWeight: '800', color: '#1E2923' },
  qrDateText: { fontSize: 12, color: '#6B7871' },
  qrBodyRow: { flexDirection: 'row', alignItems: 'center' },
  qrMatrixBox: { width: 50, height: 50, borderRadius: 10, backgroundColor: '#DCE7DF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  qrCodeTitle: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  qrDescText: { fontSize: 13, color: '#4A544E', lineHeight: 18, marginTop: 4 },
  qrFooterLink: { fontSize: 12, fontWeight: '700', color: '#2D6A4F', marginTop: 4 },
  mapBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: '#DCE2DE', paddingHorizontal: 18, paddingVertical: 13 },
  mapBtnText: { fontSize: 14, fontWeight: '800', color: '#244735' },
});
