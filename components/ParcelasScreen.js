// components/ParcelasScreen.js
import React, { useState, useEffect } from 'react';
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
    nome: 'ON-01 · Olival Norte',
    campo: 'Olival Norte',
    area: 12.4,
    cultura: 'Galega vulgar',
    subtitulo: '12,4 ha · Galega vulgar',
    humidade: '64%',
    categoria: 'olival',
    qrCode: 'ON01-2026',
    iconName: 'pine-tree',
  },
  {
    id: '2',
    codigo: 'ON-02',
    nome: 'ON-02 · Olival Norte',
    campo: 'Olival Norte',
    area: 10.8,
    cultura: 'Cobrançosa',
    subtitulo: '10,8 ha · Cobrançosa',
    humidade: '71%',
    categoria: 'olival',
    qrCode: 'ON02-2026',
    iconName: 'pine-tree',
  },
  {
    id: '3',
    codigo: 'VP-03',
    nome: 'VP-03 · Vinha do Poente',
    campo: 'Vinha do Poente',
    area: 6.2,
    cultura: 'Touriga Nacional',
    subtitulo: '6,2 ha · Touriga Nacional',
    humidade: '38%',
    categoria: 'vinha',
    qrCode: 'VP03-2026',
    iconName: 'fruit-grapes-outline',
  },
];

export default function ParcelasScreen({
  campo,
  onBack,
  onOpenCriarParcela,
  onEditParcela,
  novaParcela,
  parcelaEditada,
}) {
  const [parcelas, setParcelas] = useState(PARCELAS_DATA);
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    if (!novaParcela) return;
    const campoNome = novaParcela.campo || campo?.nome || 'Vinha do Poente';
    const criada = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      codigo: novaParcela.nome,
      nome: `${novaParcela.nome} · ${campoNome}`,
      campo: campoNome,
      area: novaParcela.area,
      cultura: novaParcela.cultura || 'Touriga Nacional',
      observacoes: novaParcela.observacoes || '',
      subtitulo: `${novaParcela.areaFormatada}${
        novaParcela.cultura ? ` · ${novaParcela.cultura}` : ''
      }`,
      humidade: '60%',
      categoria: campoNome.toLowerCase().includes('vinha')
        ? 'vinha'
        : campoNome.toLowerCase().includes('cereal')
        ? 'cereal'
        : 'olival',
      qrCode: novaParcela.qrCode || 'VP05-2026',
      iconName: campoNome.toLowerCase().includes('vinha')
        ? 'fruit-grapes-outline'
        : campoNome.toLowerCase().includes('cereal')
        ? 'barley'
        : 'pine-tree',
    };
    setParcelas((prev) => [criada, ...prev]);
  }, [novaParcela, campo]);

  useEffect(() => {
    if (!parcelaEditada) return;
    setParcelas((prev) =>
      prev.map((item) => {
        if (item.id !== parcelaEditada.id) return item;
        const campoNome = parcelaEditada.campo || item.campo;
        const nomeBase = parcelaEditada.nome.includes('·')
          ? parcelaEditada.nome.split('·')[0].trim()
          : parcelaEditada.nome;
        const areaStr =
          parcelaEditada.areaFormatada ||
          `${Number(parcelaEditada.area || 0).toLocaleString('pt-PT', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })} ha`;
        return {
          ...item,
          ...parcelaEditada,
          nome: `${nomeBase} · ${campoNome}`,
          campo: campoNome,
          subtitulo: `${areaStr}${
            parcelaEditada.cultura ? ` · ${parcelaEditada.cultura}` : ''
          }`,
        };
      })
    );
  }, [parcelaEditada]);

  const visiveis = parcelas.filter((p) => {
    if (filtro === 'todas') return true;
    return p.categoria === filtro;
  });

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho com botão + no canto superior direito */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>
        <View style={styles.headerTitleBox}>
          <Text style={styles.title}>Parcelas</Text>
          <Text style={styles.subtitle}>14 parcelas em 6 campos</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.8}
          onPress={() => onOpenCriarParcela && onOpenCriarParcela(campo?.nome)}
        >
          <Ionicons name="add" size={22} color="#1E2923" />
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <View style={styles.filtersRow}>
        {[
          { key: 'todas', label: 'Todas' },
          { key: 'olival', label: 'Olival' },
          { key: 'vinha', label: 'Vinha' },
          { key: 'cereal', label: 'Cereal' },
        ].map((f) => {
          const ativa = filtro === f.key;
          return (
            <TouchableOpacity
              key={f.key}
              style={[styles.filterPill, ativa && styles.filterPillActive]}
              onPress={() => setFiltro(f.key)}
            >
              <Text style={[styles.filterText, ativa && styles.filterTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Cartão Resumo */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryLeft}>
          <Text style={styles.summaryPercent}>92%</Text>
          <Text style={styles.summaryLabel}>área produtiva</Text>
        </View>
        <View style={styles.summaryRight}>
          <Text style={styles.summaryHa}>118,1 ha cultivados</Text>
          <Text style={styles.summaryAlert}>2 PARCELAS REQUEREM ATENÇÃO</Text>
        </View>
      </View>

      {/* Cabeçalho da Lista */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Por campo</Text>
        <Text style={styles.sortLink}>Ordenar</Text>
      </View>

      {/* Lista de Parcelas */}
      {visiveis.map((p) => {
        const nomeSemCampo = p.nome.includes('·')
          ? p.nome.split('·')[0].trim()
          : p.nome;

        return (
          <View key={p.id} style={styles.parcelaCard}>
            <View style={styles.parcelaIconBox}>
              <MaterialCommunityIcons name={p.iconName || 'pine-tree'} size={24} color="#1B3B2B" />
            </View>

            <View style={styles.parcelaMain}>
              <Text style={styles.parcelaNome}>{p.nome}</Text>
              <Text style={styles.parcelaSub}>{p.subtitulo}</Text>
            </View>

            <View style={styles.parcelaRight}>
              <Text style={styles.humidadeValor}>{p.humidade}</Text>
              <Text style={styles.humidadeLabel}>Humidade</Text>

              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.qrBtn}>
                  <MaterialCommunityIcons name="qrcode" size={16} color="#1E2923" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() =>
                    onEditParcela &&
                    onEditParcela({
                      ...p,
                      nome: nomeSemCampo,
                    })
                  }
                >
                  <Ionicons name="pencil" size={15} color="#1B3B2B" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteBtn}>
                  <Ionicons name="trash-outline" size={15} color="#C26D1F" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#F4F6F3',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8ECE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitleBox: {
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
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
    fontWeight: '700',
    color: '#1E2923',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B3B2B',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  summaryLeft: {},
  summaryPercent: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#C8D6CE',
    marginTop: 2,
  },
  summaryRight: {
    alignItems: 'flex-end',
  },
  summaryHa: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  summaryAlert: {
    fontSize: 11,
    fontWeight: '800',
    color: '#E59A4C',
    marginTop: 6,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E2923',
  },
  sortLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D6A4F',
  },
  parcelaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  parcelaIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#E3ECE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  parcelaMain: {
    flex: 1,
  },
  parcelaNome: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E2923',
  },
  parcelaSub: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 3,
  },
  parcelaRight: {
    alignItems: 'flex-end',
  },
  humidadeValor: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E2923',
  },
  humidadeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2D6A4F',
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  qrBtn: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: '#E3ECE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtn: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: '#E3ECE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: '#F6E8D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});