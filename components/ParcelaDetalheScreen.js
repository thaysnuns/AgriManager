// components/ParcelaDetalheScreen.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from './ui/StatCard';
import SectionHeader from './ui/SectionHeader';

const DETALHES_POR_CODIGO = {
  'VP-03': {
    titulo: 'Parcela VP-03',
    subtitulo: 'Vinha do Poente · 6,2 ha',
    qrBadge: 'QR · VP03-2026',
    qrCodigo: 'VP03-2026',
    alertaFoto: 'Humidade abaixo do intervalo ideal',
    alertaAtivo: true,
    humidade: '38%',
    ndvi: '0,68',
    solo: '23°',
    culturaNome: 'Touriga Nacional',
    culturaDetalhe: 'Plantada em mar. 2019 · 2 480 cepas',
    fase: 'Fase 5',
    estadoCultura: 'Pintor',
    estadoCulturaColor: '#2D6A4F',
    culturaIcon: 'nutrition-outline',
    recomendacao:
      'Programar rega de 18 mm entre as 19:00 e as 22:00 para reduzir evaporação.',
    imagemUri:
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=80',
  },
  'ON-01': {
    titulo: 'Parcela ON-01',
    subtitulo: 'Olival Norte · 12,4 ha',
    qrBadge: 'QR · ON01-2026',
    qrCodigo: 'ON01-2026',
    alertaFoto: 'Humidade dentro do intervalo ideal',
    alertaAtivo: false,
    humidade: '64%',
    ndvi: '0,82',
    solo: '21°',
    culturaNome: 'Galega vulgar',
    culturaDetalhe: 'Plantada em abr. 2018 · 3 100 oliveiras',
    fase: 'Fase 4',
    estadoCultura: 'Saudável',
    estadoCulturaColor: '#2D6A4F',
    culturaIcon: 'leaf-outline',
    recomendacao:
      'Manter monitorização regular da humidade e agendar poda ligeira após colheita.',
    imagemUri:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
  },
  'ON-02': {
    titulo: 'Parcela ON-02',
    subtitulo: 'Olival Norte · 10,8 ha',
    qrBadge: 'QR · ON02-2026',
    qrCodigo: 'ON02-2026',
    alertaFoto: 'Rega planeada para amanhã de manhã',
    alertaAtivo: false,
    humidade: '71%',
    ndvi: '0,80',
    solo: '20°',
    culturaNome: 'Cobrançosa',
    culturaDetalhe: 'Plantada em fev. 2020 · 2 750 oliveiras',
    fase: 'Fase 4',
    estadoCultura: 'Planeada',
    estadoCulturaColor: '#2B6CB0',
    culturaIcon: 'leaf-outline',
    recomendacao:
      'Verificar pressão dos gotejadores no setor norte antes do início da rega.',
    imagemUri:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
  },
};

export default function ParcelaDetalheScreen({
  parcela,
  campoContexto,
  onBack,
  onCriarTarefa,
  onAbrirMapa,
  onVerHistorico,
  onMoreOptions,
}) {
  const codigoBase =
    parcela?.codigo ||
    (parcela?.nome ? parcela.nome.replace(/^Parcela\s+/i, '').trim() : 'ON-01');

  const base = DETALHES_POR_CODIGO[codigoBase] || {
    titulo: parcela?.nome || `Parcela ${codigoBase}`,
    subtitulo: `${parcela?.campo || campoContexto?.nome || 'Olival Norte'} · 12,4 ha`,
    qrBadge: `QR · ${codigoBase.replace('-', '')}-2026`,
    qrCodigo: `${codigoBase.replace('-', '')}-2026`,
    alertaFoto: parcela?.alerta
      ? 'Humidade abaixo do intervalo ideal'
      : 'Parâmetros dentro do intervalo ideal',
    alertaAtivo: Boolean(parcela?.alerta),
    humidade: '64%',
    ndvi: '0,78',
    solo: '22°',
    culturaNome: parcela?.cultura || 'Galega vulgar',
    culturaDetalhe: 'Plantada em mar. 2019 · talhão monitorizado',
    fase: 'Fase 4',
    estadoCultura: parcela?.estado || 'Ativa',
    estadoCulturaColor: '#2D6A4F',
    culturaIcon: 'leaf-outline',
    recomendacao:
      'Programar rega no período noturno para reduzir evaporação e melhorar absorção.',
    imagemUri:
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=80',
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => onBack && onBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text numberOfLines={1} style={styles.title}>
            {base.titulo}
          </Text>
          <Text numberOfLines={1} style={styles.subtitle}>
            {base.subtitulo}
          </Text>
        </View>

        <View style={styles.topActions}>
          <TouchableOpacity
            style={styles.iconCircleBtn}
            onPress={() => onAbrirMapa && onAbrirMapa(parcela)}
            activeOpacity={0.8}
          >
            <Ionicons name="grid-outline" size={18} color="#244735" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconCircleBtn}
            onPress={() => onCriarTarefa && onCriarTarefa(parcela)}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark-done-outline" size={18} color="#244735" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconCircleBtn}
            onPress={() => onMoreOptions && onMoreOptions(parcela)}
            activeOpacity={0.8}
          >
            <Ionicons name="ellipsis-horizontal" size={18} color="#1E2923" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.photoWrapper}>
        <ImageBackground
          source={{ uri: base.imagemUri }}
          style={styles.photoImage}
          imageStyle={styles.photoRadius}
        >
          <View style={styles.qrTopPill}>
            <Text style={styles.qrTopPillText}>{base.qrBadge}</Text>
          </View>

          <View
            style={[
              styles.alertBanner,
              !base.alertaAtivo && styles.alertBannerOk,
            ]}
          >
            <Ionicons
              name={
                base.alertaAtivo
                  ? 'warning-outline'
                  : 'checkmark-circle-outline'
              }
              size={18}
              color={base.alertaAtivo ? '#F2B872' : '#A7E3C0'}
            />
            <Text style={styles.alertBannerText}>{base.alertaFoto}</Text>
          </View>
        </ImageBackground>
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

          <View style={styles.qrInfoCol}>
            <Text style={styles.qrCodeTitle}>{base.qrCodigo}</Text>
            <Text style={styles.qrDescText}>
              Identificador único gerado na criação da parcela.
            </Text>
            <Text style={styles.qrFooterLink}>Código QR associado · 2026</Text>
          </View>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <StatCard
          value={base.humidade}
          label="Humidade"
          style={styles.statCardCompact}
          valueStyle={styles.statValueCompact}
          labelStyle={styles.statLabelCompact}
        />
        <StatCard
          value={base.ndvi}
          label="NDVI"
          style={styles.statCardCompact}
          valueStyle={styles.statValueCompact}
          labelStyle={styles.statLabelCompact}
        />
        <StatCard
          value={base.solo}
          label="Solo"
          style={styles.statCardCompact}
          valueStyle={styles.statValueCompact}
          labelStyle={styles.statLabelCompact}
        />
      </View>

      <SectionHeader
        title="Cultura atual"
        actionLabel="Histórico"
        onActionPress={() => onVerHistorico && onVerHistorico(parcela)}
      />

      <View style={styles.cultureCard}>
        <View style={styles.cultureIconBox}>
          <Ionicons name={base.culturaIcon} size={22} color="#2D6A4F" />
        </View>

        <View style={styles.cultureInfo}>
          <Text numberOfLines={1} style={styles.cultureName}>
            {base.culturaNome}
          </Text>
          <Text numberOfLines={1} style={styles.cultureDetail}>
            {base.culturaDetalhe}
          </Text>
        </View>

        <View style={styles.cultureRight}>
          <Text style={styles.culturePhase}>{base.fase}</Text>
          <Text
            style={[styles.cultureStatus, { color: base.estadoCulturaColor }]}
          >
            {base.estadoCultura}
          </Text>
        </View>
      </View>

      <View style={styles.recommendationCard}>
        <View style={styles.recTitleRow}>
          <Ionicons name="sparkles-outline" size={16} color="#C26D1F" />
          <Text style={styles.recTitle}>Recomendação agronómica</Text>
        </View>
        <Text style={styles.recText}>{base.recomendacao}</Text>
      </View>

      <View style={styles.bottomActionsRow}>
        <TouchableOpacity
          style={styles.primaryActionBtn}
          onPress={() => onCriarTarefa && onCriarTarefa(parcela)}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.primaryActionText}>Criar tarefa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryActionBtn}
          onPress={() => onAbrirMapa && onAbrirMapa(parcela)}
          activeOpacity={0.85}
        >
          <Ionicons name="map-outline" size={18} color="#244735" />
          <Text style={styles.secondaryActionText}>Abrir mapa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: { flex: 1, backgroundColor: '#F4F6F3' },
  container: { flexGrow: 1, padding: 20, paddingTop: 14, paddingBottom: 28, backgroundColor: '#F4F6F3' },
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 8 },
  backBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E5E9E6' },
  headerCenter: { flex: 1 },
  title: { fontSize: 21, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 12, color: '#6B7871', marginTop: 1 },
  topActions: { flexDirection: 'row', gap: 6 },
  iconCircleBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E5E9E6' },
  photoWrapper: { borderRadius: 20, overflow: 'hidden', marginBottom: 14 },
  photoImage: { height: 185, width: '100%', justifyContent: 'space-between', padding: 12 },
  photoRadius: { borderRadius: 20 },
  qrTopPill: { alignSelf: 'flex-start', backgroundColor: 'rgba(255, 255, 255, 0.94)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  qrTopPillText: { fontSize: 12, fontWeight: '800', color: '#1E2923' },
  alertBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(68, 42, 18, 0.86)', paddingHorizontal: 14, paddingVertical: 11, borderRadius: 14 },
  alertBannerOk: { backgroundColor: 'rgba(27, 59, 43, 0.88)' },
  alertBannerText: { flex: 1, fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  qrCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: '#E5E9E6' },
  qrHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  qrCardTitle: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  qrDateText: { fontSize: 12, fontWeight: '700', color: '#2D6A4F' },
  qrBodyRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  qrMatrixBox: { width: 76, height: 76, borderRadius: 14, backgroundColor: '#F4F6F3', borderWidth: 1, borderColor: '#E2E7E4', justifyContent: 'center', alignItems: 'center' },
  qrInfoCol: { flex: 1 },
  qrCodeTitle: { fontSize: 16, fontWeight: '800', color: '#1E2923' },
  qrDescText: { fontSize: 12, color: '#6B7871', marginTop: 2, lineHeight: 17 },
  qrFooterLink: { fontSize: 12, fontWeight: '700', color: '#2D6A4F', marginTop: 6 },
  metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  statCardCompact: { flex: 1, paddingVertical: 14, paddingHorizontal: 10, alignItems: 'center' },
  statValueCompact: { fontSize: 19, textAlign: 'center' },
  statLabelCompact: { fontSize: 12, textAlign: 'center', marginTop: 3 },
  cultureCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: '#E5E9E6' },
  cultureIconBox: { width: 44, height: 44, borderRadius: 13, backgroundColor: '#DCE7DF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  cultureInfo: { flex: 1, marginRight: 8 },
  cultureName: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  cultureDetail: { fontSize: 12, color: '#6B7871', marginTop: 2 },
  cultureRight: { alignItems: 'flex-end' },
  culturePhase: { fontSize: 14, fontWeight: '800', color: '#1E2923' },
  cultureStatus: { fontSize: 12, fontWeight: '700', marginTop: 2 },
  recommendationCard: { backgroundColor: '#F7ECE0', borderRadius: 18, padding: 16, marginBottom: 18 },
  recTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  recTitle: { fontSize: 14, fontWeight: '800', color: '#1E2923' },
  recText: { fontSize: 13, color: '#4A544E', lineHeight: 19 },
  bottomActionsRow: { flexDirection: 'row', gap: 12 },
  primaryActionBtn: { flex: 1.15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#1B3B2B', borderRadius: 16, paddingVertical: 15 },
  primaryActionText: { fontSize: 14, fontWeight: '800', color: '#FFFFFF' },
  secondaryActionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 15, borderWidth: 1, borderColor: '#DCE2DE' },
  secondaryActionText: { fontSize: 14, fontWeight: '800', color: '#244735' },
});