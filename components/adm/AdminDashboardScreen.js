// components/AdminDashboardScreen.js — "Painel administrativo"
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from '../ui/StatCard';
import SectionHeader from '../ui/SectionHeader';

const ATIVIDADE = [
  { dia: 'S', valor: 38 },
  { dia: 'T', valor: 52 },
  { dia: 'Q', valor: 46 },
  { dia: 'Q', valor: 68 },
  { dia: 'S', valor: 74 },
  { dia: 'S', valor: 82 },
  { dia: 'D', valor: 76 },
];

const ESTADO_REDE = [
  { id: 'c', icon: 'map-outline', cor: '#2D6A4F', bg: '#DCE7DF', titulo: 'Campos monitorizados', sub: '86 campos · 2 941 hectares', valor: '84', nota: 'Operacionais', notaCor: '#2D6A4F' },
  { id: 'a', icon: 'warning-outline', cor: '#C26D1F', bg: '#F6E8D8', titulo: 'Alertas abertos', sub: '4 críticos · 11 moderados', valor: '15', nota: '-6 desde ontem', notaCor: '#C26D1F' },
  { id: 's', icon: 'wifi-outline', cor: '#2B6C8F', bg: '#DCE8EE', titulo: 'Sensores ligados', sub: '472 dispositivos na rede', valor: '96%', nota: 'Disponibilidade', notaCor: '#2B6C8F' },
];

const ALTURA_MAX = 110;

export default function AdminDashboardScreen({ iniciais = 'MC', onVerRelatorio, onSelectEstado, onOpenPerfil }) {
  const maximo = useMemo(() => Math.max(...ATIVIDADE.map((a) => a.valor)), []);

  const [estadoSelecionado, setEstadoSelecionado] = useState(null);

  const handleEstadoPress = (id) => {
    setEstadoSelecionado(estadoSelecionado === id ? null : id);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Painel administrativo</Text>
          <Text style={styles.subtitle}>Rede AgriManager · setembro 2026</Text>
        </View>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => onOpenPerfil && onOpenPerfil()}
          activeOpacity={0.85}
        >
          <Text style={styles.avatarText}>{iniciais}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <StatCard iconName="business-outline" iconColor="#C26D1F" iconBg="#F6E8D8" value="24" label="Empresas" note="+3 este mês" noteColor="#C26D1F" />
        <StatCard iconName="people-outline" iconColor="#2D6A4F" iconBg="#DCE7DF" value="186" label="Utilizadores" note="162 ativos" noteColor="#2D6A4F" />
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartTop}>
          <Text style={styles.chartTitle}>Atividade operacional</Text>
          <Text style={styles.chartDelta}>+12,8%</Text>
        </View>
        <Text style={styles.chartSub}>Tarefas concluídas · últimos 7 dias</Text>

        <View style={styles.bars}>
          {ATIVIDADE.map((a, i) => (
            <View key={`${a.dia}-${i}`} style={styles.barCol}>
              <View
                style={[
                  styles.bar,
                  { height: (a.valor / maximo) * ALTURA_MAX },
                  i === ATIVIDADE.length - 1 && styles.barDestaque,
                ]}
              />
              <Text style={styles.barLabel}>{a.dia}</Text>
            </View>
          ))}
        </View>
      </View>

      <SectionHeader title="Estado da rede" actionLabel="Ver relatório" onActionPress={onVerRelatorio} />

      {ESTADO_REDE.map((e) => (
        <View key={e.id} style={styles.rowCard}>
          <View style={[styles.rowIcon, { backgroundColor: e.bg }]}>
            <Ionicons name={e.icon} size={22} color={e.cor} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>{e.titulo}</Text>
            <Text style={styles.rowSub}>{e.sub}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.rowValue}>{e.valor}</Text>
            <Text style={[styles.rowNote, { color: e.notaCor }]}>{e.nota}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 16, paddingBottom: 30, backgroundColor: '#F4F6F3' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 13, color: '#6B7871', marginTop: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#DCE7DF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 14, fontWeight: '800', color: '#244735' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  chartCard: { backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 1, borderColor: '#E5E9E6', padding: 16, marginBottom: 20 },
  chartTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chartTitle: { fontSize: 16, fontWeight: '800', color: '#1E2923' },
  chartDelta: { fontSize: 14, fontWeight: '800', color: '#2D6A4F' },
  chartSub: { fontSize: 12, color: '#6B7871', marginTop: 3, marginBottom: 14 },
  bars: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10, height: ALTURA_MAX + 26 },
  barCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  bar: { width: '100%', borderRadius: 10, backgroundColor: '#DCE7DF' },
  barDestaque: { backgroundColor: '#DE9E48' },
  barLabel: { fontSize: 11, color: '#6B7871', marginTop: 8 },
  rowCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5E9E6', padding: 14, marginBottom: 10 },
  rowIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  rowTitle: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  rowSub: { fontSize: 12, color: '#6B7871', marginTop: 3 },
  rowValue: { fontSize: 18, fontWeight: '800', color: '#1E2923' },
  rowNote: { fontSize: 11.5, fontWeight: '700', marginTop: 2 },
});
