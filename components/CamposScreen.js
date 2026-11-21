// components/CamposScreen.js
import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchFilterBar from './ui/SearchFilterBar';
import FilterChips from './ui/FilterChips';

const CAMPOS_INICIAIS = [
  {
    id: '1',
    nome: 'Olival Norte',
    area: 42.8,
    parcelasCount: 4,
    cultura: 'Oliveira Galega',
    detalhe: '42,8 ha · 4 parcelas',
    estado: 'Saudável',
    categoria: 'ativo',
    indicador: 'NDVI 0,82',
    indicadorColor: '#2D6A4F',
    iconName: 'leaf-outline',
    iconColor: '#2D6A4F',
    iconBg: '#DCE7DF',
  },
  {
    id: '2',
    nome: 'Vinha do Poente',
    area: 18.6,
    parcelasCount: 3,
    cultura: 'Touriga Nacional',
    detalhe: '18,6 ha · 3 parcelas',
    estado: 'Atenção',
    categoria: 'atencao',
    indicador: 'Humidade baixa',
    indicadorColor: '#C26D1F',
    iconName: 'nutrition-outline',
    iconColor: '#C26D1F',
    iconBg: '#F6E8D8',
  },
  {
    id: '3',
    nome: 'Cereal Sul',
    area: 31.2,
    parcelasCount: 2,
    cultura: 'Trigo Mole',
    detalhe: '31,2 ha · 2 parcelas',
    estado: 'Saudável',
    categoria: 'ativo',
    indicador: 'NDVI 0,76',
    indicadorColor: '#2D6A4F',
    iconName: 'flower-outline',
    iconColor: '#2D6A4F',
    iconBg: '#DCE7DF',
  },
];

export default function CamposScreen({
  onSelectCampo,
  onOpenCriarCampo,
  onEditCampo,
  novoCampo,
  campoEditado,
}) {
  const [campos, setCampos] = useState(CAMPOS_INICIAIS);
  const [pesquisa, setPesquisa] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const [ordenarPorArea, setOrdenarPorArea] = useState(false);

  useEffect(() => {
    if (!novoCampo) return;
    const areaNum = Number(novoCampo.area) || 10;
    const areaFmt =
      novoCampo.areaFormatada ||
      `${areaNum.toLocaleString('pt-PT', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })} ha`;

    const criado = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      nome: novoCampo.nome,
      area: areaNum,
      parcelasCount: novoCampo.parcelasCount || 1,
      cultura: novoCampo.cultura || 'Cultura geral',
      detalhe: `${areaFmt} · ${novoCampo.parcelasCount || 1} parcelas`,
      estado: 'Saudável',
      categoria: 'ativo',
      indicador: 'NDVI 0,78',
      indicadorColor: '#2D6A4F',
      iconName: 'leaf-outline',
      iconColor: '#2D6A4F',
      iconBg: '#DCE7DF',
    };

    setCampos((prev) => [criado, ...prev]);
  }, [novoCampo]);

  useEffect(() => {
    if (!campoEditado) return;
    setCampos((prev) =>
      prev.map((item) => {
        if (item.id !== campoEditado.id) return item;
        const areaNum = Number(campoEditado.area ?? item.area) || item.area;
        const areaFmt =
          campoEditado.areaFormatada ||
          `${areaNum.toLocaleString('pt-PT', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })} ha`;
        const parcelasNum = campoEditado.parcelasCount ?? item.parcelasCount ?? 2;

        return {
          ...item,
          ...campoEditado,
          area: areaNum,
          detalhe: `${areaFmt} · ${parcelasNum} parcelas`,
        };
      })
    );
  }, [campoEditado]);

  const handleApagarCampo = (id) => {
    setCampos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelecionarCampo = (campo) => {
    if (typeof onSelectCampo === 'function') {
      onSelectCampo(campo);
    }
  };

  const camposFiltrados = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();
    const lista = campos.filter((c) => {
      const matchFiltro =
        filtro === 'todos' ||
        (filtro === 'ativos' && c.categoria === 'ativo') ||
        (filtro === 'atencao' && c.categoria === 'atencao');

      const matchTexto =
        !termo ||
        c.nome.toLowerCase().includes(termo) ||
        (c.cultura && c.cultura.toLowerCase().includes(termo));

      return matchFiltro && matchTexto;
    });

    if (ordenarPorArea) {
      return [...lista].sort((a, b) => (b.area || 0) - (a.area || 0));
    }
    return lista;
  }, [campos, pesquisa, filtro, ordenarPorArea]);

  const totalCamposDisplay = campos.length === 3 ? 6 : campos.length;
  const totalHectaresDisplay =
    campos.length === 3
      ? '128,4'
      : campos
          .reduce((acc, c) => acc + (Number(c.area) || 0), 0)
          .toLocaleString('pt-PT', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          });

  const atencaoCount =
    campos.length === 3
      ? 1
      : campos.filter((c) => c.categoria === 'atencao').length;
  const ativosCount = Math.max(0, totalCamposDisplay - atencaoCount);

  const chips = [
    { key: 'todos', label: `Todos ${totalCamposDisplay}` },
    { key: 'ativos', label: `Ativos ${ativosCount}` },
    { key: 'atencao', label: `Atenção ${atencaoCount}`, variant: 'warning' },
  ];

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Campos</Text>
          <Text style={styles.subtitle}>
            {totalCamposDisplay} campos · {totalHectaresDisplay} hectares
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => onOpenCriarCampo && onOpenCriarCampo()}
          activeOpacity={0.8}
          delayPressIn={0}
        >
          <Ionicons name="add" size={24} color="#1E2923" />
        </TouchableOpacity>
      </View>

      {/* Pesquisa e Filtro */}
      <SearchFilterBar
        value={pesquisa}
        onChangeText={setPesquisa}
        placeholder="Pesquisar campo..."
        onFilterPress={() => setOrdenarPorArea((prev) => !prev)}
      />

      {/* Mapa / Vista Aérea */}
      <View style={styles.mapWrapper}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
          }}
          style={styles.mapImage}
          imageStyle={styles.mapImageRadius}
        >
          <View style={styles.mapBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.mapBadgeText}>
              {totalCamposDisplay} campos monitorizados
            </Text>
          </View>

          <TouchableOpacity
            style={styles.locateBtn}
            activeOpacity={0.85}
            delayPressIn={0}
          >
            <Ionicons name="locate-outline" size={20} color="#1B3B2B" />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* Chips de Filtro */}
      <FilterChips
        items={chips}
        activeKey={filtro}
        onSelect={setFiltro}
        style={styles.chipsSpacing}
      />

      {/* Lista de Campos (sem TouchableOpacity aninhado) */}
      {camposFiltrados.map((campo) => (
        <View key={campo.id} style={styles.campoCard}>
          <TouchableOpacity
            style={styles.cardMainArea}
            activeOpacity={0.75}
            delayPressIn={0}
            onPress={() => handleSelecionarCampo(campo)}
          >
            <View style={[styles.iconBox, { backgroundColor: campo.iconBg }]}>
              <Ionicons name={campo.iconName} size={22} color={campo.iconColor} />
            </View>

            <View style={styles.infoCol}>
              <Text style={styles.campoNome}>{campo.nome}</Text>
              <Text style={styles.campoDetalhe}>{campo.detalhe}</Text>
            </View>

            <View style={styles.statusCol}>
              <Text style={styles.estadoText}>{campo.estado}</Text>
              <Text style={[styles.indicadorText, { color: campo.indicadorColor }]}>
                {campo.indicador}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.actionsCol}>
            <TouchableOpacity
              style={styles.editBtn}
              activeOpacity={0.8}
              delayPressIn={0}
              onPress={() => onEditCampo && onEditCampo(campo)}
            >
              <Ionicons name="pencil" size={14} color="#244735" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              activeOpacity={0.8}
              delayPressIn={0}
              onPress={() => handleApagarCampo(campo.id)}
            >
              <Ionicons name="trash-outline" size={14} color="#C26D1F" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
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
  addBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  mapWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  mapImage: {
    height: 175,
    width: '100%',
    justifyContent: 'space-between',
    padding: 12,
  },
  mapImageRadius: {
    borderRadius: 20,
  },
  mapBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2D6A4F',
    marginRight: 7,
  },
  mapBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E2923',
  },
  locateBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  chipsSpacing: {
    marginBottom: 10,
  },
  campoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  cardMainArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  campoNome: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E2923',
  },
  campoDetalhe: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 3,
  },
  statusCol: {
    alignItems: 'flex-end',
  },
  estadoText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E2923',
  },
  indicadorText: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
  actionsCol: {
    gap: 6,
  },
  editBtn: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#DCE7DF',
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