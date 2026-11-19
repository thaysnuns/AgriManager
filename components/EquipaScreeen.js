// components/EquipaScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const MEMBROS_INICIAIS = [
  {
    id: '1',
    nome: 'João Silva',
    cargo: 'Operador de Rega',
    area: 'Olival Norte · Setor 4',
    permissao: 'Operador',
    estado: 'Ativo',
    iniciais: 'JS',
  },
  {
    id: '2',
    nome: 'Ana Santos',
    cargo: 'Técnica Fitossanitária',
    area: 'Vinha VP-03',
    permissao: 'Operador',
    estado: 'Ativo',
    iniciais: 'AS',
  },
  {
    id: '3',
    nome: 'Rui Mendes',
    cargo: 'Operador de Campo',
    area: 'Cereal Sul',
    permissao: 'Operador',
    estado: 'Convite pendente',
    iniciais: 'RM',
  },
];

const PERMISSOES = ['Operador', 'Gestor de Campo', 'Leitura'];

export default function EquipaScreen({ onBack }) {
  const [membros, setMembros] = useState(MEMBROS_INICIAIS);
  const [filtro, setFiltro] = useState('Todos'); // 'Todos' | 'Ativo' | 'Convite pendente'
  const [modalVisible, setModalVisible] = useState(false);

  // Estado do formulário para criar/convidar operador
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('Operador de Campo');
  const [area, setArea] = useState('Quinta do Vale');
  const [permissao, setPermissao] = useState('Operador');
  const [erroForm, setErroForm] = useState('');

  const ativosCount = membros.filter((m) => m.estado === 'Ativo').length;
  const convitesCount = membros.filter((m) => m.estado !== 'Ativo').length;

  const membrosFiltrados = membros.filter((m) => {
    if (filtro === 'Todos') return true;
    return m.estado === filtro;
  });

  const gerarIniciais = (texto) => {
    const partes = texto.trim().split(/\s+/).filter(Boolean);
    if (partes.length === 0) return 'OP';
    if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  };

  const handleCriarOperador = () => {
    if (!nome.trim()) {
      setErroForm('Indica o nome do operador.');
      return;
    }

    const novoMembro = {
      id: String(Date.now()),
      nome: nome.trim(),
      cargo: cargo.trim() || 'Operador de Campo',
      area: area.trim() || 'Quinta do Vale',
      permissao,
      estado: 'Convite pendente',
      iniciais: gerarIniciais(nome),
    };

    setMembros((prev) => [novoMembro, ...prev]);
    setNome('');
    setCargo('Operador de Campo');
    setArea('Quinta do Vale');
    setPermissao('Operador');
    setErroForm('');
    setModalVisible(false);
  };

  const handleCicloPermissao = (id) => {
    setMembros((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const idx = PERMISSOES.indexOf(m.permissao);
        const proxima = PERMISSOES[(idx + 1) % PERMISSOES.length];
        return { ...m, permissao: proxima };
      })
    );
  };

  const handleAceitarConvite = (id) => {
    setMembros((prev) =>
      prev.map((m) => (m.id === id ? { ...m, estado: 'Ativo' } : m))
    );
  };

  return (
    <View style={styles.screenWrapper}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho com botão Voltar e Criar Operador */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Ionicons name="arrow-back" size={20} color="#1E2923" />
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>Equipa e permissões</Text>
              <Text style={styles.subtitle}>Quinta do Vale · Évora</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setErroForm('');
              setModalVisible(true);
            }}
          >
            <Ionicons name="person-add-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Resumo de Operadores e Convites */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{ativosCount}</Text>
            <Text style={styles.summaryLabel}>Operadores ativos</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, { color: '#C26D1F' }]}>{convitesCount}</Text>
            <Text style={styles.summaryLabel}>Convites pendentes</Text>
          </View>
        </View>

        {/* Botão de Destaque para Criar Operador */}
        <TouchableOpacity
          style={styles.createBanner}
          onPress={() => {
            setErroForm('');
            setModalVisible(true);
          }}
          activeOpacity={0.85}
        >
          <View style={styles.createBannerIcon}>
            <Ionicons name="add" size={22} color="#1B3B2B" />
          </View>
          <View style={styles.createBannerInfo}>
            <Text style={styles.createBannerTitle}>Adicionar novo operador</Text>
            <Text style={styles.createBannerSub}>Definir função, setor e nível de acesso</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#1B3B2B" />
        </TouchableOpacity>

        {/* Filtros */}
        <View style={styles.filterRow}>
          {['Todos', 'Ativo', 'Convite pendente'].map((item) => {
            const active = filtro === item;
            const label = item === 'Convite pendente' ? 'Convites' : item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => setFiltro(item)}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Lista de Operadores */}
        <Text style={styles.sectionTitle}>Operadores ({membrosFiltrados.length})</Text>

        {membrosFiltrados.map((membro) => {
          const isAtivo = membro.estado === 'Ativo';
          return (
            <View key={membro.id} style={styles.memberCard}>
              <View style={[styles.avatar, !isAtivo && styles.avatarPending]}>
                <Text style={[styles.avatarText, !isAtivo && styles.avatarTextPending]}>
                  {membro.iniciais}
                </Text>
              </View>

              <View style={styles.memberInfo}>
                <View style={styles.memberTopLine}>
                  <Text style={styles.memberName}>{membro.nome}</Text>
                  <View style={[styles.statusBadge, isAtivo ? styles.badgeAtivo : styles.badgePendente]}>
                    <Text style={[styles.statusText, isAtivo ? styles.textAtivo : styles.textPendente]}>
                      {membro.estado}
                    </Text>
                  </View>
                </View>

                <Text style={styles.memberRole}>{membro.cargo}</Text>
                <Text style={styles.memberArea}>{membro.area}</Text>

                <View style={styles.memberActions}>
                  <TouchableOpacity
                    style={styles.permButton}
                    onPress={() => handleCicloPermissao(membro.id)}
                  >
                    <MaterialCommunityIcons name="shield-account-outline" size={15} color="#1B3B2B" />
                    <Text style={styles.permButtonText}>Permissão: {membro.permissao}</Text>
                  </TouchableOpacity>

                  {!isAtivo && (
                    <TouchableOpacity
                      style={styles.activateButton}
                      onPress={() => handleAceitarConvite(membro.id)}
                    >
                      <Text style={styles.activateButtonText}>Ativar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Modal para Criar Operador */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo operador</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#1E2923" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Nome completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Carlos Ferreira"
              placeholderTextColor="#94A3B8"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.inputLabel}>Função na exploração</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Operador de Trator / Rega"
              placeholderTextColor="#94A3B8"
              value={cargo}
              onChangeText={setCargo}
            />

            <Text style={styles.inputLabel}>Campo ou setor atribuído</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Olival Norte · Setor 2"
              placeholderTextColor="#94A3B8"
              value={area}
              onChangeText={setArea}
            />

            <Text style={styles.inputLabel}>Nível de permissão</Text>
            <View style={styles.permSelectRow}>
              {PERMISSOES.map((p) => {
                const selected = permissao === p;
                return (
                  <TouchableOpacity
                    key={p}
                    style={[styles.permOption, selected && styles.permOptionActive]}
                    onPress={() => setPermissao(p)}
                  >
                    <Text style={[styles.permOptionText, selected && styles.permOptionTextActive]}>
                      {p}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {erroForm ? <Text style={styles.errorText}>{erroForm}</Text> : null}

            <TouchableOpacity style={styles.submitButton} onPress={handleCriarOperador}>
              <Text style={styles.submitButtonText}>Criar operador</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#F4F6F3',
  },
  container: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 2,
  },
  addButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1B3B2B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1B3B2B',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 2,
  },
  createBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3ECE6',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#C8DBD0',
  },
  createBannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  createBannerInfo: {
    flex: 1,
  },
  createBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1B3B2B',
  },
  createBannerSub: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  filterChipActive: {
    backgroundColor: '#1B3B2B',
    borderColor: '#1B3B2B',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7871',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2923',
    marginBottom: 12,
  },
  memberCard: {
    flexDirection: 'row',
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
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#1B3B2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarPending: {
    backgroundColor: '#F8ECE0',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  avatarTextPending: {
    color: '#C26D1F',
  },
  memberInfo: {
    flex: 1,
  },
  memberTopLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2923',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeAtivo: {
    backgroundColor: '#DCE8E0',
  },
  badgePendente: {
    backgroundColor: '#F8ECE0',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  textAtivo: {
    color: '#2D6A4F',
  },
  textPendente: {
    color: '#C26D1F',
  },
  memberRole: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginTop: 2,
  },
  memberArea: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 2,
  },
  memberActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  permButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F4F6F3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  permButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1B3B2B',
  },
  activateButton: {
    backgroundColor: '#1B3B2B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  activateButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E2923',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#F4F6F3',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#1E2923',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  permSelectRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  permOption: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: '#F4F6F3',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  permOptionActive: {
    backgroundColor: '#1B3B2B',
    borderColor: '#1B3B2B',
  },
  permOptionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  permOptionTextActive: {
    color: '#FFFFFF',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#1B3B2B',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});