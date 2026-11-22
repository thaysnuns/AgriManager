// components/AdminEmpresasScreen.js — "Empresas"
import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchFilterBar from '../ui/SearchFilterBar';
import FilterChips from '../ui/FilterChips';
import SectionHeader from '../ui/SectionHeader';

const TONS = {
  laranja: { bg: '#F6E8D8', cor: '#C26D1F' },
  verde: { bg: '#E3ECE6', cor: '#2D6A4F' },
  azul: { bg: '#DCE8EE', cor: '#2B6C8F' },
};

const EMPRESAS = [
  { id: 'e1', nome: 'Quinta do Vale', utilizadores: 12, campos: 6, area: 128, plano: 'Profissional', tom: 'laranja', estado: 'ativa' },
  { id: 'e2', nome: 'Herdade Nova', utilizadores: 28, campos: 11, area: 462, plano: 'Enterprise', tom: 'verde', estado: 'ativa' },
  { id: 'e3', nome: 'Agrosul Cooperativa', utilizadores: 46, campos: 18, area: 718, plano: 'Enterprise', tom: 'azul', estado: 'ativa' },
  { id: 'e4', nome: 'Monte Claro', utilizadores: 8, campos: 4, area: 96, plano: 'Profissional', tom: 'laranja', estado: 'teste' },
  { id: 'e5', nome: 'Terras de Moura', utilizadores: 17, campos: 9, area: 385, plano: 'Profissional', tom: 'verde', estado: 'teste' },
];

export default function AdminEmpresasScreen({ onAdicionar, onSelectEmpresa }) {
  const [pesquisa, setPesquisa] = useState('');
  const [filtro, setFiltro] = useState('todas');
  const [ordenarAZ, setOrdenarAZ] = useState(true);

  const visiveis = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();
    const lista = EMPRESAS.filter(
      (e) => (filtro === 'todas' || e.estado === filtro) && (!termo || e.nome.toLowerCase().includes(termo))
    );
    return ordenarAZ ? [...lista].sort((a, b) => a.nome.localeCompare(b.nome)) : lista;
  }, [pesquisa, filtro, ordenarAZ]);

  const alternarOrdem = useCallback(() => setOrdenarAZ((v) => !v), []);

  const chips = [
    { key: 'todas', label: 'Todas 24' },
    { key: 'ativa', label: 'Ativas 22' },
    { key: 'teste', label: 'Teste 2', variant: 'warning' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Empresas</Text>
          <Text style={styles.subtitle}>24 organizações na plataforma</Text>
        </View>
        <TouchableOpacity style={styles.roundBtn} onPress={onAdicionar} activeOpacity={0.8}>
          <Ionicons name="add" size={24} color="#1E2923" />
        </TouchableOpacity>
      </View>

      <SearchFilterBar value={pesquisa} onChangeText={setPesquisa} placeholder="Pesquisar empresa..." />

      <View style={styles.heroCard}>
        <View>
          <Text style={styles.heroLabel}>Área total gerida</Text>
          <Text style={styles.heroValue}>2 941 ha</Text>
        </View>
        <View style={styles.heroBox}>
          <Text style={styles.heroDelta}>+8,4%</Text>
          <Text style={styles.heroDeltaSub}>este trimestre</Text>
        </View>
      </View>

      <FilterChips items={chips} activeKey={filtro} onSelect={setFiltro} style={{ marginBottom: 18 }} />

      <SectionHeader title="Organizações" actionLabel={ordenarAZ ? 'A–Z' : 'Z–A'} onActionPress={alternarOrdem} />

      {visiveis.map((e) => (
        <TouchableOpacity key={e.id} style={styles.card} activeOpacity={0.85} onPress={() => onSelectEmpresa && onSelectEmpresa(e)}>
          <View style={[styles.icon, { backgroundColor: TONS[e.tom].bg }]}>
            <Ionicons name="business-outline" size={22} color={TONS[e.tom].cor} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nome}>{e.nome}</Text>
            <Text style={styles.sub}>
              {e.utilizadores} utilizadores · {e.campos} campos
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.area}>{e.area} ha</Text>
            <Text style={[styles.plano, { color: TONS[e.tom].cor }]}>{e.plano}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 16, paddingBottom: 30, backgroundColor: '#F4F6F3' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 13, color: '#6B7871', marginTop: 2 },
  roundBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E9E6', justifyContent: 'center', alignItems: 'center' },
  heroCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1B3B2B', borderRadius: 20, padding: 18, marginBottom: 14 },
  heroLabel: { fontSize: 12, color: '#B8C7BE', marginBottom: 6 },
  heroValue: { fontSize: 30, fontWeight: '800', color: '#FFFFFF' },
  heroBox: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, alignItems: 'center' },
  heroDelta: { fontSize: 16, fontWeight: '800', color: '#E09F3E' },
  heroDeltaSub: { fontSize: 11, color: '#B8C7BE', marginTop: 2 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5E9E6', padding: 14, marginBottom: 10 },
  icon: { width: 46, height: 46, borderRadius: 13, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  nome: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  sub: { fontSize: 12, color: '#6B7871', marginTop: 3 },
  area: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  plano: { fontSize: 11.5, fontWeight: '700', marginTop: 2 },
});
