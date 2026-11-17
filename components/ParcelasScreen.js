// components/ParcelasScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PARCELAS_DATA = [
  {
    id: '1',
    codigo: 'ON-01',
    campo: 'Olival Norte',
    detalhe: '12,4 ha · Galega vulgar',
    valor: '64%',
    indicador: 'Humidade',
    indicadorColor: '#2D6A4F',
    categoria: 'Olival',
    iconName: 'pine-tree',
    iconBg: '#E3ECE6',
    iconColor: '#1B3B2B',
  },
  {
    id: '2',
    codigo: 'ON-02',
    campo: 'Olival Norte',
    detalhe: '10,8 ha · Cobrançosa',
    valor: '71%',
    indicador: 'Humidade',
    indicadorColor: '#2D6A4F',
    categoria: 'Olival',
    iconName: 'pine-tree',
    iconBg: '#E3ECE6',
    iconColor: '#1B3B2B',
  },
  {
    id: '3',
    codigo: 'VP-03',
    campo: 'Vinha do Poente',
    detalhe: '6,2 ha · Touriga Nacional',
    valor: '38%',
    indicador: 'Rega hoje',
    indicadorColor: '#C26D1F',
    categoria: 'Vinha',
    iconName: 'fruit-grapes-outline',
    iconBg: '#F6E8D8',
    iconColor: '#C26D1F',
  },
  {
    id: '4',
    codigo: 'CS-01',
    campo: 'Cereal Sul',
    detalhe: '16,0 ha · Trigo duro',
    valor: '0,76',
    indicador: 'NDVI',
    indicadorColor: '#2D6A4F',
    categoria: 'Cereal',
    iconName: 'barley',
    iconBg: '#E3ECE6',
    iconColor: '#1B3B2B',
  },
  {
    id: '5',
    codigo: 'HP-02',
    campo: 'Horta Poente',
    detalhe: '2,8 ha · Tomate indústria',
    valor: '58%',
    indicador: 'Humidade',
    indicadorColor: '#2D6A4F',
    categoria: 'Horta',
    iconName: 'leaf',
    iconBg: '#E3ECE6',
    iconColor: '#1B3B2B',
  },
  {
    id: '6',
    codigo: 'ON-03',
    campo: 'Olival Norte',
    detalhe: '9,6 ha · Galega vulgar',
    valor: '56%',
    indicador: 'Humidade',
    indicadorColor: '#2D6A4F',
    categoria: 'Olival',
    iconName: 'pine-tree',
    iconBg: '#E3ECE6',
    iconColor: '#1B3B2B',
  },
];

export default function ParcelasScreen({ onBack }) {
  const [activeFilter, setActiveFilter] = useState('Todas');
  const filtros = ['Todas', 'Olival', 'Vinha', 'Cereal'];

  const parcelasFiltradas =
    activeFilter === 'Todas'
      ? PARCELAS_DATA
      : PARCELAS_DATA.filter((item) => item.categoria === activeFilter);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          {onBack && (
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
              <Ionicons name="arrow-back" size={20} color="#1E2923" />
            </TouchableOpacity>
          )}
          <View>
            <Text style={styles.title}>Parcelas</Text>
            <Text style={styles.subtitle}>14 parcelas em 6 campos</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#1E2923" />
        </TouchableOpacity>
      </View>

      {/* Filtros (Todas, Olival, Vinha, Cereal) */}
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

      {/* Cartão Verde Escuro de Resumo (92% área produtiva) */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryLeft}>
          <Text style={styles.summaryPercent}>92%</Text>
          <Text style={styles.summaryLabel}>área produtiva</Text>
        </View>

        <View style={styles.summaryRight}>
          <Text style={styles.summaryHectares}>118,1 ha cultivados</Text>
          <Text style={styles.summaryAlert}>2 PARCELAS REQUEREM ATENÇÃO</Text>
        </View>
      </View>

      {/* Cabeçalho da Secção: Por campo */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Por campo</Text>
        <TouchableOpacity>
          <Text style={styles.sortLink}>Ordenar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Cartões de Parcelas */}
      {parcelasFiltradas.map((item) => (
        <View key={item.id} style={styles.parcelaCard}>
          {/* Ícone da Cultura */}
          <View style={[styles.culturaIconBox, { backgroundColor: item.iconBg }]}>
            <MaterialCommunityIcons name={item.iconName} size={24} color={item.iconColor} />
          </View>

          {/* Identificação e Cultura */}
          <View style={styles.parcelaInfo}>
            <Text style={styles.parcelaNome}>
              {item.codigo} · {item.campo}
            </Text>
            <Text style={styles.parcelaDetalhe}>{item.detalhe}</Text>
          </View>

          {/* Métricas e Ícones de Ação (QR, Editar, Apagar) */}
          <View style={styles.rightColumn}>
            <Text style={styles.valorText}>{item.valor}</Text>
            <Text style={[styles.indicadorText, { color: item.indicadorColor }]}>
              {item.indicador}
            </Text>

            <View style={styles.miniActionsRow}>
              <TouchableOpacity style={styles.miniBtnGreen}>
                <Ionicons name="qr-code-outline" size={13} color="#1B3B2B" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.miniBtnGreen}>
                <Ionicons name="pencil" size={13} color="#1B3B2B" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.miniBtnOrange}>
                <Ionicons name="trash-outline" size={13} color="#C26D1F" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
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
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8ECE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  summaryCard: {
    backgroundColor: '#1B3B2B',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  summaryLeft: {
    justifyContent: 'center',
  },
  summaryPercent: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#B8C7BE',
    marginTop: 2,
  },
  summaryRight: {
    alignItems: 'flex-end',
  },
  summaryHectares: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E2EBE5',
    marginBottom: 6,
  },
  summaryAlert: {
    fontSize: 10,
    fontWeight: '800',
    color: '#E09F3E',
    letterSpacing: 0.3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E2923',
  },
  sortLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D6A4F',
  },
  parcelaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  culturaIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  parcelaInfo: {
    flex: 1,
  },
  parcelaNome: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2923',
  },
  parcelaDetalhe: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 3,
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  valorText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E2923',
  },
  indicadorText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
    marginBottom: 6,
  },
  miniActionsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  miniBtnGreen: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#E3ECE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniBtnOrange: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#F6E8D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});