// components/OperadoresScreen.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export const OPERADORES_INICIAIS = [
  { id: '1', iniciais: 'JS', nome: 'João Silva', email: 'joao@quintadovale.pt', estado: 'Ativo' },
  { id: '2', iniciais: 'SS', nome: 'Sofia Santos', email: 'sofia@quintadovale.pt', estado: 'Ativo' },
  { id: '3', iniciais: 'PF', nome: 'Pedro Ferreira', email: 'pedro@quintadovale.pt', estado: 'Ativo' },
  { id: '4', iniciais: 'RA', nome: 'Rita Almeida', email: 'rita@quintadovale.pt', estado: 'Ativo' },
  { id: '5', iniciais: 'MC', nome: 'Miguel Costa', email: 'miguel@quintadovale.pt', estado: 'Ativo' },
  { id: '6', iniciais: 'CL', nome: 'Carla Lopes', email: 'carla@quintadovale.pt', estado: 'Ativo' },
  { id: '7', iniciais: 'TR', nome: 'Tiago Rodrigues', email: 'tiago@quintadovale.pt', estado: 'Ativo' },
  { id: '8', iniciais: 'BM', nome: 'Beatriz Martins', email: 'beatriz@quintadovale.pt', estado: 'Ativo' },
  { id: '9', iniciais: 'DS', nome: 'Diogo Sousa', email: 'diogo@quintadovale.pt', estado: 'Ativo' },
  { id: '10', iniciais: 'IN', nome: 'Inês Neves', email: 'ines@quintadovale.pt', estado: 'Ativo' },
  { id: '11', iniciais: 'LP', nome: 'Luís Pereira', email: 'luis@quintadovale.pt', estado: 'Ativo' },
];

const CONVITES_INICIAIS = [
  { id: 'c1', iniciais: 'RM', nome: 'Rui Mendes', email: 'rui@quintadovale.pt', estado: 'Pendente' },
  { id: 'c2', iniciais: 'AS', nome: 'Ana Silva', email: 'ana.silva@quintadovale.pt', estado: 'Pendente' },
  { id: 'c3', iniciais: 'NC', nome: 'Nuno Carvalho', email: 'nuno@quintadovale.pt', estado: 'Pendente' },
];

export default function OperadoresScreen({ onBack, onAddOperador, novoOperador }) {
  const [operadores, setOperadores] = useState(OPERADORES_INICIAIS);
  const [convites] = useState(CONVITES_INICIAIS);
  const [abaAtiva, setAbaAtiva] = useState('operadores');
  const [pesquisa, setPesquisa] = useState('');
  const [pagina, setPagina] = useState(1);

  const itensPorPagina = 4;

  useEffect(() => {
    if (!novoOperador) return;
    const partes = novoOperador.nome.trim().split(/\s+/).filter(Boolean);
    const iniciais =
      partes.length === 0
        ? 'OP'
        : partes.length === 1
        ? partes[0].slice(0, 2).toUpperCase()
        : (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();

    const criado = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      iniciais,
      nome: novoOperador.nome.trim(),
      email: novoOperador.email.trim().toLowerCase(),
      estado: 'Ativo',
    };

    setOperadores((prev) => [criado, ...prev]);
    setAbaAtiva('operadores');
    setPagina(1);
  }, [novoOperador]);

  const listaAtual = abaAtiva === 'operadores' ? operadores : convites;
  const listaFiltrada = listaAtual.filter(
    (item) =>
      item.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      item.email.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const totalItens = listaFiltrada.length;
  const totalPaginas = Math.max(1, Math.ceil(totalItens / itensPorPagina));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const inicioIdx = (paginaSegura - 1) * itensPorPagina;
  const fimIdx = Math.min(inicioIdx + itensPorPagina, totalItens);
  const itensPaginados = listaFiltrada.slice(inicioIdx, fimIdx);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color="#1E2923" />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Operadores</Text>
            <Text style={styles.subtitle}>Perfil · Equipa e permissões</Text>
          </View>
        </View>

        <View style={styles.farmCard}>
          <View style={styles.farmIconBox}>
            <MaterialCommunityIcons name="office-building-outline" size={22} color="#1B3B2B" />
          </View>
          <View>
            <Text style={styles.farmTitle}>Quinta do Vale</Text>
            <Text style={styles.farmSub}>
              {operadores.length} operadores · {convites.length} convites
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addBannerButton}
          onPress={onAddOperador}
          activeOpacity={0.85}
        >
          <Ionicons name="person-add-outline" size={20} color="#FFFFFF" />
          <Text style={styles.addBannerText}>Adicionar operador</Text>
        </TouchableOpacity>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={19} color="#6B7871" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar por nome ou e-mail"
            placeholderTextColor="#7C8A82"
            value={pesquisa}
            onChangeText={(text) => {
              setPesquisa(text);
              setPagina(1);
            }}
          />
        </View>

        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabPill, abaAtiva === 'operadores' && styles.tabPillActive]}
            onPress={() => {
              setAbaAtiva('operadores');
              setPagina(1);
            }}
          >
            <Text style={[styles.tabText, abaAtiva === 'operadores' && styles.tabTextActive]}>
              Operadores {operadores.length}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabPill, abaAtiva === 'convites' && styles.tabPillActive]}
            onPress={() => {
              setAbaAtiva('convites');
              setPagina(1);
            }}
          >
            <Text style={[styles.tabText, abaAtiva === 'convites' && styles.tabTextActive]}>
              Convites {convites.length}
            </Text>
          </TouchableOpacity>
        </View>

        {itensPaginados.map((item) => {
          const isAtivo = item.estado === 'Ativo';
          return (
            <View key={item.id} style={styles.userCard}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{item.iniciais}</Text>
              </View>

              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.nome}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
              </View>

              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: isAtivo ? '#2D6A4F' : '#C26D1F' },
                  ]}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: isAtivo ? '#2D6A4F' : '#C26D1F' },
                  ]}
                >
                  {item.estado}
                </Text>
              </View>
            </View>
          );
        })}

        <View style={styles.paginationRow}>
          <Text style={styles.paginationText}>
            {totalItens === 0
              ? '0 operadores'
              : `${inicioIdx + 1}–${fimIdx} de ${totalItens} ${
                  abaAtiva === 'operadores' ? 'operadores' : 'convites'
                }`}
          </Text>

          <View style={styles.paginationButtons}>
            <TouchableOpacity
              style={[styles.pageBtn, paginaSegura <= 1 && styles.pageBtnDisabled]}
              disabled={paginaSegura <= 1}
              onPress={() => setPagina((p) => Math.max(1, p - 1))}
            >
              <Ionicons
                name="chevron-back"
                size={18}
                color={paginaSegura <= 1 ? '#B8C2BC' : '#1E2923'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.pageBtn, paginaSegura >= totalPaginas && styles.pageBtnDisabled]}
              disabled={paginaSegura >= totalPaginas}
              onPress={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            >
              <Ionicons
                name="chevron-forward"
                size={18}
                color={paginaSegura >= totalPaginas ? '#B8C2BC' : '#1E2923'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F4F6F3',
  },
  container: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 18,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7871',
    marginTop: 2,
  },
  farmCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B3B2B',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  farmIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#DCE6DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  farmTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  farmSub: {
    fontSize: 12,
    color: '#C7D6CD',
    marginTop: 3,
  },
  addBannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#2B533E',
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 14,
  },
  addBannerText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: '#E5E9E6',
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#1E2923',
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  tabPill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  tabPillActive: {
    backgroundColor: '#1B3B2B',
    borderColor: '#1B3B2B',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCE8E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1B3B2B',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2923',
  },
  userEmail: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  paginationText: {
    fontSize: 12,
    color: '#6B7871',
  },
  paginationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  pageBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  pageBtnDisabled: {
    backgroundColor: '#F4F6F3',
  },
});