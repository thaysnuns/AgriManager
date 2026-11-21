import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from './ui/SearchBar';
import CamposCard from './ui/CamposCard';

export const CAMPOS_SCREEN_INICIAIS = [
  {
    id: 'campo-1',
    nome: 'Olival Norte',
    area: 42.8,
    parcelasCount: 4,
    estado: 'Ativo',
    estadoTitulo: 'Saudável',
    detalheEstado: 'NDVI 0,82',
    alerta: false,
    tipoCultura: 'olival',
    cultura: 'Oliveira Galega',
    zona: 'Setor Norte',
  },
  {
    id: 'campo-2',
    nome: 'Vinha do Poente',
    area: 18.6,
    parcelasCount: 3,
    estado: 'Atencao',
    estadoTitulo: 'Atenção',
    detalheEstado: 'Humidade baixa',
    alerta: true,
    tipoCultura: 'vinha',
    cultura: 'Touriga Nacional',
    zona: 'Encosta Poente',
  },
  {
    id: 'campo-3',
    nome: 'Cereal Sul',
    area: 31.2,
    parcelasCount: 2,
    estado: 'Ativo',
    estadoTitulo: 'Saudável',
    detalheEstado: 'NDVI 0,75',
    alerta: false,
    tipoCultura: 'cereal',
    cultura: 'Trigo duro',
    zona: 'Planície Sul',
  },
];

const IMAGEM_AEREA_CAMPOS = {
  uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
};

function getCampoIconConfig(campo) {
  const nome = (campo?.nome || '').toLowerCase();
  const tipo = campo?.tipoCultura || '';

  if (tipo === 'vinha' || nome.includes('vinha')) {
    return {
      boxStyle: { backgroundColor: '#F7E7D5' },
      element: <MaterialCommunityIcons name="grape" size={20} color="#B85D19" />,
    };
  }

  if (tipo === 'cereal' || nome.includes('cereal')) {
    return {
      boxStyle: { backgroundColor: '#E1ECE4' },
      element: <MaterialCommunityIcons name="sprout" size={20} color="#2A6F4E" />,
    };
  }

  return {
    boxStyle: { backgroundColor: '#E1ECE4' },
    element: <MaterialCommunityIcons name="pine-tree" size={20} color="#2A6F4E" />,
  };
}

export default function CamposScreen({
  camposData,
  onSelectCampo,
  onOpenCriarCampo,
  onEditCampo,
  onDeleteCampo,
}) {
  const listaBase =
    Array.isArray(camposData) && camposData.length > 0
      ? camposData
      : CAMPOS_SCREEN_INICIAIS;

  const [pesquisa, setPesquisa] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [focoMapa, setFocoMapa] = useState(false);

  const totalCount = listaBase.length;
  const ativosCount = useMemo(
    () => listaBase.filter((c) => c.estado !== 'Atencao' && !c.alerta).length,
    [listaBase]
  );
  const atencaoCount = useMemo(
    () => listaBase.filter((c) => c.estado === 'Atencao' || c.alerta).length,
    [listaBase]
  );

  const areaTotalTexto = useMemo(() => {
    const soma = listaBase.reduce((acc, item) => {
      const val =
        typeof item.area === 'number'
          ? item.area
          : parseFloat(String(item.area || '0').replace(',', '.'));
      return acc + (Number.isNaN(val) ? 0 : val);
    }, 0);
    return soma.toFixed(1).replace('.', ',');
  }, [listaBase]);

  const camposFiltrados = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();
    return listaBase.filter((campo) => {
      const isAtencao = campo.estado === 'Atencao' || Boolean(campo.alerta);
      if (filtroEstado === 'Ativos' && isAtencao) return false;
      if (filtroEstado === 'Atenção' && !isAtencao) return false;

      if (!termo) return true;
      const alvo = `${campo.nome || ''} ${campo.cultura || ''} ${campo.zona || ''}`.toLowerCase();
      return alvo.includes(termo);
    });
  }, [listaBase, pesquisa, filtroEstado]);

  const handleCiclarFiltro = () => {
    setFiltroEstado((prev) =>
      prev === 'Todos' ? 'Ativos' : prev === 'Ativos' ? 'Atenção' : 'Todos'
    );
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Campos</Text>
          <Text style={styles.subtitle}>
            {totalCount} campos · {areaTotalTexto} hectares
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={() => onOpenCriarCampo && onOpenCriarCampo()}
        >
          <Ionicons name="add" size={22} color="#1E2923" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBarFlex}>
          <SearchBar
            value={pesquisa}
            onChangeText={setPesquisa}
            onChange={setPesquisa}
            onSearch={setPesquisa}
            placeholder="Pesquisar campo..."
          />
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={handleCiclarFiltro}
        >
          <Ionicons name="options-outline" size={18} color="#24593F" />
        </TouchableOpacity>
      </View>

      <View style={styles.mapCard}>
        <Image
          source={IMAGEM_AEREA_CAMPOS}
          style={styles.mapImage}
          resizeMode="cover"
        />

        <View style={styles.monitorBadge}>
          <View style={styles.monitorDot} />
          <Text style={styles.monitorBadgeText}>
            {focoMapa
              ? 'Vista centrada na exploração'
              : `${totalCount} campos monitorizados`}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.locateBtn}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={() => setFocoMapa((prev) => !prev)}
        >
          <Ionicons name="locate-outline" size={18} color="#1E2923" />
        </TouchableOpacity>
      </View>

      <View style={styles.chipsRow}>
        <TouchableOpacity
          style={[
            styles.chip,
            filtroEstado === 'Todos' ? styles.chipTodosActive : styles.chipWhite,
          ]}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={() => setFiltroEstado('Todos')}
        >
          <Text
            style={[
              styles.chipText,
              filtroEstado === 'Todos'
                ? styles.chipTodosTextActive
                : styles.chipWhiteText,
            ]}
          >
            Todos {totalCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chip,
            filtroEstado === 'Ativos'
              ? styles.chipAtivosActive
              : styles.chipWhite,
          ]}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={() => setFiltroEstado('Ativos')}
        >
          <Text
            style={[
              styles.chipText,
              filtroEstado === 'Ativos'
                ? styles.chipAtivosTextActive
                : styles.chipWhiteText,
            ]}
          >
            Ativos {ativosCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chip,
            filtroEstado === 'Atenção'
              ? styles.chipAtencaoActive
              : styles.chipAtencaoSoft,
          ]}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={() => setFiltroEstado('Atenção')}
        >
          <Text style={styles.chipAtencaoText}>Atenção {atencaoCount}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listSection}>
        {camposFiltrados.map((campo) => {
          const iconConfig = getCampoIconConfig(campo);

          return (
            <CamposCard
              key={campo.id || campo.nome}
              campo={campo}
              icon={iconConfig.element}
              iconBoxStyle={iconConfig.boxStyle}
              onPress={(item) => onSelectCampo && onSelectCampo(item)}
              onEdit={(item) => onEditCampo && onEditCampo(item)}
              onDelete={(item) => onDeleteCampo && onDeleteCampo(item)}
            />
          );
        })}
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
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 28,
    backgroundColor: '#F4F6F3',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7871',
    marginTop: 2,
  },
  addBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E9EDE9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  searchBarFlex: {
    flex: 1,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#E1ECE4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCard: {
    width: '100%',
    height: 178,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#DCE5DE',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  monitorBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  monitorDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2D7A4F',
  },
  monitorBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E2923',
  },
  locateBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderWidth: 1,
  },
  chipTodosActive: {
    backgroundColor: '#1B3B2B',
    borderColor: '#1B3B2B',
  },
  chipAtivosActive: {
    backgroundColor: '#24593F',
    borderColor: '#24593F',
  },
  chipWhite: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E9E6',
  },
  chipAtencaoSoft: {
    backgroundColor: '#F7E7D5',
    borderColor: '#F0D7B8',
  },
  chipAtencaoActive: {
    backgroundColor: '#B85D19',
    borderColor: '#B85D19',
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  chipTodosTextActive: {
    color: '#FFFFFF',
  },
  chipAtivosTextActive: {
    color: '#FFFFFF',
  },
  chipWhiteText: {
    color: '#1E2923',
  },
  chipAtencaoText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#B85D19',
  },
  listSection: {
    gap: 10,
  },
});