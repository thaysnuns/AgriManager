// components/CamposScreen.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CampoDetalheScreen from './CampoDetalheScreen';

const CAMPOS_DATA = [
  {
    id: '1',
    nome: 'Olival Norte',
    detalhe: '42,8 ha · 4 parcelas',
    estado: 'Saudável',
    indicador: 'NDVI 0,82',
    tipo: 'ativo',
    iconName: 'pine-tree',
    iconBg: '#E3ECE6',
    iconColor: '#1B3B2B',
    indicadorColor: '#2D6A4F',
  },
  {
    id: '2',
    nome: 'Vinha do Poente',
    detalhe: '18,6 ha · 3 parcelas',
    estado: 'Atenção',
    indicador: 'Humidade baixa',
    tipo: 'atencao',
    iconName: 'fruit-grapes-outline',
    iconBg: '#F6E8D8',
    iconColor: '#C26D1F',
    indicadorColor: '#C26D1F',
  },
  {
    id: '3',
    nome: 'Cereal Sul',
    detalhe: '31,2 ha · 2 parcelas',
    estado: 'Saudável',
    indicador: 'NDVI 0,76',
    tipo: 'ativo',
    iconName: 'barley',
    iconBg: '#E3ECE6',
    iconColor: '#1B3B2B',
    indicadorColor: '#2D6A4F',
  },
];

const getIconByCultura = (cultura) => {
  const c = (cultura || '').toLowerCase();
  if (c.includes('vinha')) return 'fruit-grapes-outline';
  if (c.includes('cereal')) return 'barley';
  if (c.includes('horta') || c.includes('pomar')) return 'sprout-outline';
  return 'pine-tree';
};

export default function CamposScreen({ onOpenCriarCampo, novoCampo }) {
  const [campos, setCampos] = useState(CAMPOS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');
  const [selectedCampo, setSelectedCampo] = useState(null);

  useEffect(() => {
    if (!novoCampo) return;
    const criado = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      nome: novoCampo.nome,
      detalhe: `${novoCampo.areaFormatada} · 0 parcelas`,
      estado: 'Saudável',
      indicador: novoCampo.cultura,
      tipo: 'ativo',
      iconName: getIconByCultura(novoCampo.cultura),
      iconBg: '#E3ECE6',
      iconColor: '#1B3B2B',
      indicadorColor: '#2D6A4F',
    };
    setCampos((prev) => [criado, ...prev]);
  }, [novoCampo]);

  // Se um campo foi clicado, abre o ecrã de detalhe
  if (selectedCampo) {
    return (
      <CampoDetalheScreen
        campo={selectedCampo}
        onBack={() => setSelectedCampo(null)}
      />
    );
  }

  const camposFiltrados = campos.filter((campo) => {
    const matchesSearch = campo.nome.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'ativos') return matchesSearch && campo.tipo === 'ativo';
    if (activeFilter === 'atencao') return matchesSearch && campo.tipo === 'atencao';
    return matchesSearch;
  });

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Campos</Text>
          <Text style={styles.subtitle}>6 campos · 128,4 hectares</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={onOpenCriarCampo}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={24} color="#1E2923" />
        </TouchableOpacity>
      </View>

      {/* Barra de Pesquisa */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#7A8680" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar campo..."
          placeholderTextColor="#7A8680"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterIconButton}>
          <Ionicons name="options-outline" size={18} color="#1B3B2B" />
        </TouchableOpacity>
      </View>

      {/* Vista Aérea / Mapa dos Campos */}
      <View style={styles.mapCardWrapper}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
          }}
          style={styles.mapImage}
          imageStyle={{ borderRadius: 18 }}
        >
          <View style={styles.mapBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.mapBadgeText}>6 campos monitorizados</Text>
          </View>

          <TouchableOpacity style={styles.locateButton}>
            <Ionicons name="locate-outline" size={20} color="#1B3B2B" />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* Filtros */}
      <View style={styles.filtersRow}>
        <TouchableOpacity
          style={[styles.filterPill, activeFilter === 'todos' && styles.filterPillTodosActive]}
          onPress={() => setActiveFilter('todos')}
        >
          <Text style={[styles.filterText, activeFilter === 'todos' && styles.filterTextWhite]}>
            Todos 6
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterPill, activeFilter === 'ativos' && styles.filterPillTodosActive]}
          onPress={() => setActiveFilter('ativos')}
        >
          <Text style={[styles.filterText, activeFilter === 'ativos' && styles.filterTextWhite]}>
            Ativos 5
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterPill,
            styles.filterPillWarning,
            activeFilter === 'atencao' && styles.filterPillWarningActive,
          ]}
          onPress={() => setActiveFilter('atencao')}
        >
          <Text style={styles.filterTextWarning}>Atenção 1</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Cartões de Campos (Clicáveis) */}
      {camposFiltrados.map((campo) => (
        <TouchableOpacity
          key={campo.id}
          style={styles.campoCard}
          activeOpacity={0.8}
          onPress={() => setSelectedCampo(campo)}
        >
          <View style={[styles.culturaIconBox, { backgroundColor: campo.iconBg }]}>
            <MaterialCommunityIcons name={campo.iconName} size={24} color={campo.iconColor} />
          </View>

          <View style={styles.campoInfo}>
            <Text style={styles.campoNome}>{campo.nome}</Text>
            <Text style={styles.campoDetalhe}>{campo.detalhe}</Text>
          </View>

          <View style={styles.campoStatus}>
            <Text style={styles.estadoText}>{campo.estado}</Text>
            <Text style={[styles.indicadorText, { color: campo.indicadorColor }]}>
              {campo.indicador}
            </Text>
          </View>

          <View style={styles.actionsColumn}>
            <TouchableOpacity style={styles.editBtn} onPress={() => setSelectedCampo(campo)}>
              <Ionicons name="pencil" size={14} color="#1B3B2B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={14} color="#C26D1F" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 30,
    backgroundColor: '#F4F6F3',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7871',
    marginTop: 2,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E2923',
  },
  filterIconButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#E3ECE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCardWrapper: {
    marginBottom: 18,
    borderRadius: 18,
    overflow: 'hidden',
  },
  mapImage: {
    height: 175,
    width: '100%',
    justifyContent: 'space-between',
    padding: 12,
  },
  mapBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2D6A4F',
    marginRight: 6,
  },
  mapBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E2923',
  },
  locateButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  filtersRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  filterPillTodosActive: {
    backgroundColor: '#1B3B2B',
    borderColor: '#1B3B2B',
  },
  filterPillWarning: {
    backgroundColor: '#F6E8D8',
    borderColor: '#EED6BC',
  },
  filterPillWarningActive: {
    borderColor: '#C26D1F',
    borderWidth: 1.5,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5751',
  },
  filterTextWhite: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  filterTextWarning: {
    fontSize: 13,
    fontWeight: '700',
    color: '#C26D1F',
  },
  campoCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  culturaIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  campoInfo: {
    flex: 1,
  },
  campoNome: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2923',
  },
  campoDetalhe: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 3,
  },
  campoStatus: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  estadoText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E2923',
  },
  indicadorText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 3,
  },
  actionsColumn: {
    justifyContent: 'space-between',
    gap: 6,
  },
  editBtn: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#E3ECE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#F6E8D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});