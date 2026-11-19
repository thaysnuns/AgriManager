// components/CriarCamposScreen.js
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

const CULTURAS = [
  'Olival',
  'Vinha',
  'Cereal',
  'Pomar',
  'Horta',
];

export default function CriarCamposScreen({ onBack, onCampoCriado }) {
  const [nomeCampo, setNomeCampo] = useState('');
  const [areaTotal, setAreaTotal] = useState('');
  const [culturaPrincipal, setCulturaPrincipal] = useState('');
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [localizacao, setLocalizacao] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState('');

  const handleCriarCampo = () => {
    const nomeLimpo = nomeCampo.trim();
    const areaNormalizada = areaTotal.trim().replace(',', '.');
    const areaNumero = parseFloat(areaNormalizada);

    if (!nomeLimpo) {
      setErro('O nome do campo é obrigatório.');
      return;
    }

    if (!areaNormalizada || Number.isNaN(areaNumero) || areaNumero <= 0) {
      setErro('Indique uma área total válida em hectares (ha).');
      return;
    }

    setErro('');
    if (onCampoCriado) {
      onCampoCriado({
        nome: nomeLimpo,
        area: areaNumero,
        areaFormatada: `${areaNumero.toLocaleString('pt-PT', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })} ha`,
        cultura: culturaPrincipal || 'Sem cultura definida',
        localizacao: localizacao.trim() || 'Évora',
        observacoes: observacoes.trim(),
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
          <Text style={styles.title}>Criar campo de cultivo</Text>
          <Text style={styles.subtitle}>Campos · Novo registo</Text>
        </View>
      </View>

      {/* Secção: Dados do campo */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Dados do campo</Text>
        <Text style={styles.requiredHint}>Preencha os dados. * Campos obrigatórios.</Text>
      </View>

      {/* Nome do campo * */}
      <Text style={styles.fieldLabel}>
        Nome do campo <Text style={styles.asterisk}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Olival Nascente"
        placeholderTextColor="#8B9890"
        value={nomeCampo}
        onChangeText={(t) => {
          setNomeCampo(t);
          if (erro) setErro('');
        }}
      />

      {/* Área total * */}
      <Text style={styles.fieldLabel}>
        Área total <Text style={styles.asterisk}>*</Text>
      </Text>
      <View style={styles.areaInputBox}>
        <TextInput
          style={styles.areaInput}
          placeholder="0,0"
          placeholderTextColor="#8B9890"
          keyboardType="decimal-pad"
          value={areaTotal}
          onChangeText={(t) => {
            setAreaTotal(t);
            if (erro) setErro('');
          }}
        />
        <Text style={styles.unitText}>ha</Text>
      </View>

      {/* Cultura principal (opcional) */}
      <Text style={styles.fieldLabel}>Cultura principal (opcional)</Text>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setDropdownAberto((prev) => !prev)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.selectText,
            !culturaPrincipal && styles.placeholderText,
          ]}
        >
          {culturaPrincipal || 'Selecionar cultura'}
        </Text>
        <Ionicons
          name={dropdownAberto ? 'chevron-up' : 'chevron-down'}
          size={19}
          color="#6B7871"
        />
      </TouchableOpacity>

      {dropdownAberto && (
        <View style={styles.dropdownList}>
          {CULTURAS.map((item) => {
            const selecionada = culturaPrincipal === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.dropdownItem, selecionada && styles.dropdownItemActive]}
                onPress={() => {
                  setCulturaPrincipal(item);
                  setDropdownAberto(false);
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

      {/* Localização (opcional) */}
      <Text style={styles.fieldLabel}>Localização (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Localidade ou coordenadas"
        placeholderTextColor="#8B9890"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      {/* Observações (opcional) */}
      <Text style={styles.fieldLabel}>Observações (opcional)</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Adicionar notas sobre o campo..."
        placeholderTextColor="#8B9890"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        value={observacoes}
        onChangeText={setObservacoes}
      />

      {/* Cartão Informativo: Parcelas do campo */}
      <View style={styles.parcelasInfoCard}>
        <MaterialCommunityIcons
          name="layers-outline"
          size={22}
          color="#526B5C"
          style={styles.parcelasIcon}
        />
        <View style={styles.parcelasTextCol}>
          <Text style={styles.parcelasTitle}>Parcelas do campo</Text>
          <Text style={styles.parcelasDesc}>
            Depois de criar o campo, pode adicionar e associar as respetivas parcelas.
          </Text>
        </View>
      </View>

      {/* Mensagem de erro */}
      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      {/* Botão Primário: Criar campo */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleCriarCampo}
        activeOpacity={0.85}
      >
        <Text style={styles.primaryButtonText}>Criar campo</Text>
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
  parcelasInfoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E3ECE6',
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#D4E2D9',
  },
  parcelasIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  parcelasTextCol: {
    flex: 1,
  },
  parcelasTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2D4739',
  },
  parcelasDesc: {
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