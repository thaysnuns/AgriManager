// components/PerfilScreen.js
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OperadoresScreen from './OperadoresScreen';
import RegistarOperadorScreen from './RegistarOperadorScreen';
import TarefasScreen from './TarefasScreen';

const OPERADORES_INICIAIS = [
  { id: '1', nome: 'João Silva', email: 'joao@quintadovale.pt' },
  { id: '2', nome: 'Sofia Santos', email: 'sofia@quintadovale.pt' },
  { id: '3', nome: 'Pedro Ferreira', email: 'pedro@quintadovale.pt' },
  { id: '4', nome: 'Rita Almeida', email: 'rita@quintadovale.pt' },
  { id: '5', nome: 'Miguel Rocha', email: 'miguel@quintadovale.pt' },
  { id: '6', nome: 'Ana Santos', email: 'ana@quintadovale.pt' },
  { id: '7', nome: 'Rui Pereira', email: 'rui@quintadovale.pt' },
  { id: '8', nome: 'Inês Carvalho', email: 'ines@quintadovale.pt' },
  { id: '9', nome: 'Tiago Lopes', email: 'tiago@quintadovale.pt' },
  { id: '10', nome: 'Marta Gomes', email: 'marta@quintadovale.pt' },
  { id: '11', nome: 'Carlos Mendes', email: 'carlos@quintadovale.pt' },
];

function LinhaMenu({ icon, titulo, subtitulo, onPress }) {
  return (
    <TouchableOpacity style={styles.menuCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuIconBox}>
        <Ionicons name={icon} size={20} color="#1B3B2B" />
      </View>
      <View style={styles.menuInfo}>
        <Text style={styles.menuTitle}>{titulo}</Text>
        <Text style={styles.menuSub}>{subtitulo}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#7A8680" />
    </TouchableOpacity>
  );
}

export default function PerfilScreen({ onLogout, user }) {
  const nomeCompleto = user?.nomeCompleto || 'Maria Costa';
  const empresa = user?.empresa || 'Quinta do Vale';
  const role = user?.role || 'agricultor';
  const iniciais = nomeCompleto
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();

  const [tela, setTela] = useState('perfil'); // 'perfil' | 'operadores' | 'registar' | 'tarefas'
  const [operadores, setOperadores] = useState(OPERADORES_INICIAIS);
  const [novoOperador, setNovoOperador] = useState(null);

  const irParaPerfil = useCallback(() => setTela('perfil'), []);
  const irParaOperadores = useCallback(() => setTela('operadores'), []);
  const irParaRegistar = useCallback(() => setTela('registar'), []);
  const irParaTarefas = useCallback(() => setTela('tarefas'), []);
  const registar = useCallback((novo) => {
    setOperadores((atual) => [...atual, { id: String(Date.now()), ...novo }]);
    setNovoOperador(novo);
    setTela('operadores');
  }, []);

  if (tela === 'operadores') {
    return (
      <OperadoresScreen
        onBack={irParaPerfil}
        onAddOperador={irParaRegistar}
        novoOperador={novoOperador}
      />
    );
  }
  if (tela === 'registar') {
    return <RegistarOperadorScreen onBack={irParaOperadores} onRegistarOperador={registar} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.subtitle}>Conta e exploração</Text>
        </View>
        <TouchableOpacity style={styles.roundButton}>
          <Ionicons name="settings-outline" size={20} color="#1E2923" />
        </TouchableOpacity>
      </View>

      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{iniciais}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{nomeCompleto}</Text>
          <Text style={styles.userRole}>{role}</Text>
          <Text style={styles.userFarm}>{empresa}</Text>
        </View>
        <Ionicons name="qr-code-outline" size={24} color="#DCE7DF" />
      </View>

      <View style={styles.planCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.planTitle}>Plano Profissional</Text>
          <Text style={styles.planSub}>Renova a 14 out. 2026</Text>
        </View>
        <View style={styles.activeBadge}>
          <Text style={styles.activeBadgeText}>ATIVO</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Exploração</Text>
      <LinhaMenu icon="business-outline" titulo="Quinta do Vale" subtitulo="Évora · 128,4 ha" />
      <LinhaMenu
        icon="people-outline"
        titulo={'Equipa e\npermissões'}
        subtitulo={`${operadores.length + 1} utilizadores · 3 convites`}
        onPress={irParaOperadores}
      /> 

      <Text style={styles.sectionTitle}>Preferências</Text>
      <LinhaMenu icon="notifications-outline" titulo="Notificações" subtitulo="Alertas críticos e tarefas" />

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
  roundButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B3B2B',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    gap: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F6E8D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 20, fontWeight: '800', color: '#C26D1F' },
  userName: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  userRole: { fontSize: 12, color: '#DCE7DF', marginTop: 2 },
  userFarm: { fontSize: 12, fontWeight: '700', color: '#E09F3E', marginTop: 2 },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6E8D8',
    borderRadius: 16,
    padding: 14,
    marginBottom: 22,
  },
  planTitle: { fontSize: 14, fontWeight: '700', color: '#1E2923' },
  planSub: { fontSize: 12, color: '#6B7871', marginTop: 2 },
  activeBadge: { backgroundColor: '#DCE7DF', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 5 },
  activeBadgeText: { fontSize: 11, fontWeight: '800', color: '#2D6A4F', letterSpacing: 0.3 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1E2923', marginBottom: 12 },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  menuIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#E3ECE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuInfo: { flex: 1 },
  menuTitle: { fontSize: 15, fontWeight: '700', color: '#1E2923' },
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