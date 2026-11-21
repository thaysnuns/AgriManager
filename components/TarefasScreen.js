// components/TarefasScreen.js
import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DiaChip from './ui/DiaChip';
import TarefaCard from './ui/TarefaCard';

const DIAS_SEMANA = [
  { id: 'd-28', diaSemana: 'Seg', numeroDia: '28', concluida: 3, total: 8 },
  { id: 'd-29', diaSemana: 'Ter', numeroDia: '29', concluida: 2, total: 6 },
  { id: 'd-30', diaSemana: 'Qua', numeroDia: '30', concluida: 4, total: 7 },
  { id: 'd-01', diaSemana: 'Qui', numeroDia: '01', concluida: 1, total: 5 },
  { id: 'd-02', diaSemana: 'Sex', numeroDia: '02', concluida: 0, total: 4 },
];

const TAREFAS_EM_CURSO = [
  {
    id: 't-1',
    diaId: 'd-28',
    titulo: 'Rega · Olival Norte',
    subtitulo: '18:00–20:00 · João e Rui',
    estado: 'ALTA PRIORIDADE',
  },
  {
    id: 't-2',
    diaId: 'd-28',
    titulo: 'Inspeção fitossanitária',
    subtitulo: 'Vinha VP-03 · Ana Santos',
    estado: 'EM CURSO',
  },
];

const TAREFAS_A_SEGUIR = [
  {
    id: 't-3',
    diaId: 'd-28',
    titulo: 'Verificar setor de rega 4',
    subtitulo: '15:30 · Olival ON-02',
    estado: 'PENDENTE',
  },
  {
    id: 't-4',
    diaId: 'd-28',
    titulo: 'Preparar colheita',
    subtitulo: '17:00 · Cereal Sul',
    estado: 'PENDENTE',
  },
  {
    id: 't-5',
    diaId: 'd-28',
    titulo: 'Registo de tratamentos',
    subtitulo: 'Até às 19:00 · Vinha',
    estado: 'PENDENTE',
  },
];

export default function TarefasScreen({
  onSelectTarefa,
  onOpenCriarTarefa,
}) {
  const [selectedDiaId, setSelectedDiaId] = useState('d-28');

  const diaAtual = useMemo(
    () => DIAS_SEMANA.find((d) => d.id === selectedDiaId) || DIAS_SEMANA[0],
    [selectedDiaId]
  );

  const emCursoFiltradas = useMemo(() => {
    if (selectedDiaId === 'd-28') return TAREFAS_EM_CURSO;
    return [
      {
        id: `${selectedDiaId}-ec-1`,
        titulo: `Acompanhamento de campo · ${diaAtual.diaSemana} ${diaAtual.numeroDia}`,
        subtitulo: '09:00–12:00 · Equipa técnica',
        estado: 'EM CURSO',
      },
    ];
  }, [selectedDiaId, diaAtual]);

  const aSeguirFiltradas = useMemo(() => {
    if (selectedDiaId === 'd-28') return TAREFAS_A_SEGUIR;
    return [
      {
        id: `${selectedDiaId}-as-1`,
        titulo: 'Monitorização de humidade do solo',
        subtitulo: '14:30 · Parcelas ativas',
        estado: 'PENDENTE',
      },
      {
        id: `${selectedDiaId}-as-2`,
        titulo: 'Atualização de diário agrícola',
        subtitulo: 'Até às 18:00 · Quinta',
        estado: 'PENDENTE',
      },
    ];
  }, [selectedDiaId]);

  const progressoPercent = Math.max(
    0,
    Math.min(100, Math.round((diaAtual.concluida / Math.max(1, diaAtual.total)) * 100))
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <View style={styles.headerTextCol}>
          <Text style={styles.title}>Tarefas</Text>
          <Text style={styles.subtitle}>
            {diaAtual.total} hoje · {diaAtual.concluida} concluídas
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={() => onOpenCriarTarefa && onOpenCriarTarefa(diaAtual)}
        >
          <Ionicons name="add" size={22} color="#1E2923" />
        </TouchableOpacity>
      </View>

      {/* Seletor de Dias (Componente DiaChip) */}
      <View style={styles.daysRow}>
        {DIAS_SEMANA.map((dia) => (
          <DiaChip
            key={dia.id}
            dia={dia}
            isSelected={dia.id === selectedDiaId}
            onPress={(item) => setSelectedDiaId(item.id)}
          />
        ))}
      </View>

      {/* Cartão Progresso de hoje */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Progresso de hoje</Text>
          <Text style={styles.progressCounter}>
            {diaAtual.concluida} de {diaAtual.total}
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${progressoPercent}%` }]}
          />
        </View>
      </View>

      {/* Secção: Em curso */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Em curso</Text>
        <Text style={styles.sectionMeta}>
          {emCursoFiltradas.length}{' '}
          {emCursoFiltradas.length === 1 ? 'tarefa' : 'tarefas'}
        </Text>
      </View>

      {emCursoFiltradas.map((tarefa) => (
        <TarefaCard
          key={tarefa.id}
          tarefa={tarefa}
          onPress={(item) => onSelectTarefa && onSelectTarefa(item)}
        />
      ))}

      {/* Secção: A seguir */}
      <View style={[styles.sectionRow, styles.sectionSpacing]}>
        <Text style={styles.sectionTitle}>A seguir</Text>
        <Text style={styles.sectionAction}>Ver agenda</Text>
      </View>

      {aSeguirFiltradas.map((tarefa) => (
        <TarefaCard
          key={tarefa.id}
          tarefa={tarefa}
          onPress={(item) => onSelectTarefa && onSelectTarefa(item)}
        />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  headerTextCol: {
    flex: 1,
    marginRight: 12,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E2923',
  },
  progressCounter: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#1E2923',
  },
  progressTrack: {
    height: 5,
    borderRadius: 999,
    backgroundColor: '#E5EAE7',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#1B3B2B',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionSpacing: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E2923',
  },
  sectionMeta: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#6B7871',
  },
  sectionAction: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D6A4F',
  },
});