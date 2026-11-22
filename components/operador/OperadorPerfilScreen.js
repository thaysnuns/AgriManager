// components/OperadorPerfilScreen.js — "Perfil · Conta de operador"
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MiniStat from '../ui/MiniStat'; 

const TRABALHO = [
  { id: 'h', icon: 'calendar-outline', titulo: 'Horário e disponibilidade', sub: 'Seg–Sex · 07:00–16:00' },
  { id: 'e', icon: 'people-outline', titulo: 'Equipa Campo A', sub: '6 membros · Carlos Mendes' },
  { id: 'c', icon: 'ribbon-outline', titulo: 'Certificações', sub: 'Aplicador · Tratorista · Segurança' },
];
const APLICACAO = [
  { id: 'n', icon: 'notifications-outline', titulo: 'Notificações', sub: 'Tarefas e alertas da equipa' },
];

function LinhaMenu({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.menuCard} onPress={() => onPress && onPress(item)} activeOpacity={0.8}>
      <View style={styles.menuIcon}>
        <Ionicons name={item.icon} size={22} color="#1B3B2B" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.menuTitle}>{item.titulo}</Text>
        <Text style={styles.menuSub}>{item.sub}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#6B7871" />
    </TouchableOpacity>
  );
}

export default function OperadorPerfilScreen({ onItemPress, onSettings, user, onLogout }) {
  const nome = user?.nomeCompleto || 'João Silva';
  const email = user?.email || 'joao@quintadovale.pt';
  const iniciais = nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.subtitle}>Conta de operador</Text>
        </View>
        <TouchableOpacity style={styles.roundBtn} onPress={onSettings} activeOpacity={0.8}>
          <Ionicons name="settings-outline" size={22} color="#1E2923" />
        </TouchableOpacity>
      </View>

      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{iniciais}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{nome}</Text>
          <Text style={styles.userRole}>Operador de campo</Text>
          <Text style={styles.userTeam}>{email}</Text>
        </View>
        <Ionicons name="shield-checkmark-outline" size={26} color="#8DB6C6" />
      </View>

      <View style={styles.statsRow}>
        <MiniStat value="26" label="Concluídas" />
        <MiniStat value="96%" label="No prazo" />
        <MiniStat value="4,8" label="Avaliação" />
      </View>

      <Text style={styles.sectionTitle}>Trabalho</Text>
      {TRABALHO.map((i) => (
        <LinhaMenu key={i.id} item={i} onPress={onItemPress} />
      ))}

      <Text style={styles.sectionTitle}>Aplicação</Text>
      {APLICACAO.map((i) => (
        <LinhaMenu key={i.id} item={i} onPress={onItemPress} />
      ))}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={onLogout}
        activeOpacity={0.85}
      >
        <Ionicons name="log-out-outline" size={20} color="#B42318" />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 16, paddingBottom: 30, backgroundColor: '#F4F6F3' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  title: { fontSize: 26, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 13, color: '#6B7871', marginTop: 2 },
  roundBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E9E6', justifyContent: 'center', alignItems: 'center' },
  userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#27505F', borderRadius: 22, padding: 18, marginBottom: 14, gap: 14 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#DCE8EE', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, fontWeight: '800', color: '#27505F' },
  userName: { fontSize: 19, fontWeight: '800', color: '#FFFFFF' },
  userRole: { fontSize: 12, color: '#C4D8E0', marginTop: 2 },
  userTeam: { fontSize: 12, fontWeight: '700', color: '#8FD0E8', marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1E2923', marginBottom: 12 },
  menuCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5E9E6', paddingVertical: 24, paddingHorizontal: 16, marginBottom: 12 },
  menuIcon: { width: 46, height: 46, borderRadius: 14, backgroundColor: '#E3ECE6', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  menuTitle: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  menuSub: { fontSize: 12, color: '#6B7871', marginTop: 3 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1C4C0',
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: '#B42318' },
});
