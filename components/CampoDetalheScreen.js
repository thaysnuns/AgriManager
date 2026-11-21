// components/CampoDetalheScreen.js
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

const PARCELAS_POR_CAMPO = {
  '1': [
    {
      id: 'p-1',
      codigo: 'ON-01',
      campo: 'Olival Norte',
      nome: 'Parcela ON-01',
      detalhe: '12,4 ha · oliveiras 8 anos',
      estado: 'SEM ALERTAS',
      estadoColor: '#2D6A4F',
      iconBg: '#DCE7DF',
      iconColor: '#2D6A4F',
    },
    {
      id: 'p-2',
      codigo: 'ON-02',
      campo: 'Olival Norte',
      nome: 'Parcela ON-02',
      detalhe: '10,8 ha · próxima rega amanhã',
      estado: 'PLANEADA',
      estadoColor: '#2B6CB0',
      iconBg: '#DCEAF7',
      iconColor: '#2B6CB0',
    },
  ],
  '2': [
    {
      id: 'p-3',
      codigo: 'VP-03',
      campo: 'Vinha do Poente',
      nome: 'Parcela VP-03',
      detalhe: '6,2 ha · Touriga Nacional',
      estado: 'REGA HOJE',
      estadoColor: '#C26D1F',
      iconBg: '#F6E8D8',
      iconColor: '#C26D1F',
    },
    {
      id: 'p-4',
      codigo: 'VP-01',
      campo: 'Vinha do Poente',
      nome: 'Parcela VP-01',
      detalhe: '7,4 ha · Aragonez',
      estado: 'SEM ALERTAS',
      estadoColor: '#2D6A4F',
      iconBg: '#DCE7DF',
      iconColor: '#2D6A4F',
    },
  ],
  '3': [
    {
      id: 'p-5',
      codigo: 'CS-01',
      campo: 'Cereal Sul',
      nome: 'Parcela CS-01',
      detalhe: '16,0 ha · Trigo duro',
      estado: 'SEM ALERTAS',
      estadoColor: '#2D6A4F',
      iconBg: '#DCE7DF',
      iconColor: '#2D6A4F',
    },
    {
      id: 'p-6',
      codigo: 'CS-02',
      campo: 'Cereal Sul',
      nome: 'Parcela CS-02',
      detalhe: '15,2 ha · Cevada dística',
      estado: 'PLANEADA',
      estadoColor: '#2B6CB0',
      iconBg: '#DCEAF7',
      iconColor: '#2B6CB0',
    },
  ],
};

export default function CampoDetalheScreen({
  campo,
  onBack,
  onEditCampo,
  onDeleteCampo,
  onVerTodasParcelas,
  onSelectParcela,
}) {
  const campoAtual = campo || {
    id: '1',
    nome: 'Olival Norte',
    area: 42.8,
    parcelasCount: 4,
    cultura: 'Oliveira Galega',
    estado: 'Saudável',
  };

  const areaFmt =
    campoAtual.areaFormatada ||
    `${Number(campoAtual.area || 42.8).toLocaleString('pt-PT', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })} ha`;

  const parcelasCount = campoAtual.parcelasCount || 4;
  const cultura = campoAtual.cultura || 'Oliveira Galega';
  const estado = campoAtual.estado || 'Saudável';
  const isAtencao = estado === 'Atenção';

  const parcelasVisiveis =
    PARCELAS_POR_CAMPO[campoAtual.id] || PARCELAS_POR_CAMPO['1'];

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho Superior: Voltar + Título + Ações */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => onBack && onBack()}
          activeOpacity={0.8}
          delayPressIn={0}
        >
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text numberOfLines={1} style={styles.title}>
            {campoAtual.nome}
          </Text>
          <Text style={styles.subtitle}>Campo · atualizado há 12 min</Text>
        </View>

        <View style={styles.topActions}>
          <TouchableOpacity
            style={styles.moreBtn}
            onPress={() => onEditCampo && onEditCampo(campoAtual)}
            activeOpacity={0.8}
            delayPressIn={0}
          >
            <Ionicons name="ellipsis-horizontal" size={18} color="#244735" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dangerBtn}
            onPress={() => onDeleteCampo && onDeleteCampo(campoAtual.id)}
            activeOpacity={0.8}
            delayPressIn={0}
          >
            <Ionicons name="ellipsis-horizontal" size={18} color="#C26D1F" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Vista Aérea / Mapa do Campo */}
      <View style={styles.mapWrapper}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
          }}
          style={styles.mapImage}
          imageStyle={styles.mapImageRadius}
        >
          <View style={styles.mapBadge}>
            <View
              style={[
                styles.statusDot,
                isAtencao && { backgroundColor: '#C26D1F' },
              ]}
            />
            <Text style={styles.mapBadgeText}>
              {areaFmt} · perímetro validado
            </Text>
          </View>

          <TouchableOpacity
            style={styles.locateBtn}
            activeOpacity={0.85}
            delayPressIn={0}
          >
            <Ionicons name="locate-outline" size={20} color="#1B3B2B" />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* Badges de Estado, Parcelas e Cultura */}
      <View style={styles.badgesRow}>
        <View
          style={[
            styles.estadoBadge,
            isAtencao && styles.estadoBadgeAtencao,
          ]}
        >
          <View
            style={[
              styles.smallDot,
              { backgroundColor: isAtencao ? '#C26D1F' : '#2D6A4F' },
            ]}
          />
          <Text
            style={[
              styles.estadoBadgeText,
              isAtencao && { color: '#C26D1F' },
            ]}
          >
            {estado}
          </Text>
        </View>

        <View style={styles.infoBadge}>
          <Text style={styles.infoBadgeText}>{parcelasCount} parcelas</Text>
        </View>

        <View style={styles.infoBadge}>
          <Text style={styles.infoBadgeText}>{cultura}</Text>
        </View>
      </View>

      {/* Métricas Reutilizando StatCard */}
      <View style={styles.statsRow}>
        <StatCard
          iconName="water-outline"
          iconColor="#2B6CB0"
          iconBg="#DCEAF7"
          value={isAtencao ? '41%' : '64%'}
          label="Humidade"
          note={isAtencao ? 'Abaixo do ideal' : 'Ideal'}
          noteColor={isAtencao ? '#C26D1F' : '#2B6CB0'}
        />

        <StatCard
          iconName="pulse-outline"
          iconColor="#2D6A4F"
          iconBg="#DCE7DF"
          value={isAtencao ? '0,68' : '0,82'}
          label="Vigor médio"
          note={isAtencao ? '-2% / 7 dias' : '+4% / 7 dias'}
          noteColor={isAtencao ? '#C26D1F' : '#2D6A4F'}
        />
      </View>

      {/* Secção Parcelas Reutilizando SectionHeader */}
      <SectionHeader
        title="Parcelas"
        actionLabel={`Ver ${parcelasCount}`}
        onActionPress={() =>
          onVerTodasParcelas && onVerTodasParcelas(campoAtual)
        }
      />

      {parcelasVisiveis.map((parcela) => (
        <TouchableOpacity
          key={parcela.id}
          style={styles.parcelaCard}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={() => onSelectParcela && onSelectParcela(parcela)}
        >
          <View style={[styles.parcelaIconBox, { backgroundColor: parcela.iconBg }]}>
            <Ionicons
              name="layers-outline"
              size={20}
              color={parcela.iconColor}
            />
          </View>

          <View style={styles.parcelaInfo}>
            <Text style={styles.parcelaNome}>{parcela.nome}</Text>
            <Text style={styles.parcelaDetalhe}>{parcela.detalhe}</Text>
          </View>

          <Text style={[styles.parcelaStatus, { color: parcela.estadoColor }]}>
            {parcela.estado}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F4F6F3',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 14,
    paddingBottom: 28,
    backgroundColor: '#F4F6F3',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  headerCenter: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 1,
  },
  topActions: {
    flexDirection: 'row',
    gap: 8,
  },
  moreBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  dangerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F6E8D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
  },
  mapImage: {
    height: 185,
    width: '100%',
    justifyContent: 'space-between',
    padding: 12,
  },
  mapImageRadius: {
    borderRadius: 20,
  },
  mapBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2D6A4F',
    marginRight: 7,
  },
  mapBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E2923',
  },
  locateBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  estadoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCE7DF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    gap: 6,
  },
  estadoBadgeAtencao: {
    backgroundColor: '#F6E8D8',
  },
  smallDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  estadoBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2D6A4F',
  },
  infoBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  infoBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5751',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  parcelaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  parcelaIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  parcelaInfo: {
    flex: 1,
  },
  parcelaNome: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E2923',
  },
  parcelaDetalhe: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 2,
  },
  parcelaStatus: {
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 8,
  },
});