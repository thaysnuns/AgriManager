// components/ParcelasScreen.js
import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ParcelaCard from './ui/ParcelaCard';

const PARCELAS_DADOS = [
  {
    id: 'p-1',
    codigo: 'ON-01',
    campo: 'Olival Norte',
    tipo: 'olival',
    cultura: 'Galega vulgar',
    area: 12.4,
    valorPrincipal: '64%',
    legendaMetric: 'Humidade',
    alerta: false,
  },
  {
    id: 'p-2',
    codigo: 'ON-02',
    campo: 'Olival Norte',
    tipo: 'olival',
    cultura: 'Cobrançosa',
    area: 10.8,
    valorPrincipal: '71%',
    legendaMetric: 'Humidade',
    alerta: false,
  },
  {
    id: 'p-3',
    codigo: 'VP-03',
    campo: 'Vinha do Poente',
    tipo: 'vinha',
    cultura: 'Touriga Nacional',
    area: 6.2,
    valorPrincipal: '38%',
    legendaMetric: 'Rega hoje',
    alerta: true,
  },
  {
    id: 'p-4',
    codigo: 'CS-01',
    campo: 'Cereal Sul',
    tipo: 'cereal',
    cultura: 'Trigo duro',
    area: 16.0,
    valorPrincipal: '0,76',
    legendaMetric: 'NDVI',
    alerta: false,
  },
  {
    id: 'p-5',
    codigo: 'HP-02',
    campo: 'Horta Poente',
    tipo: 'horta',
    cultura: 'Tomate indústria',
    area: 2.8,
    valorPrincipal: '58%',
    legendaMetric: 'Humidade',
    alerta: false,
  },
  {
    id: 'p-6',
    codigo: 'ON-03',
    campo: 'Olival Norte',
    tipo: 'olival',
    cultura: 'Picual',
    area: 9.6,
    valorPrincipal: '56%',
    legendaMetric: 'Humidade',
    alerta: true,
  },
];

const CATEGORIAS = [
  { key: 'todas', label: 'Todas' },
  { key: 'olival', label: 'Olival' },
  { key: 'vinha', label: 'Vinha' },
  { key: 'cereal', label: 'Cereal' },
];

export default function ParcelasScreen({
  campoFiltro = null,
  onBackToCampo,
  onClearCampoFiltro,
  onSelectParcela,
  onOpenCriarParcela,
  onEditParcela,
  onDeleteParcela,
  onQrParcela,
}) {
  const [selectedCat, setSelectedCat] = useState('todas');
  const [ordenarPor, setOrdenarPor] = useState('campo');

  const parcelasVisiveis = useMemo(() => {
    const lista = PARCELAS_DADOS.filter((item) => {
      if (campoFiltro?.nome && item.campo !== campoFiltro.nome) {
        return false;
      }
      if (selectedCat !== 'todas' && item.tipo !== selectedCat) {
        return false;
      }
      return true;
    });

    const ordenada = [...lista];
    if (ordenarPor === 'area') {
      ordenada.sort((a, b) => (Number(b.area) || 0) - (Number(a.area) || 0));
    } else if (ordenarPor === 'codigo') {
      ordenada.sort((a, b) => a.codigo.localeCompare(b.codigo));
    } else {
      ordenada.sort((a, b) => a.campo.localeCompare(b.campo));
    }
    return ordenada;
  }, [campoFiltro, selectedCat, ordenarPor]);

  const totalParcelasTexto = campoFiltro
    ? `${parcelasVisiveis.length} parcelas em ${campoFiltro.nome}`
    : '14 parcelas em 6 campos';

  const haCultivadosTexto = campoFiltro
    ? `${parcelasVisiveis
        .reduce((acc, p) => acc + (Number(p.area) || 0), 0)
        .toLocaleString('pt-PT', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })} ha cultivados`
    : '118,1 ha cultivados';

  const alertasCount = parcelasVisiveis.filter(
    (p) => p.alerta || p.legendaMetric === 'Rega hoje'
  ).length;

  const ciclarOrdenacao = () => {
    setOrdenarPor((prev) =>
      prev === 'campo' ? 'area' : prev === 'area' ? 'codigo' : 'campo'
    );
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerTextCol}>
          <Text style={styles.title}>Parcelas</Text>
          <Text style={styles.subtitle}>{totalParcelasTexto}</Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={() => onOpenCriarParcela && onOpenCriarParcela(campoFiltro)}
        >
          <Ionicons name="add" size={22} color="#1E2923" />
        </TouchableOpacity>
      </View>

      {campoFiltro && (
        <View style={styles.contextBanner}>
          <Text numberOfLines={1} style={styles.contextText}>
            Filtro ativo: {campoFiltro.nome}
          </Text>
          <View style={styles.contextActions}>
            {onClearCampoFiltro && (
              <TouchableOpacity
                style={styles.contextBtn}
                onPress={onClearCampoFiltro}
              >
                <Text style={styles.contextBtnText}>Ver todas</Text>
              </TouchableOpacity>
            )}
            {onBackToCampo && (
              <TouchableOpacity
                style={styles.contextBtn}
                onPress={onBackToCampo}
              >
                <Text style={styles.contextBtnText}>Campo</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {CATEGORIAS.map((cat) => {
          const ativa = selectedCat === cat.key;
          return (
            <TouchableOpacity
              key={cat.key}
              style={[styles.chip, ativa && styles.chipActive]}
              activeOpacity={0.8}
              delayPressIn={0}
              onPress={() => setSelectedCat(cat.key)}
            >
              <Text style={[styles.chipText, ativa && styles.chipTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.summaryCard}>
        <View style={styles.summaryLeft}>
          <Text style={styles.summaryPercent}>92%</Text>
          <Text style={styles.summarySubLabel}>área produtiva</Text>
        </View>

        <View style={styles.summaryRight}>
          <Text style={styles.summaryHa}>{haCultivadosTexto}</Text>
          <Text style={styles.summaryAlert}>
            {campoFiltro
              ? `${alertasCount} ${
                  alertasCount === 1 ? 'PARCELA REQUER' : 'PARCELAS REQUEREM'
                } ATENÇÃO`
              : '2 PARCELAS REQUEREM ATENÇÃO'}
          </Text>
        </View>
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>
          {ordenarPor === 'area'
            ? 'Por área'
            : ordenarPor === 'codigo'
            ? 'Por código'
            : 'Por campo'}
        </Text>

        <TouchableOpacity
          activeOpacity={0.75}
          delayPressIn={0}
          onPress={ciclarOrdenacao}
        >
          <Text style={styles.sortAction}>Ordenar</Text>
        </TouchableOpacity>
      </View>

      {parcelasVisiveis.map((parcela) => (
        <ParcelaCard
          key={parcela.id}
          parcela={parcela}
          onPress={(item) => onSelectParcela && onSelectParcela(item)}
          onQrPress={(item) =>
            onQrParcela
              ? onQrParcela(item)
              : onSelectParcela && onSelectParcela(item)
          }
          onEdit={(item) => onEditParcela && onEditParcela(item)}
          onDelete={(item) => onDeleteParcela && onDeleteParcela(item)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1, backgroundColor: '#F4F6F3' },
  container: { flexGrow: 1, padding: 20, paddingTop: 14, paddingBottom: 28, backgroundColor: '#F4F6F3' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  headerTextCol: { flex: 1, marginRight: 12 },
  title: { fontSize: 24, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 13, color: '#6B7871', marginTop: 2 },
  addBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E9E6', justifyContent: 'center', alignItems: 'center' },
  contextBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#DCE7DF', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12, gap: 8 },
  contextText: { fontSize: 13, fontWeight: '700', color: '#244735', flex: 1 },
  contextActions: { flexDirection: 'row', gap: 6 },
  contextBtn: { backgroundColor: '#FFFFFF', paddingHorizontal: 9, paddingVertical: 5, borderRadius: 10 },
  contextBtnText: { fontSize: 11, fontWeight: '700', color: '#244735' },
  chipsRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  chip: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E9E6' },
  chipActive: { backgroundColor: '#1B3B2B', borderColor: '#1B3B2B' },
  chipText: { fontSize: 13, fontWeight: '700', color: '#244735' },
  chipTextActive: { color: '#FFFFFF' },
  summaryCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1B3B2B', borderRadius: 22, paddingHorizontal: 20, paddingVertical: 18, marginBottom: 18 },
  summaryLeft: { justifyContent: 'center' },
  summaryPercent: { fontSize: 30, fontWeight: '800', color: '#FFFFFF', lineHeight: 34 },
  summarySubLabel: { fontSize: 12, color: '#C8D8CE', marginTop: 2 },
  summaryRight: { alignItems: 'flex-end' },
  summaryHa: { fontSize: 13, fontWeight: '700', color: '#E8EFEA' },
  summaryAlert: { fontSize: 11, fontWeight: '800', color: '#E59A4C', marginTop: 5, letterSpacing: 0.3 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1E2923' },
  sortAction: { fontSize: 14, fontWeight: '700', color: '#2D6A4F' },
});