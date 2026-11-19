// components/CriarParcelaScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const CAMPOS_OPCOES = [
  'Vinha do Poente',
  'Olival Norte',
  'Cereal Sul',
];

const CULTURAS_VARIEDADES = [
  'Touriga Nacional',
  'Oliveira Galega',
  'Trigo Mole',
  'Aragonês',
  'Cobrançosa',
];

export default function CriarParcelaScreen({
  campoInicial,
  camposDisponiveis = CAMPOS_OPCOES,
  onBack,
  onParcelaCriada,
}) {
  const campoDefault = campoInicial || camposDisponiveis[0] || 'Vinha do Poente';

  const [nomeParcela, setNomeParcela] = useState('');
  const [campoCultivo, setCampoCultivo] = useState(campoDefault);
  const [dropdownCampoAberto, setDropdownCampoAberto] = useState(false);
  const [areaParcela, setAreaParcela] = useState('');
  const [culturaVariedade, setCulturaVariedade] = useState('');
  const [dropdownCulturaAberto, setDropdownCulturaAberto] = useState(false);
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState('');

  const handleCriar = () => {
    const nomeLimpo = nomeParcela.trim();
    const areaNormalizada = areaParcela.trim().replace(',', '.');
    const areaNumero = parseFloat(areaNormalizada);

    if (!nomeLimpo) {
      setErro('O nome da parcela é obrigatório.');
      return;
    }

    if (!campoCultivo) {
      setErro('Selecione o campo de cultivo.');
      return;
    }

    if (!areaNormalizada || Number.isNaN(areaNumero) || areaNumero <= 0) {
      setErro('Indique uma área válida em hectares (ha).');
      return;
    }

    const prefixo = nomeLimpo
      .replace(/[^A-Za-z0-9]/g, '')
      .toUpperCase()
      .slice(0, 4) || 'PARC';
    const qrCode = `${prefixo}-2026`;

    setErro('');
    if (onParcelaCriada) {
      onParcelaCriada({
        nome: nomeLimpo,
        campo: campoCultivo,
        area: areaNumero,
        areaFormatada: `${areaNumero.toLocaleString('pt-PT', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })} ha`,
        cultura: culturaVariedade || '',
        observacoes: observacoes.trim(),
        qrCode,
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Criar parcela</Text>
          <Text style={styles.subtitle}>Parcelas · Novo registo</Text>
        </View>
      </View>

      {/* Secção: Dados da parcela */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Dados da parcela</Text>
        <Text style={styles.requiredHint}>Preencha os dados. * Campos obrigatórios.</Text>
      </View>

      {/* Nome da parcela * */}
      <Text style={styles.fieldLabel}>
        Nome da parcela <Text style={styles.asterisk}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Parcela VP-05"
        placeholderTextColor="#8B9890"
        value={nomeParcela}
        onChangeText={(t) => {
          setNomeParcela(t);
          if (erro) setErro('');
        }}
      />

      {/* Campo de cultivo * */}
      <Text style={styles.fieldLabel}>
        Campo de cultivo <Text style={styles.asterisk}>*</Text>
      </Text>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => {
          setDropdownCampoAberto((prev) => !prev);
          setDropdownCulturaAberto(false);
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.selectText}>{campoCultivo}</Text>
        <Ionicons
          name={dropdownCampoAberto ? 'chevron-up' : 'chevron-down'}
          size={19}
          color="#6B7871"
        />
      </TouchableOpacity>

      {dropdownCampoAberto && (
        <View style={styles.dropdownList}>
          {camposDisponiveis.map((item) => {
            const selecionada = campoCultivo === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.dropdownItem, selecionada && styles.dropdownItemActive]}
                onPress={() => {
                  setCampoCultivo(item);
                  setDropdownCampoAberto(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    selecionada && styles.dropdownItemTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Área da parcela * */}
      <Text style={styles.fieldLabel}>
        Área da parcela <Text style={styles.asterisk}>*</Text>
      </Text>
      <View style={styles.areaInputBox}>
        <TextInput
          style={styles.areaInput}
          placeholder="2,4"
          placeholderTextColor="#8B9890"
          keyboardType="decimal-pad"
          value={areaParcela}
          onChangeText={(t) => {
            setAreaParcela(t);
            if (erro) setErro('');
          }}
        />
        <Text style={styles.unitText}>ha</Text>
      </View>

      {/* Cultura / variedade (opcional) */}
      <Text style={styles.fieldLabel}>Cultura / variedade (opcional)</Text>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => {
          setDropdownCulturaAberto((prev) => !prev);
          setDropdownCampoAberto(false);
        }}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.selectText,
            !culturaVariedade && styles.placeholderText,
          ]}
        >
          {culturaVariedade || 'Touriga Nacional'}
        </Text>
        <Ionicons
          name={dropdownCulturaAberto ? 'chevron-up' : 'chevron-down'}
          size={19}
          color="#6B7871"
        />
      </TouchableOpacity>

      {dropdownCulturaAberto && (
        <View style={styles.dropdownList}>
          {CULTURAS_VARIEDADES.map((item) => {
            const selecionada = culturaVariedade === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.dropdownItem, selecionada && styles.dropdownItemActive]}
                onPress={() => {
                  setCulturaVariedade(item);
                  setDropdownCulturaAberto(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    selecionada && styles.dropdownItemTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Observações (opcional) */}
      <Text style={styles.fieldLabel}>Observações (opcional)</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Adicionar notas sobre a parcela..."
        placeholderTextColor="#8B9890"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        value={observacoes}
        onChangeText={setObservacoes}
      />

      {/* Cartão Informativo: QR code automático */}
      <View style={styles.qrInfoCard}>
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={22}
          color="#3A5A48"
          style={styles.qrIcon}
        />
        <View style={styles.qrTextCol}>
          <Text style={styles.qrTitle}>QR code automático</Text>
          <Text style={styles.qrDesc}>
            Ao criar a parcela, é gerado e associado um QR code único. Não precisa de introduzir um código.
          </Text>
        </View>
      </View>

      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      {/* Botão Primário: Criar parcela */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleCriar}
        activeOpacity={0.85}
      >
        <Text style={styles.primaryButtonText}>Criar parcela</Text>
      </TouchableOpacity>

      {/* Botão Secundário: Cancelar */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={onBack}
        activeOpacity={0.85}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#F4F6F3',
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
    fontSize: 23,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7871',
    marginTop: 2,
  },
  sectionHeaderRow: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E2923',
  },
  requiredHint: {
    fontSize: 12,
    color: '#7C8A82',
    marginTop: 3,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E2923',
    marginBottom: 7,
    marginTop: 4,
  },
  asterisk: {
    color: '#2D6A4F',
    fontWeight: '800',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 14,
    color: '#1E2923',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    marginBottom: 12,
  },
  areaInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E9E6',
    marginBottom: 12,
  },
  areaInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E2923',
  },
  unitText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7C8A82',
    marginLeft: 8,
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E9E6',
    marginBottom: 8,
  },
  selectText: {
    fontSize: 14,
    color: '#1E2923',
  },
  placeholderText: {
    color: '#8B9890',
  },
  dropdownList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E9E6',
    marginBottom: 12,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F4F2',
  },
  dropdownItemActive: {
    backgroundColor: '#E3ECE6',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1E2923',
  },
  dropdownItemTextActive: {
    fontWeight: '700',
    color: '#1B3B2B',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingTop: 13,
    paddingBottom: 13,
    minHeight: 96,
    fontSize: 14,
    color: '#1E2923',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    marginBottom: 14,
  },
  qrInfoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E3ECE6',
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#D4E2D9',
  },
  qrIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  qrTextCol: {
    flex: 1,
  },
  qrTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2D4739',
  },
  qrDesc: {
    fontSize: 12,
    color: '#5C7265',
    marginTop: 3,
    lineHeight: 17,
  },
  errorText: {
    color: '#C2410C',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#244735',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2923',
  },
});