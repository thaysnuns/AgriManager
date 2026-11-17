// components/PlantacoesScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PLANTACOES_DATA = [
  {
    id: '1',
    cultura: 'Oliveira',
    variedade: 'Galega · Cobrançosa',
    area: '52,4 ha',
    fase: 'Fruto em crescimento',
    progresso: '68%',
    progressoNum: 68,
    dataInicio: '03-06-2026',
    dataFim: '03-12-2026',
    categoria: 'Ativas 4',
    iconName: 'pine-tree',
  },
  {
    id: '2',
    cultura: 'Vinha',
    variedade: 'Touriga Nacional',
    area: '18,6 ha',
    fase: 'Pintor',
    progresso: '81%',
    progressoNum: 81,
    dataInicio: '1-11-2025',
    dataFim: '01-11-2026',
    categoria: 'Ativas 4',
    iconName: 'fruit-grapes-outline',
  },
  {
    id: '3',
    cultura: 'Trigo duro',
    variedade: 'Antequera',
    area: '31,2 ha',
    fase: 'Maturação',
    progresso: '91%',
    progressoNum: 91,
    dataInicio: '25-10-2026',
    dataFim: '25-06-2027',
    categoria: 'Ativas 4',
    iconName: 'barley',
  },
  {
    id: '4',
    cultura: 'Tomate indústria',
    variedade: 'Heinz 1015',
    area: '2,8 ha',
    fase: 'Preparação de solo',
    progresso: '15%',
    progressoNum: 15,
    dataInicio: '15-03-2027',
    dataFim: '20-08-2027',
    categoria: 'Planeadas 2',
    iconName: 'sprout-outline',
  },
];

export default function PlantacoesScreen() {
  const [activeFilter, setActiveFilter] = useState('Ativas 4');
  const filtros = ['Ativas 4', 'Planeadas 2', 'Histórico'];

  const listaFiltrada = PLANTACOES_DATA.filter((item) => {
    if (activeFilter === 'Histórico') return false;
    return item.categoria === activeFilter;
  });

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Plantações</Text>
          <Text style={styles.subtitle}>Campanha 2026 · 4 culturas</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#1E2923" />
        </TouchableOpacity>
      </View>

      {/* Cartão Verde Escuro: Área em produção */}
      <View style={styles.heroCard}>
        <View>
          <Text style={styles.heroLabel}>Área em produção</Text>
          <Text style={styles.heroValue}>105,0 ha</Text>
        </View>

        <View style={styles.harvestBox}>
          <Text style={styles.harvestLabel}>Próxima colheita</Text>
          <Text style={styles.harvestDays}>12 dias</Text>
        </View>
      </View>

      {/* Filtros (Ativas 4, Planeadas 2, Histórico) */}
      <View style={styles.filtersRow}>
        {filtros.map((filtro) => {
          const isActive = activeFilter === filtro;
          return (
            <TouchableOpacity
              key={filtro}
              style={[styles.filterPill, isActive && styles.filterPillActive]}
              onPress={() => setActiveFilter(filtro)}
            >
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                {filtro}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Lista de Cartões de Plantações */}
      {listaFiltrada.length > 0 ? (
        listaFiltrada.map((item) => (
          <View key={item.id} style={styles.plantCard}>
            {/* Linha Superior: Ícone + Nome/Variedade + Hectares */}
            <View style={styles.cardTopRow}>
              <View style={styles.iconBox}>
                <MaterialCommunityIcons name={item.iconName} size={24} color="#1B3B2B" />
              </View>

              <View style={styles.culturaInfo}>
                <Text style={styles.culturaTitle}>{item.cultura}</Text>
                <Text style={styles.culturaSub}>{item.variedade}</Text>
              </View>

              <Text style={styles.areaText}>{item.area}</Text>
            </View>

            {/* Fase e Percentagem */}
            <View style={styles.phaseRow}>
              <Text style={styles.phaseText}>{item.fase}</Text>
              <Text style={styles.percentText}>{item.progresso}</Text>
            </View>

            {/* Datas de Início e Fim */}
            <View style={styles.datesRow}>
              <Text style={styles.dateText}>{item.dataInicio}</Text>
              <Text style={styles.dateText}>{item.dataFim}</Text>
            </View>

            {/* Barra de Progresso */}
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${item.progressoNum}%` }]} />
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Sem registos no histórico desta campanha.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 30,
    backgroundColor: '#F4F6F3',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7871',
    marginTop: 2,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  heroCard: {
    backgroundColor: '#1B3B2B',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  heroLabel: {
    fontSize: 12,
    color: '#B8C7BE',
    marginBottom: 6,
  },
  heroValue: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  harvestBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  harvestLabel: {
    fontSize: 11,
    color: '#B8C7BE',
    marginBottom: 4,
  },
  harvestDays: {
    fontSize: 15,
    fontWeight: '800',
    color: '#E09F3E',
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  filterPillActive: {
    backgroundColor: '#1B3B2B',
    borderColor: '#1B3B2B',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5751',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  plantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#E3ECE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  culturaInfo: {
    flex: 1,
  },
  culturaTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2923',
  },
  culturaSub: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 2,
  },
  areaText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E2923',
  },
  phaseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  phaseText: {
    fontSize: 12,
    color: '#6B7871',
  },
  percentText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2D6A4F',
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#6B7871',
  },
  progressBg: {
    height: 7,
    backgroundColor: '#E5E9E6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1B3B2B',
    borderRadius: 4,
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: '#6B7871',
  },
});