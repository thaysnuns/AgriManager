// components/TarefasScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const DIAS_SEMANA = [
  { id: '28', dia: 'Seg', num: '28' },
  { id: '29', dia: 'Ter', num: '29' },
  { id: '30', dia: 'Qua', num: '30' },
  { id: '01', dia: 'Qui', num: '01' },
  { id: '02', dia: 'Sex', num: '02' },
];

const TAREFAS_EM_CURSO = [
  {
    id: '1',
    titulo: 'Rega · Olival Norte',
    subtitulo: '18:00–20:00 · João e Rui',
    badge: 'ALTA PRIORIDADE',
    badgeColor: '#C26D1F',
    iconLib: 'Ionicons',
    iconName: 'water-outline',
    iconBg: '#F6E8D8',
    iconColor: '#C26D1F',
  },
  {
    id: '2',
    titulo: 'Inspeção fitossanitária',
    subtitulo: 'Vinha VP-03 · Ana Santos',
    badge: 'EM CURSO',
    badgeColor: '#2B6CB0',
    iconLib: 'Ionicons',
    iconName: 'scan-outline',
    iconBg: '#E2ECF5',
    iconColor: '#2B6CB0',
  },
];

const TAREFAS_A_SEGUIR = [
  {
    id: '3',
    titulo: 'Verificar setor de rega 4',
    subtitulo: '15:30 · Olival ON-02',
    badge: 'PENDENTE',
    badgeColor: '#2D6A4F',
    iconLib: 'Ionicons',
    iconName: 'build-outline',
    iconBg: '#E3ECE6',
    iconColor: '#1B3B2B',
  },
  {
    id: '4',
    titulo: 'Preparar colheita',
    subtitulo: '17:00 · Cereal Sul',
    badge: 'PENDENTE',
    badgeColor: '#2D6A4F',
    iconLib: 'MaterialCommunityIcons',
    iconName: 'tractor',
    iconBg: '#E3ECE6',
    iconColor: '#1B3B2B',
  },
  {
    id: '5',
    titulo: 'Registo de tratamentos',
    subtitulo: 'Até às 19:00 · Vinha',
    badge: 'PENDENTE',
    badgeColor: '#2D6A4F',
    iconLib: 'Ionicons',
    iconName: 'clipboard-outline',
    iconBg: '#E3ECE6',
    iconColor: '#1B3B2B',
  },
];

export default function TarefasScreen() {
  const [selectedDay, setSelectedDay] = useState('28');

  const renderIcon = (item) => {
    if (item.iconLib === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={item.iconName} size={22} color={item.iconColor} />;
    }
    return <Ionicons name={item.iconName} size={22} color={item.iconColor} />;
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Tarefas</Text>
          <Text style={styles.subtitle}>8 hoje · 3 concluídas</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#1E2923" />
        </TouchableOpacity>
      </View>

      {/* Seletor de Dias da Semana */}
      <View style={styles.daysRow}>
        {DIAS_SEMANA.map((d) => {
          const isActive = selectedDay === d.id;
          return (
            <TouchableOpacity
              key={d.id}
              style={[styles.dayCard, isActive && styles.dayCardActive]}
              onPress={() => setSelectedDay(d.id)}
            >
              <Text style={[styles.dayName, isActive && styles.dayTextActive]}>{d.dia}</Text>
              <Text style={[styles.dayNum, isActive && styles.dayTextActive]}>{d.num}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Cartão: Progresso de hoje */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Progresso de hoje</Text>
          <Text style={styles.progressCount}>3 de 8</Text>
        </View>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: '37.5%' }]} />
        </View>
      </View>

      {/* Secção: Em curso */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Em curso</Text>
        <Text style={styles.sectionLink}>2 tarefas</Text>
      </View>

      {TAREFAS_EM_CURSO.map((item) => (
        <View key={item.id} style={styles.taskCard}>
          <View style={[styles.taskIconBox, { backgroundColor: item.iconBg }]}>
            {renderIcon(item)}
          </View>

          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>{item.titulo}</Text>
            <Text style={styles.taskSub}>{item.subtitulo}</Text>
          </View>

          <Text style={[styles.taskBadge, { color: item.badgeColor }]}>{item.badge}</Text>
        </View>
      ))}

      {/* Secção: A seguir */}
      <View style={[styles.sectionHeader, { marginTop: 10 }]}>
        <Text style={styles.sectionTitle}>A seguir</Text>
        <TouchableOpacity>
          <Text style={styles.sectionLink}>Ver agenda</Text>
        </TouchableOpacity>
      </View>

      {TAREFAS_A_SEGUIR.map((item) => (
        <View key={item.id} style={styles.taskCard}>
          <View style={[styles.taskIconBox, { backgroundColor: item.iconBg }]}>
            {renderIcon(item)}
          </View>

          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>{item.titulo}</Text>
            <Text style={styles.taskSub}>{item.subtitulo}</Text>
          </View>

          <Text style={[styles.taskBadge, { color: item.badgeColor }]}>{item.badge}</Text>
        </View>
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
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 8,
  },
  dayCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  dayCardActive: {
    backgroundColor: '#1B3B2B',
    borderColor: '#1B3B2B',
  },
  dayName: {
    fontSize: 12,
    color: '#6B7871',
    marginBottom: 4,
  },
  dayNum: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E2923',
  },
  dayTextActive: {
    color: '#FFFFFF',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E2923',
  },
  progressCount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2D6A4F',
  },
  progressBg: {
    height: 7,
    backgroundColor: '#E5E9E6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1B3B2B',
    borderRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E2923',
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D6A4F',
  },
  taskCard: {
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
  taskIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2923',
  },
  taskSub: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 3,
  },
  taskBadge: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});