// components/AdminUtilizadoresScreen.js — "Utilizadores"
import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchFilterBar from '../ui/SearchFilterBar';
import FilterChips from '../ui/FilterChips';
import SectionHeader from '../ui/SectionHeader';
import PrimaryButton from '../ui/PrimaryButton';
import MiniStat from '../ui/MiniStat';

const COR_ESTADO = { ATIVA: '#2D6A4F', 'EM SERVIÇO': '#2B6C8F', PENDENTE: '#C26D1F' };
const AVATAR = {
  verde: { bg: '#DCE7DF', cor: '#2D6A4F' },
  azul: { bg: '#DCE8EE', cor: '#2B6C8F' },
  laranja: { bg: '#F6E8D8', cor: '#C26D1F' },
};

const UTILIZADORES = [
  { id: 'u1', nome: 'Maria Costa', iniciais: 'MC', perfil: 'agricultor', funcao: 'Agricultora · Quinta do Vale', estado: 'ATIVA', tom: 'verde' },
  { id: 'u2', nome: 'João Silva', iniciais: 'JS', perfil: 'operador', funcao: 'Operador · Quinta do Vale', estado: 'EM SERVIÇO', tom: 'azul' },
  { id: 'u3', nome: 'Ana Santos', iniciais: 'AS', perfil: 'operador', funcao: 'Operadora · Herdade Nova', estado: 'ATIVA', tom: 'azul' },
  { id: 'u4', nome: 'Rui Martins', iniciais: 'RM', perfil: 'agricultor', funcao: 'Agricultor · Monte Claro', estado: 'PENDENTE', tom: 'laranja' },
  { id: 'u5', nome: 'Carla Lopes', iniciais: 'CL', perfil: 'administrador', funcao: 'Administradora · Agrosul', estado: 'ATIVA', tom: 'laranja' },
];

export default function AdminUtilizadoresScreen({ onConvidar, onSelectUtilizador }) {
  const [pesquisa, setPesquisa] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const [ordenarAZ, setOrdenarAZ] = useState(false);

  const visiveis = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();
    const lista = UTILIZADORES.filter((u) => {
      const okFiltro = filtro === 'todos' || (filtro === 'agricultores' && u.perfil === 'agricultor') || (filtro === 'operadores' && u.perfil === 'operador');
      const okTexto = !termo || `${u.nome} ${u.funcao}`.toLowerCase().includes(termo);
      return okFiltro && okTexto;
    });
    return ordenarAZ ? [...lista].sort((a, b) => a.nome.localeCompare(b.nome)) : lista;
  }, [pesquisa, filtro, ordenarAZ]);

  const alternarOrdem = useCallback(() => setOrdenarAZ((v) => !v), []);

  const chips = [
    { key: 'todos', label: 'Todos 186' },
    { key: 'agricultores', label: 'Agricultores 42' },
    { key: 'operadores', label: 'Operadores 128' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Utilizadores</Text>
          <Text style={styles.subtitle}>186 pessoas · 162 ativas</Text>
        </View>
        <TouchableOpacity style={styles.roundBtn} onPress={onConvidar} activeOpacity={0.8}>
          <Ionicons name="person-add-outline" size={20} color="#1E2923" />
        </TouchableOpacity>
      </View>

      <SearchFilterBar value={pesquisa} onChangeText={setPesquisa} placeholder="Nome, email ou empresa..." />

      <FilterChips items={chips} activeKey={filtro} onSelect={setFiltro} style={{ marginBottom: 14 }} />

      <View style={styles.statsRow}>
        <MiniStat value="162" label="Ativos" />
        <MiniStat value="8" label="Pendentes" valueColor="#C26D1F" />
        <MiniStat value="16" label="Inativos" />
      </View>

      <SectionHeader title="Utilizadores recentes" actionLabel="Ordenar" onActionPress={alternarOrdem} />

      {visiveis.map((u) => (
        <TouchableOpacity key={u.id} style={styles.userCard} activeOpacity={0.85} onPress={() => onSelectUtilizador && onSelectUtilizador(u)}>
          <View style={[styles.avatar, { backgroundColor: AVATAR[u.tom].bg }]}>
            <Text style={[styles.avatarText, { color: AVATAR[u.tom].cor }]}>{u.iniciais}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{u.nome}</Text>
            <Text style={styles.userSub}>{u.funcao}</Text>
          </View>
          <Text style={[styles.userEstado, { color: COR_ESTADO[u.estado] }]}>{u.estado}</Text>
        </TouchableOpacity>
      ))}

      <View style={{ alignSelf: 'flex-start', marginTop: 6 }}>
        <PrimaryButton title="Convidar utilizador" iconName="person-add-outline" onPress={onConvidar} />
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
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5E9E6', padding: 14, marginBottom: 10 },
  avatar: { width: 46, height: 46, borderRadius: 23, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { fontSize: 14, fontWeight: '800' },
  userName: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  userSub: { fontSize: 12, color: '#6B7871', marginTop: 3 },
  userEstado: { fontSize: 11, fontWeight: '800', marginLeft: 8 },
});
