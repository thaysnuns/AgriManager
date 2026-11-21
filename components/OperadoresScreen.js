// components/OperadoresScreen.js
import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from './ui/SearchBar';
import OperadorCard from './ui/OperadorCard';

const OPERADORES_INICIAIS = [
  { id: 'op-1', nome: 'João Silva', email: 'joao@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-2', nome: 'Sofia Santos', email: 'sofia@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-3', nome: 'Pedro Ferreira', email: 'pedro@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-4', nome: 'Rita Almeida', email: 'rita@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-5', nome: 'Tiago Costa', email: 'tiago@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-6', nome: 'Beatriz Nunes', email: 'beatriz@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-7', nome: 'Carlos Rocha', email: 'carlos@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-8', nome: 'Inês Carvalho', email: 'ines@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-9', nome: 'Miguel Pinto', email: 'miguel@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-10', nome: 'Helena Sousa', email: 'helena@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-11', nome: 'André Martins', email: 'andre@quintadovale.pt', estado: 'Ativo' },
];

const CONVITES_INICIAIS = [
  { id: 'cv-1', nome: 'Luís Gomes', email: 'luis.gomes@quintadovale.pt', estado: 'Pendente' },
  { id: 'cv-2', nome: 'Mariana Dias', email: 'mariana.dias@quintadovale.pt', estado: 'Pendente' },
  { id: 'cv-3', nome: 'Diogo Teixeira', email: 'diogo.teixeira@quintadovale.pt', estado: 'Pendente' },
];

const POR_PAGINA = 4;

export default function OperadoresScreen({
  quintaNome = 'Quinta do Vale',
  operadoresData = OPERADORES_INICIAIS,
  convitesData = CONVITES_INICIAIS,
  totalOperadoresCount,
  totalConvitesCount,
  onBack,
  onSelectOperador,
  onOpenAdicionarOperador,
}) {
  const [abaAtiva, setAbaAtiva] = useState('operadores'); // 'operadores' | 'convites'
  const [pesquisa, setPesquisa] = useState('');
  const [pagina, setPagina] = useState(1);

  const countOperadores = totalOperadoresCount ?? operadoresData.length;
  const countConvites = totalConvitesCount ?? convitesData.length;

  useEffect(() => {
    setPagina(1);
  }, [abaAtiva, pesquisa]);

  const listaBase = abaAtiva === 'operadores' ? operadoresData : convitesData;

  const listaFiltrada = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();
    if (!termo) return listaBase;
    return listaBase.filter(
      (item) =>
        (item.nome || '').toLowerCase().includes(termo) ||
        (item.email || '').toLowerCase().includes(termo)
    );
  }, [listaBase, pesquisa]);

  const totalItens = listaFiltrada.length;
  const totalPaginas = Math.max(1, Math.ceil(totalItens / POR_PAGINA));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const inicioIdx = (paginaSegura - 1) * POR_PAGINA;
  const itensPagina = listaFiltrada.slice(inicioIdx, inicioIdx + POR_PAGINA);

  const fimIdx = Math.min(inicioIdx + itensPagina.length, totalItens);
  const labelUnidade = abaAtiva === 'operadores' ? 'operadores' : 'convites';
  const resumoPaginacao =
    totalItens === 0
      ? `0 ${labelUnidade}`
      : `${inicioIdx + 1}–${fimIdx} de ${totalItens} ${labelUnidade}`;

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.8}
          delayPressIn={0}
          onPress={() => onBack && onBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>

        <View style={styles.headerTextCol}>
          <Text style={styles.title}>Operadores</Text>
          <Text style={styles.subtitle}>Perfil · Equipa e permissões</Text>
        </View>
      </View>

      {/* Cartão Verde Escuro da Quinta */}
      <View style={styles.quintaCard}>
        <View style={styles.quintaIconBox}>
          <Ionicons name="business-outline" size={22} color="#24593F" />
        </View>
        <View style={styles.quintaInfoCol}>
          <Text numberOfLines={1} style={styles.quintaTitle}>
            {quintaNome}
          </Text>
          <Text numberOfLines={1} style={styles.quintaSub}>
            {countOperadores} operadores · {countConvites} convites
          </Text>
        </View>
      </View>

      {/* Botão Adicionar operador */}
      <TouchableOpacity
        style={styles.addOperadorBtn}
        activeOpacity={0.86}
        delayPressIn={0}
        onPress={() => onOpenAdicionarOperador && onOpenAdicionarOperador()}
      >
        <Ionicons name="person-add-outline" size={18} color="#FFFFFF" />
        <Text style={styles.addOperadorText}>Adicionar operador</Text>
      </TouchableOpacity>

      {/* Barra de pesquisa reutilizável */}
      <SearchBar
        value={pesquisa}
        onChangeText={setPesquisa}
        placeholder="Pesquisar por nome ou e-mail"
        style={styles.searchSpacing}
      />

      {/* Chips de filtro */}
      <View style={styles.chipsRow}>
        <TouchableOpacity
          style={[
            styles.chip,
            abaAtiva === 'operadores' && styles.chipActive,
          ]}
          activeOpacity={0.8}
          delayPressIn={0}
          onPress={() => setAbaAtiva('operadores')}
        >
          <Text
            style={[
              styles.chipText,
              abaAtiva === 'operadores' && styles.chipTextActive,
            ]}
          >
            Operadores {countOperadores}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chip,
            abaAtiva === 'convites' && styles.chipActive,
          ]}
          activeOpacity={0.8}
          delayPressIn={0}
          onPress={() => setAbaAtiva('convites')}
        >
          <Text
            style={[
              styles.chipText,
              abaAtiva === 'convites' && styles.chipTextActive,
            ]}
          >
            Convites {countConvites}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de OperadorCard */}
      {itensPagina.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            Nenhum registo encontrado para &ldquo;{pesquisa.trim()}&rdquo;.
          </Text>
        </View>
      ) : (
        itensPagina.map((operador) => (
          <OperadorCard
            key={operador.id}
            operador={operador}
            onPress={(item) => onSelectOperador && onSelectOperador(item)}
          />
        ))
      )}

      {/* Rodapé de paginação */}
      <View style={styles.paginationRow}>
        <Text style={styles.paginationText}>{resumoPaginacao}</Text>

        <View style={styles.paginationBtns}>
          <TouchableOpacity
            style={[
              styles.pageBtn,
              paginaSegura <= 1 && styles.pageBtnDisabled,
            ]}
            activeOpacity={0.8}
            delayPressIn={0}
            disabled={paginaSegura <= 1}
            onPress={() => setPagina((prev) => Math.max(1, prev - 1))}
          >
            <Ionicons
              name="chevron-back"
              size={16}
              color={paginaSegura <= 1 ? '#B6C0BA' : '#1E2923'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.pageBtn,
              paginaSegura >= totalPaginas && styles.pageBtnDisabled,
            ]}
            activeOpacity={0.8}
            delayPressIn={0}
            disabled={paginaSegura >= totalPaginas}
            onPress={() =>
              setPagina((prev) => Math.min(totalPaginas, prev + 1))
            }
          >
            <Ionicons
              name="chevron-forward"
              size={16}
              color={paginaSegura >= totalPaginas ? '#B6C0BA' : '#1E2923'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F4F6F3',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 14,
    paddingBottom: 28,
    backgroundColor: '#F4F6F3',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 12.5,
    color: '#6B7871',
    marginTop: 2,
  },
  quintaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B3B2B',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  quintaIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#DCE8E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  quintaInfoCol: {
    flex: 1,
  },
  quintaTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  quintaSub: {
    fontSize: 12.5,
    color: '#C8D8CE',
    marginTop: 2,
  },
  addOperadorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#244735',
    borderRadius: 16,
    paddingVertical: 13,
    marginBottom: 12,
  },
  addOperadorText: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  searchSpacing: {
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  chipActive: {
    backgroundColor: '#1B3B2B',
    borderColor: '#1B3B2B',
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#244735',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 13.5,
    color: '#6B7871',
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 2,
  },
  paginationText: {
    fontSize: 12.5,
    color: '#6B7871',
  },
  paginationBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pageBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageBtnDisabled: {
    backgroundColor: '#F7F9F7',
    borderColor: '#ECEFEA',
  },
});