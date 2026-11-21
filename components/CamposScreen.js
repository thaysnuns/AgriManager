import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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
    iconBg: '#E1ECE4',
    iconColor: '#2A6F4E',
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
    iconBg: '#F7E7D5',
    iconColor: '#B85D19',
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
    iconBg: '#E1ECE4',
    iconColor: '#2A6F4E',
    cultura: 'Trigo duro',
    zona: 'Planície Sul',
  },
  {
    id: 'campo-4',
    nome: 'Olival Nascente',
    area: 14.5,
    parcelasCount: 2,
    estado: 'Ativo',
    estadoTitulo: 'Saudável',
    detalheEstado: 'NDVI 0,79',
    alerta: false,
    tipoCultura: 'olival',
    iconBg: '#E1ECE4',
    iconColor: '#2A6F4E',
    cultura: 'Cobrançosa',
    zona: 'Setor Nascente',
  },
  {
    id: 'campo-5',
    nome: 'Horta do Vale',
    area: 6.4,
    parcelasCount: 2,
    estado: 'Ativo',
    estadoTitulo: 'Saudável',
    detalheEstado: 'Humidade 66%',
    alerta: false,
    tipoCultura: 'horta',
    iconBg: '#E1ECE4',
    iconColor: '#2A6F4E',
    cultura: 'Tomate indústria',
    zona: 'Vale Central',
  },
  {
    id: 'campo-6',
    nome: 'Montado da Ribeira',
    area: 14.9,
    parcelasCount: 3,
    estado: 'Ativo',
    estadoTitulo: 'Saudável',
    detalheEstado: 'NDVI 0,74',
    alerta: false,
    tipoCultura: 'olival',
    iconBg: '#E1ECE4',
    iconColor: '#2A6F4E',
    cultura: 'Pastagem & árvores',
    zona: 'Ribeira Sul',
  },
];

const IMAGEM_AEREA_CAMPOS = {
  uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
};

function formatarArea(area) {
  if (typeof area === 'number') {
    return `${area.toFixed(1).replace('.', ',')} ha`;
  }
  const num = parseFloat(String(area || '0').replace(',', '.'));
  return `${(Number.isNaN(num) ? 0 : num).toFixed(1).replace('.', ',')} ha`;
}

function renderIconeCultura(campo) {
  const tipo = campo?.tipoCultura || 'olival';
  const cor = campo?.iconColor || '#2A6F4E';

  if (tipo === 'vinha') {
    return <MaterialCommunityIcons name="grape" size={20} color={cor} />;
  }
  if (tipo === 'cereal') {
    return <MaterialCommunityIcons name="sprout" size={20} color={cor} />;
  }
  if (tipo === 'horta') {
    return <Ionicons name="leaf-outline" size={20} color={cor} />;
  }
  return <MaterialCommunityIcons name="pine-tree" size={20} color={cor} />;
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
    if (
      Array.isArray(camposData) &&
      camposData.length > 0 &&
      camposData !== CAMPOS_SCREEN_INICIAIS
    ) {
      const soma = listaBase.reduce((acc, item) => {
        const val =
          typeof item.area === 'number'
            ? item.area
            : parseFloat(String(item.area || '0').replace(',', '.'));
        return acc + (Number.isNaN(val) ? 0 : val);
      }, 0);
      return soma.toFixed(1).replace('.', ',');
    }
    return '128,4';
  }, [camposData, listaBase]);

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
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#8B9890" />
          <TextInput
            value={pesquisa}
            onChangeText={setPesquisa}
            placeholder="Pesquisar campo..."
            placeholderTextColor="#8B9890"
            style={styles.searchInput}
          />
          {pesquisa ? (
            <TouchableOpacity
              onPress={() => setPesquisa('')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close-circle" size={16} color="#8B9890" />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={() => {
            setFiltroEstado((prev) =>
              prev === 'Todos'
                ? 'Ativos'
                : prev === 'Ativos'
                  ? 'Atenção'
                  : 'Todos'
            );
          }}
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
          const isAlerta = campo.estado === 'Atencao' || Boolean(campo.alerta);
          const tituloEstado =
            campo.estadoTitulo || (isAlerta ? 'Atenção' : 'Saudável');
          const subEstado =
            campo.detalheEstado || (isAlerta ? 'Humidade baixa' : 'NDVI 0,78');
          const parcelas = campo.parcelasCount ?? 0;

          return (
            <View key={campo.id || campo.nome} style={styles.campoCard}>
              <TouchableOpacity
                style={styles.campoLeftPressable}
                activeOpacity={0.85}
                delayPressIn={0}
                onPress={() => onSelectCampo && onSelectCampo(campo)}
              >
                <View
                  style={[
                    styles.iconBox,
                    campo.iconBg ? { backgroundColor: campo.iconBg } : null,
                  ]}
                >
                  {renderIconeCultura(campo)}
                </View>

                <View style={styles.campoInfoCol}>
                  <Text numberOfLines={1} style={styles.campoTitle}>
                    {campo.nome}
                  </Text>
                  <Text numberOfLines={1} style={styles.campoSubtitle}>
                    {formatarArea(campo.area)} · {parcelas} parcelas
                  </Text>
                </View>

                <View style={styles.statusCol}>
                  <Text style={styles.statusTitle}>{tituloEstado}</Text>
                  <Text
                    style={[
                      styles.statusSub,
                      isAlerta ? styles.statusSubAlerta : styles.statusSubOk,
                    ]}
                  >
                    {subEstado}
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
                  <Ionicons name="pencil" size={14} color="#24593F" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  activeOpacity={0.8}
                  delayPressIn={0}
                  onPress={() => onDeleteCampo && onDeleteCampo(campo)}
                >
                  <Ionicons name="trash-outline" size={14} color="#B85D19" />
                </TouchableOpacity>
              </View>
            </View>
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
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#1E2923',
    paddingVertical: 0,
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
  campoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  campoLeftPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E1ECE4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  campoInfoCol: {
    flex: 1,
    marginRight: 8,
  },
  campoTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#1E2923',
  },
  campoSubtitle: {
    fontSize: 12,
    color: '#7A8680',
    marginTop: 2,
  },
  statusCol: {
    alignItems: 'flex-end',
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E2923',
  },
  statusSub: {
    fontSize: 11.5,
    fontWeight: '700',
    marginTop: 2,
  },
  statusSubOk: {
    color: '#2D7A4F',
  },
  statusSubAlerta: {
    color: '#B85D19',
  },
  actionsCol: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  editBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#E1ECE4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F7E7D5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});