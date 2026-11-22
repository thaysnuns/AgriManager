// components/CriarPlantacaoScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CULTURAS = ['Oliveira', 'Vinha', 'Trigo duro', 'Tomate indústria', 'Milho', 'Cereal'];
const CAMPOS = ['Olival Norte', 'Vinha do Poente', 'Cereal Sul', 'Horta Poente'];
const ESTADOS = ['Planeada', 'Ativa', 'Em crescimento', 'A maturar'];

export default function CriarPlantacaoScreen({ onBack, onPlantacaoCriada }) {
  const [cultura, setCultura] = useState('');
  const [variedade, setVariedade] = useState('');
  const [campo, setCampo] = useState('');
  const [area, setArea] = useState('');
  const [estado, setEstado] = useState('Planeada');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [dropdownAberto, setDropdownAberto] = useState(null);
  const [erro, setErro] = useState('');

  const handleCriar = () => {
    const culturaLimpa = cultura.trim();
    const areaNormalizada = area.trim().replace(',', '.');
    const areaNumero = parseFloat(areaNormalizada);

    if (!culturaLimpa) {
      setErro('Selecione a cultura da plantação.');
      return;
    }

    if (!areaNormalizada || Number.isNaN(areaNumero) || areaNumero <= 0) {
      setErro('Indique uma área válida em hectares (ha).');
      return;
    }

    if (!dataInicio.trim()) {
      setErro('Indique a data de início.');
      return;
    }

    setErro('');
    if (onPlantacaoCriada) {
      onPlantacaoCriada({
        id: `plantacao-${Date.now()}`,
        cultura: culturaLimpa,
        variedade: variedade.trim() || 'Variedade não definida',
        campo: campo || 'Campo não definido',
        area: areaNumero,
        areaFormatada: `${areaNumero.toLocaleString('pt-PT', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })} ha`,
        estado,
        categoria: estado === 'Planeada' ? 'Planeadas 2' : 'Ativas 4',
        fase: estado,
        progresso: estado === 'Planeada' ? '0%' : '10%',
        progressoNum: estado === 'Planeada' ? 0 : 10,
        dataInicio: dataInicio.trim(),
        dataFim: dataFim.trim(),
        observacoes: observacoes.trim(),
        iconName: culturaLimpa.toLowerCase().includes('vinha')
          ? 'fruit-grapes-outline'
          : culturaLimpa.toLowerCase().includes('trigo')
          ? 'barley'
          : 'sprout-outline',
      });
    }
  };

  const renderSelect = (label, value, placeholder, opcoes, field) => (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setDropdownAberto(dropdownAberto === field ? null : field)}
        activeOpacity={0.8}
      >
        <Text style={[styles.selectText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Ionicons
          name={dropdownAberto === field ? 'chevron-up' : 'chevron-down'}
          size={19}
          color="#6B7871"
        />
      </TouchableOpacity>
      {dropdownAberto === field && (
        <View style={styles.dropdownList}>
          {opcoes.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.dropdownItem, value === item && styles.dropdownItemActive]}
              onPress={() => {
                if (field === 'cultura') setCultura(item);
                if (field === 'campo') setCampo(item);
                if (field === 'estado') setEstado(item);
                setDropdownAberto(null);
              }}
            >
              <Text style={[styles.dropdownItemText, value === item && styles.dropdownItemTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Criar plantação</Text>
          <Text style={styles.subtitle}>Plantações · Novo registo</Text>
        </View>
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Dados da plantação</Text>
        <Text style={styles.requiredHint}>Preencha os dados. * Campos obrigatórios.</Text>
      </View>

      {renderSelect('Cultura *', cultura, 'Selecionar cultura', CULTURAS, 'cultura')}

      <Text style={styles.fieldLabel}>Variedade (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Touriga Nacional"
        placeholderTextColor="#8B9890"
        value={variedade}
        onChangeText={setVariedade}
      />

      {renderSelect('Campo *', campo, 'Selecionar campo', CAMPOS, 'campo')}

      <Text style={styles.fieldLabel}>Área da plantação *</Text>
      <View style={styles.areaInputBox}>
        <TextInput
          style={styles.areaInput}
          placeholder="0,0"
          placeholderTextColor="#8B9890"
          keyboardType="decimal-pad"
          value={area}
          onChangeText={(value) => {
            setArea(value);
            if (erro) setErro('');
          }}
        />
        <Text style={styles.unitText}>ha</Text>
      </View>

      {renderSelect('Estado', estado, 'Selecionar estado', ESTADOS, 'estado')}

      <Text style={styles.fieldLabel}>Data de início *</Text>
      <TextInput
        style={styles.input}
        placeholder="DD-MM-AAAA"
        placeholderTextColor="#8B9890"
        value={dataInicio}
        onChangeText={(value) => {
          setDataInicio(value);
          if (erro) setErro('');
        }}
      />

      <Text style={styles.fieldLabel}>Data prevista de fim (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="DD-MM-AAAA"
        placeholderTextColor="#8B9890"
        value={dataFim}
        onChangeText={setDataFim}
      />

      <Text style={styles.fieldLabel}>Observações (opcional)</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Adicionar notas sobre a plantação..."
        placeholderTextColor="#8B9890"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        value={observacoes}
        onChangeText={setObservacoes}
      />

      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      <TouchableOpacity style={styles.primaryButton} onPress={handleCriar} activeOpacity={0.85}>
        <Text style={styles.primaryButtonText}>Criar plantação</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onBack} activeOpacity={0.85}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 16, paddingBottom: 32, backgroundColor: '#F4F6F3' },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 },
  backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E5E9E6' },
  title: { fontSize: 23, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 13, color: '#6B7871', marginTop: 2 },
  sectionHeaderRow: { marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1E2923' },
  requiredHint: { fontSize: 12, color: '#7C8A82', marginTop: 3 },
  fieldLabel: { fontSize: 13, fontWeight: '700', color: '#1E2923', marginBottom: 7, marginTop: 4 },
  input: { backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 15, height: 50, fontSize: 14, color: '#1E2923', borderWidth: 1, borderColor: '#E5E9E6', marginBottom: 12 },
  areaInputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 15, height: 50, borderWidth: 1, borderColor: '#E5E9E6', marginBottom: 12 },
  areaInput: { flex: 1, fontSize: 14, color: '#1E2923' },
  unitText: { fontSize: 13, fontWeight: '600', color: '#7C8A82', marginLeft: 8 },
  selectBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 15, height: 50, borderWidth: 1, borderColor: '#E5E9E6', marginBottom: 8 },
  selectText: { fontSize: 14, color: '#1E2923' },
  placeholderText: { color: '#8B9890' },
  dropdownList: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E5E9E6', marginBottom: 12, overflow: 'hidden' },
  dropdownItem: { paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F4F2' },
  dropdownItemActive: { backgroundColor: '#E3ECE6' },
  dropdownItemText: { fontSize: 14, color: '#1E2923' },
  dropdownItemTextActive: { color: '#244735', fontWeight: '800' },
  textArea: { height: 104, backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 15, paddingVertical: 14, fontSize: 14, color: '#1E2923', borderWidth: 1, borderColor: '#E5E9E6', marginBottom: 12 },
  errorText: { color: '#B42318', fontSize: 13, fontWeight: '700', marginBottom: 10 },
  primaryButton: { height: 52, borderRadius: 16, backgroundColor: '#1B3B2B', justifyContent: 'center', alignItems: 'center', marginTop: 4 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  cancelButton: { height: 48, borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E9E6', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  cancelButtonText: { color: '#1E2923', fontSize: 14, fontWeight: '800' },
});
