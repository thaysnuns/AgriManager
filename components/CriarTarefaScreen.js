import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OPERADORES_INICIAIS } from './OperadoresScreen';

const CAMPOS = ['Olival Norte', 'Vinha do Poente', 'Cereal Sul', 'Horta'];
const TIPOS = ['Rega', 'Inspeção', 'Manutenção', 'Colheita', 'Tratamento'];
const PRIORIDADES = ['Normal', 'Alta', 'Urgente'];

export default function CriarTarefaScreen({ onBack, onTarefaCriada }) {
  const [titulo, setTitulo] = useState('');
  const [campo, setCampo] = useState(CAMPOS[0]);
  const [tipo, setTipo] = useState(TIPOS[0]);
  const [prioridade, setPrioridade] = useState('Normal');
  const [dia, setDia] = useState('22');
  const [hora, setHora] = useState('');
  const [operadoresSelecionados, setOperadoresSelecionados] = useState([]);
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState('');

  const criar = () => {
    if (!titulo.trim()) {
      setErro('Indique o título da tarefa.');
      return;
    }
    setErro('');
    onTarefaCriada?.({
      titulo: titulo.trim(),
      campo,
      tipo,
      prioridade,
      dia,
      hora: hora.trim(),
      operadores: OPERADORES_INICIAIS
        .filter((operador) => operadoresSelecionados.includes(operador.id))
        .map((operador) => operador.nome),
      observacoes: observacoes.trim(),
    });
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color="#1E2923" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Criar tarefa</Text>
          <Text style={styles.subtitle}>Tarefas · Novo registo</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Dados da tarefa</Text>
        <Text style={styles.required}>* Campo obrigatório</Text>
      </View>

      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={(valor) => { setTitulo(valor); setErro(''); }}
        placeholder="Ex.: Rega do Olival Norte"
        placeholderTextColor="#8B9890"
      />

      <Text style={styles.label}>Campo</Text>
      <View style={styles.optionsRow}>
        {CAMPOS.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.optionChip, campo === item && styles.optionChipActive]}
            onPress={() => setCampo(item)}
          >
            <Text style={[styles.optionText, campo === item && styles.optionTextActive]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Tipo</Text>
      <View style={styles.optionsRow}>
        {TIPOS.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.optionChip, tipo === item && styles.optionChipActive]}
            onPress={() => setTipo(item)}
          >
            <Text style={[styles.optionText, tipo === item && styles.optionTextActive]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Prioridade</Text>
      <View style={styles.optionsRow}>
        {PRIORIDADES.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.optionChip, prioridade === item && styles.optionChipActive]}
            onPress={() => setPrioridade(item)}
          >
            <Text style={[styles.optionText, prioridade === item && styles.optionTextActive]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <View style={styles.fieldHalf}>
          <Text style={styles.label}>Dia</Text>
          <TextInput
            style={styles.input}
            value={dia}
            onChangeText={setDia}
            keyboardType="number-pad"
            placeholder="22"
            placeholderTextColor="#8B9890"
          />
        </View>
        <View style={styles.fieldHalf}>
          <Text style={styles.label}>Hora</Text>
          <TextInput
            style={styles.input}
            value={hora}
            onChangeText={setHora}
            placeholder="Ex.: 18:00"
            placeholderTextColor="#8B9890"
          />
        </View>
      </View>

      <Text style={styles.label}>Operadores da empresa</Text>
      <View style={styles.optionsRow}>
        {OPERADORES_INICIAIS.map((operador) => {
          const selecionado = operadoresSelecionados.includes(operador.id);
          return (
            <TouchableOpacity
              key={operador.id}
              style={[styles.optionChip, selecionado && styles.optionChipActive]}
              onPress={() => setOperadoresSelecionados((atuais) =>
                selecionado
                  ? atuais.filter((id) => id !== operador.id)
                  : [...atuais, operador.id]
              )}
              activeOpacity={0.85}
            >
              <View style={styles.operatorOptionContent}>
                {selecionado && <Ionicons name="checkmark-circle" size={16} color="#244735" />}
                <Text style={[styles.optionText, selecionado && styles.optionTextActive]}>
                  {operador.nome}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={observacoes}
        onChangeText={setObservacoes}
        placeholder="Detalhes adicionais sobre a tarefa"
        placeholderTextColor="#8B9890"
        multiline
        textAlignVertical="top"
      />

      {erro ? <Text style={styles.error}>{erro}</Text> : null}

      <TouchableOpacity style={styles.createButton} onPress={criar} activeOpacity={0.85}>
        <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
        <Text style={styles.createButtonText}>Criar tarefa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#F4F6F3' },
  container: { padding: 20, paddingBottom: 36 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E1E6E2', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  title: { fontSize: 24, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 12, color: '#6B7871', marginTop: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1E2923' },
  required: { fontSize: 10, color: '#8B9890' },
  label: { fontSize: 13, fontWeight: '700', color: '#1E2923', marginBottom: 7, marginTop: 10 },
  input: { minHeight: 48, borderRadius: 12, borderWidth: 1, borderColor: '#DDE4DF', backgroundColor: '#FFFFFF', paddingHorizontal: 14, color: '#1E2923' },
  textArea: { height: 92, paddingTop: 13 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: { borderWidth: 1, borderColor: '#DDE4DF', backgroundColor: '#FFFFFF', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 9, marginBottom: 2 },
  optionChipActive: { backgroundColor: '#DCE7DF', borderColor: '#86A692' },
  optionText: { fontSize: 12, color: '#5F6D65', fontWeight: '600' },
  optionTextActive: { color: '#244735', fontWeight: '800' },
  row: { flexDirection: 'row', gap: 12 },
  fieldHalf: { flex: 1 },
  error: { color: '#B42318', fontSize: 12, marginTop: 10 },
  createButton: { height: 52, borderRadius: 14, backgroundColor: '#1B3B2B', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, marginTop: 18 },
  createButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  operatorOptionContent: { flexDirection: 'row', alignItems: 'center', gap: 5 },
});
