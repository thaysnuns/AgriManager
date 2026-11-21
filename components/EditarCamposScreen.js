import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthInput from './ui/AuthInput';
import PrimaryButton from './ui/PrimaryButton';

const OPCOES_CULTURA = [
  'Oliveira Galega',
  'Olival Tradicional',
  'Vinha',
  'Cereal',
  'Horta',
];

function formatarAreaInicial(area) {
  if (typeof area === 'number') {
    return String(area).replace('.', ',');
  }
  if (typeof area === 'string' && area.trim().length > 0) {
    return area.replace('.', ',');
  }
  return '';
}

export default function EditarCamposScreen({
  campo,
  onBack,
  onGuardarAlteracoes,
}) {
  const [nome, setNome] = useState(campo?.nome || '');
  const [area, setArea] = useState(formatarAreaInicial(campo?.area));
  const [cultura, setCultura] = useState(campo?.cultura || '');
  const [mostrarCulturas, setMostrarCulturas] = useState(false);
  const [localizacao, setLocalizacao] = useState(
    campo?.localizacao || campo?.zona || ''
  );
  const [observacoes, setObservacoes] = useState(campo?.observacoes || '');
  const [erro, setErro] = useState('');

  useEffect(() => {
    setNome(campo?.nome || '');
    setArea(formatarAreaInicial(campo?.area));
    setCultura(campo?.cultura || '');
    setMostrarCulturas(false);
    setLocalizacao(campo?.localizacao || campo?.zona || '');
    setObservacoes(campo?.observacoes || '');
    setErro('');
  }, [campo]);

  const parcelasCount = campo?.parcelasCount ?? 0;
  const nomeOriginal = campo?.nome || 'Campo';

  const handleGuardar = () => {
    const nomeLimpo = nome.trim();
    const areaLimpa = area.trim();
    const culturaLimpa = cultura.trim();
    const locLimpa = localizacao.trim();
    const obsLimpa = observacoes.trim();

    if (!nomeLimpo || !areaLimpa) {
      setErro('Preencha o nome do campo (*) e a área total (*).');
      return;
    }

    const areaNumero = parseFloat(areaLimpa.replace(',', '.'));
    if (Number.isNaN(areaNumero) || areaNumero <= 0) {
      setErro('Insira uma área total válida em hectares (ex.: 42,8).');
      return;
    }

    setErro('');

    if (onGuardarAlteracoes) {
      onGuardarAlteracoes({
        ...campo,
        nome: nomeLimpo,
        area: areaNumero,
        cultura: culturaLimpa || 'Não definida',
        localizacao: locLimpa,
        zona: locLimpa || campo?.zona || 'Exploração',
        observacoes: obsLimpa,
      });
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
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
          <Text style={styles.title}>Editar campo de cultivo</Text>
          <Text numberOfLines={1} style={styles.subtitle}>
            {nomeOriginal} · {parcelasCount} parcelas
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Dados do campo</Text>
      <Text style={styles.sectionHelper}>
        Atualize os dados de {nomeOriginal}. * Campos obrigatórios.
      </Text>

      <Text style={styles.label}>Nome do campo *</Text>
      <AuthInput
        iconName="map-outline"
        iconLibrary="ion"
        value={nome}
        onChangeText={(t) => {
          setNome(t);
          if (erro) setErro('');
        }}
        placeholder="Ex.: Olival Nascente"
        autoCapitalize="words"
      />

      <Text style={styles.label}>Área total *</Text>
      <View style={styles.areaRow}>
        <View style={styles.areaInputFlex}>
          <AuthInput
            iconName="resize-outline"
            iconLibrary="ion"
            value={area}
            onChangeText={(t) => {
              setArea(t);
              if (erro) setErro('');
            }}
            placeholder="0,0"
            keyboardType="decimal-pad"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.unitBox}>
          <Text style={styles.unitText}>ha</Text>
        </View>
      </View>

      <Text style={styles.label}>Cultura principal (opcional)</Text>
      <TouchableOpacity
        style={styles.selectorCard}
        activeOpacity={0.85}
        delayPressIn={0}
        onPress={() => setMostrarCulturas((prev) => !prev)}
      >
        <Text
          style={[
            styles.selectorText,
            !cultura && styles.selectorPlaceholder,
          ]}
        >
          {cultura || 'Selecionar cultura'}
        </Text>
        <Ionicons
          name={mostrarCulturas ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#6B7871"
        />
      </TouchableOpacity>

      {mostrarCulturas && (
        <View style={styles.optionsBox}>
          {OPCOES_CULTURA.map((opcao) => {
            const selecionada = cultura === opcao;
            return (
              <TouchableOpacity
                key={opcao}
                style={[
                  styles.optionChip,
                  selecionada && styles.optionChipActive,
                ]}
                activeOpacity={0.8}
                delayPressIn={0}
                onPress={() => {
                  setCultura(opcao);
                  setMostrarCulturas(false);
                }}
              >
                <Text
                  style={[
                    styles.optionChipText,
                    selecionada && styles.optionChipTextActive,
                  ]}
                >
                  {opcao}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <Text style={styles.label}>Localização (opcional)</Text>
      <AuthInput
        iconName="location-outline"
        iconLibrary="ion"
        value={localizacao}
        onChangeText={setLocalizacao}
        placeholder="Localidade ou coordenadas"
        autoCapitalize="sentences"
      />

      <Text style={styles.label}>Observações (opcional)</Text>
      <AuthInput
        iconName="document-text-outline"
        iconLibrary="ion"
        value={observacoes}
        onChangeText={setObservacoes}
        placeholder="Adicionar notas sobre o campo..."
        autoCapitalize="sentences"
      />

      <View style={styles.infoBanner}>
        <Ionicons
          name="layers-outline"
          size={20}
          color="#24593F"
          style={styles.infoIcon}
        />
        <View style={styles.infoTextCol}>
          <Text style={styles.infoTitle}>
            {parcelasCount} parcelas associadas
          </Text>
          <Text style={styles.infoSub}>
            Está a editar os dados do campo. A gestão de cada parcela é feita
            no respetivo registo.
          </Text>
        </View>
      </View>

      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      <PrimaryButton
        title="Guardar alterações"
        showIcon={false}
        onPress={handleGuardar}
      />

      <TouchableOpacity
        style={styles.cancelBtn}
        activeOpacity={0.85}
        delayPressIn={0}
        onPress={() => onBack && onBack()}
      >
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
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
    backgroundColor: '#E5ECE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 12.5,
    color: '#6B7871',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#1E2923',
  },
  sectionHelper: {
    fontSize: 12.5,
    color: '#6B7871',
    marginTop: 2,
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E2923',
    marginBottom: 6,
  },
  areaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  areaInputFlex: {
    flex: 1,
  },
  unitBox: {
    height: 54,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#7A8680',
  },
  selectorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 54,
    borderWidth: 1,
    borderColor: '#E5E9E6',
    marginBottom: 12,
  },
  selectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E2923',
  },
  selectorPlaceholder: {
    color: '#8B9890',
  },
  optionsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  optionChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  optionChipActive: {
    backgroundColor: '#1B3B2B',
    borderColor: '#1B3B2B',
  },
  optionChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#244735',
  },
  optionChipTextActive: {
    color: '#FFFFFF',
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#DCEAE0',
    borderRadius: 18,
    padding: 14,
    marginTop: 4,
    marginBottom: 18,
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  infoTextCol: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#1E2923',
  },
  infoSub: {
    fontSize: 12,
    color: '#4B5D53',
    marginTop: 2,
    lineHeight: 17,
  },
  errorText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#B85D19',
    marginBottom: 12,
  },
  cancelBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  cancelText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1E2923',
  },
});