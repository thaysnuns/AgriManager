// components/PlantacoesScreen.js
import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PlantacaoCard from './ui/PlantacaoCard';

const PLANTACOES_DADOS = [
  {
    id: 'pl-1',
    estadoFiltro: 'ativas',
    tipo: 'olival',
    nome: 'Oliveira',
    variedade: 'Galega · Cobrançosa',
    area: 52.4,
    fase: 'Fruto em crescimento',
    progresso: 68,
    dataInicio: '03-06-2026',
    dataFim: '03-12-2026',
  },
  {
    id: 'pl-2',
    estadoFiltro: 'ativas',
    tipo: 'vinha',
    nome: 'Vinha',
    variedade: 'Touriga Nacional',
    area: 18.6,
    fase: 'Pintor',
    progresso: 81,
    dataInicio: '1-11-2025',
    dataFim: '01-11-2026',
  },
  {
    id: 'pl-3',
    estadoFiltro: 'ativas',
    tipo: 'cereal',
    nome: 'Trigo duro',
    variedade: 'Antequera',
    area: 31.2,
    fase: 'Maturação',
    progresso: 74,
    dataInicio: '25-10-2026',
    dataFim: '25-06-2027',
  },
  {
    id: 'pl-4',
    estadoFiltro: 'ativas',
    tipo: 'horta',
    nome: 'Horta de Verão',
    variedade: 'Tomate · Pimento',
    area: 2.8,
    fase: 'Desenvolvimento vegetativo',
    progresso: 54,
    dataInicio: '15-04-2026',
    dataFim: '20-09-2026',
  },
  {
    id: 'pl-5',
    estadoFiltro: 'planeadas',
    tipo: 'olival',
    nome: 'Olival Encosta',
    variedade: 'Arbequina',
    area: 14.0,
    fase: 'Preparação de solo',
    progresso: 20,
    dataInicio: '10-01-2027',
    dataFim: '15-11-2027',
  },
  {
    id: 'pl-6',
    estadoFiltro: 'planeadas',
    tipo: 'cereal',
    nome: 'Cevada Norte',
    variedade: 'Scarlett',
    area: 9.5,
    fase: 'Planeamento de sementeira',
    progresso: 10,
    dataInicio: '05-02-2027',
    dataFim: '20-07-2027',
  },
  {
    id: 'pl-7',
    estadoFiltro: 'historico',
    tipo: 'vinha',
    nome: 'Vinha Velha',
    variedade: 'Tinta Roriz',
    area: 11.2,
    fase: 'Campanha concluída',
    progresso: 100,
    dataInicio: '01-11-2024',
    dataFim: '30-10-2025',
  },
];

const FILTROS = [
  { key: 'ativas', label: 'Ativas 4' },
  { key: 'planeadas', label: 'Planeadas 2' },
  { key: 'historico', label: 'Histórico' },
];

export default function PlantacoesScreen({
  onSelectPlantacao,
  onOpenCriarPlantacao,
}) {
  const [filtroAtivo, setFiltroAtivo] = useState('ativas');

  const plantacoesVisiveis = useMemo(
    () => PLANTACOES_DADOS.filter((item) => item.estadoFiltro === filtroAtivo),
    [filtroAtivo]
  );

  const areaProducaoTexto =
    filtroAtivo === 'ativas'
      ? '105,0 ha'
      : `${plantacoesVisiveis
          .reduce((acc, item) => acc + (Number(item.area) || 0), 0)
          .toLocaleString('pt-PT', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })} ha`;

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerTextCol}>
          <Text style={styles.title}>Plantações</Text>
          <Text style={styles.subtitle}>Campanha 2026 · 4 culturas</Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={() => onOpenCriarPlantacao && onOpenCriarPlantacao()}
        >
          <Ionicons name="add" size={22} color="#1E2923" />
        </TouchableOpacity>
      </View>

      {/* Cartão escuro Área em produção + Próxima colheita */}
      <View style={styles.heroCard}>
        <View style={styles.heroLeft}>
          <Text style={styles.heroLabel}>Área em produção</Text>
          <Text style={styles.heroValue}>{areaProducaoTexto}</Text>
        </View>

        <View style={styles.harvestBox}>
          <Text style={styles.harvestLabel}>Próxima colheita</Text>
          <Text style={styles.harvestValue}>12 dias</Text>
        </View>
      </View>

      {/* Chips Ativas 4 / Planeadas 2 / Histórico */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {FILTROS.map((filtro) => {
          const ativa = filtroAtivo === filtro.key;
          return (
            <TouchableOpacity
              key={filtro.key}
              style={[styles.chip, ativa && styles.chipActive]}
              activeOpacity={0.8}
              delayPressIn={0}
              onPress={() => setFiltroAtivo(filtro.key)}
            >
              <Text style={[styles.chipText, ativa && styles.chipTextActive]}>
                {filtro.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Lista de PlantacaoCard */}
      {plantacoesVisiveis.map((plantacao) => (
        <PlantacaoCard
          key={plantacao.id}
          plantacao={plantacao}
          onPress={(item) => onSelectPlantacao && onSelectPlantacao(item)}
        />
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTextCol: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7871',
    marginTop: 2,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1B3B2B',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 16,
    gap: 12,
  },
  heroLeft: {
    flex: 1,
  },
  heroLabel: {
    fontSize: 13,
    color: '#C8D8CE',
    marginBottom: 4,
  },
  heroValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 36,
  },
  harvestBox: {
    backgroundColor: '#254837',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  harvestLabel: {
    fontSize: 11.5,
    color: '#C8D8CE',
    marginBottom: 3,
  },
  harvestValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#E59A4C',
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  chipActive: {
    backgroundColor: '#1B3B2B',
    borderColor: '#1B3B2B',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#244735',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
});