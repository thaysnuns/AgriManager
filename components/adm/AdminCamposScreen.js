// components/AdminCamposScreen.js — "Campos da rede"
import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SearchFilterBar from '../ui/SearchFilterBar';
import FilterChips from '../ui/FilterChips';
import SectionHeader from '../ui/SectionHeader';

const FOTO = {
  uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
};

const CAMPOS = [
  {
    id: 'k1', nome: 'Vinha do Poente', sub: 'Quinta do Vale · Évora · 18,6 ha', tipo: 'alerta',
    icone: { lib: 'mci', name: 'fruit-grapes-outline' }, iconBg: '#F6E8D8', iconColor: '#C26D1F',
    valor: '38%', nota: 'Humidade baixa', notaCor: '#C26D1F',
  },
  {
    id: 'k2', nome: 'Amendoal Este', sub: 'Herdade Nova · Beja · 34,2 ha', tipo: 'offline',
    icone: { lib: 'mci', name: 'wifi-off' }, iconBg: '#DCE8EE', iconColor: '#2B6C8F',
    valor: 'OFF', nota: 'Há 2 horas', notaCor: '#2B6C8F',
  },
  {
    id: 'k3', nome: 'Horta Central', sub: 'Agrosul · Serpa · 8,4 ha', tipo: 'alerta',
    icone: { lib: 'ion', name: 'warning-outline' }, iconBg: '#F6E8D8', iconColor: '#C26D1F',
    valor: '3', nota: 'Alertas ativos', notaCor: '#C26D1F',
  },
];

export default function AdminCamposScreen({ onSelectCampo, onExportar, onVerTodos }) {
  const [pesquisa, setPesquisa] = useState('');
  const [filtro, setFiltro] = useState('todos');

  const visiveis = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();
    return CAMPOS.filter(
      (c) =>
        (filtro === 'todos' || (filtro === 'alertas' && c.tipo === 'alerta') || (filtro === 'offline' && c.tipo === 'offline')) &&
        (!termo || `${c.nome} ${c.sub}`.toLowerCase().includes(termo))
    );
  }, [pesquisa, filtro]);

  const chips = [
    { key: 'todos', label: 'Todos 86' },
    { key: 'alertas', label: 'Alertas 7', variant: 'warning' },
    { key: 'offline', label: 'Offline 2', variant: 'danger' },
  ];

  const renderIcone = (i, cor) =>
    i.lib === 'mci' ? (
      <MaterialCommunityIcons name={i.name} size={22} color={cor} />
    ) : (
      <Ionicons name={i.name} size={22} color={cor} />
    );

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Campos da rede</Text>
          <Text style={styles.subtitle}>86 campos · 2 941 hectares</Text>
        </View>
        <TouchableOpacity style={styles.roundBtn} onPress={onExportar} activeOpacity={0.8}>
          <Ionicons name="download-outline" size={20} color="#1E2923" />
        </TouchableOpacity>
      </View>

      <SearchFilterBar value={pesquisa} onChangeText={setPesquisa} placeholder="Campo, empresa ou localidade..." />

      <ImageBackground source={FOTO} style={styles.map} imageStyle={{ borderRadius: 20 }}>
        <View style={styles.mapBadge}>
          <View style={styles.greenDot} />
          <Text style={styles.mapBadgeText}>84 operacionais · 2 offline</Text>
        </View>
        <TouchableOpacity style={styles.locateBtn} activeOpacity={0.85}>
          <Ionicons name="locate-outline" size={20} color="#1B3B2B" />
        </TouchableOpacity>
      </ImageBackground>

      <FilterChips items={chips} activeKey={filtro} onSelect={setFiltro} style={{ marginBottom: 18 }} />

      <SectionHeader title="Requerem atenção" actionLabel="Ver todos" onActionPress={onVerTodos} />

      {visiveis.map((c) => (
        <TouchableOpacity key={c.id} style={styles.card} activeOpacity={0.85} onPress={() => onSelectCampo && onSelectCampo(c)}>
          <View style={[styles.icon, { backgroundColor: c.iconBg }]}>{renderIcone(c.icone, c.iconColor)}</View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nome}>{c.nome}</Text>
            <Text style={styles.sub}>{c.sub}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.valor}>{c.valor}</Text>
            <Text style={[styles.nota, { color: c.notaCor }]}>{c.nota}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.coberturaCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.coberturaTitulo}>Cobertura de monitorização</Text>
          <Text style={styles.coberturaSub}>2 804 ha com dados nas últimas 24 h</Text>
        </View>
        <Text style={styles.coberturaValor}>95%</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 16, paddingBottom: 30, backgroundColor: '#F4F6F3' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 13, color: '#6B7871', marginTop: 2 },
  roundBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E9E6', justifyContent: 'center', alignItems: 'center' },
  map: { height: 195, borderRadius: 20, overflow: 'hidden', justifyContent: 'space-between', padding: 12, marginBottom: 14 },
  mapBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.94)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 18 },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2D6A4F', marginRight: 7 },
  mapBadgeText: { fontSize: 12, fontWeight: '700', color: '#1E2923' },
  locateBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5E9E6', padding: 14, marginBottom: 10 },
  icon: { width: 46, height: 46, borderRadius: 13, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  nome: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  sub: { fontSize: 12, color: '#6B7871', marginTop: 3 },
  valor: { fontSize: 18, fontWeight: '800', color: '#1E2923' },
  nota: { fontSize: 11.5, fontWeight: '700', marginTop: 2 },
  coberturaCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5E9E6', padding: 16, marginTop: 4 },
  coberturaTitulo: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  coberturaSub: { fontSize: 12, color: '#6B7871', marginTop: 3 },
  coberturaValor: { fontSize: 26, fontWeight: '800', color: '#2D6A4F', marginLeft: 10 },
});
