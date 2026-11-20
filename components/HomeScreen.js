// components/HomeScreen.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from './ui/StatCard';
import SectionHeader from './ui/SectionHeader';

const ACOES_PRIORITARIAS = [
  {
    id: '1',
    titulo: 'Rega · Olival Norte',
    subtitulo: 'Hoje, 18:00 · 2 operadores',
    estado: 'ALTA',
    estadoColor: '#C26D1F',
    iconName: 'water-outline',
    iconColor: '#C26D1F',
    iconBg: '#F6E8D8',
    targetTab: 'tarefas',
  },
  {
    id: '2',
    titulo: 'Inspeção fitossanitária',
    subtitulo: 'Parcela Vinha 03 · até 16:30',
    estado: 'EM CURSO',
    estadoColor: '#2D6A4F',
    iconName: 'scan-outline',
    iconColor: '#2D6A4F',
    iconBg: '#DCE7DF',
    targetTab: 'plantacoes',
  },
];

export default function HomeScreen({
  userName = 'Maria',
  empresaNome = 'Quinta do Vale',
  areaTotal = '128,4 ha',
  onNavigateTab,
}) {
  const iniciais = (userName || 'MC')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho com Saudação e Avatar */}
      <View style={styles.topHeader}>
        <View style={styles.headerTextCol}>
          <Text style={styles.greeting}>Bom dia, {userName}</Text>
          <Text style={styles.companySub}>
            {empresaNome} · {areaTotal}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.avatarCircle}
          onPress={() => onNavigateTab && onNavigateTab('perfil')}
          activeOpacity={0.8}
        >
          <Text style={styles.avatarText}>{iniciais}</Text>
        </TouchableOpacity>
      </View>

      {/* Cartão Meteorológico Verde-Escuro */}
      <View style={styles.weatherCard}>
        <View style={styles.weatherLeft}>
          <Text style={styles.weatherLocation}>Évora · Hoje</Text>
          <View style={styles.tempRow}>
            <Ionicons name="sunny-outline" size={28} color="#F2B84B" />
            <Text style={styles.tempValue}>23°</Text>
          </View>
          <Text style={styles.weatherDesc}>Céu limpo · vento 11 km/h</Text>
        </View>

        <View style={styles.weatherRight}>
          <Text style={styles.weatherMeta}>Chuva 10%</Text>
          <Text style={styles.weatherMeta}>Humidade 61%</Text>
          <Text style={styles.weatherAlert}>REGAR AO FIM DO DIA</Text>
        </View>
      </View>

      {/* Cartões de Métricas (StatCard Reutilizável) */}
      <View style={styles.statsRow}>
        <StatCard
          iconName="map-outline"
          iconColor="#2D6A4F"
          iconBg="#DCE7DF"
          value="6"
          label="Campos ativos"
          note="+1 esta época"
          noteColor="#2D6A4F"
          onPress={() => onNavigateTab && onNavigateTab('campos')}
        />

        <StatCard
          iconName="checkbox-outline"
          iconColor="#C26D1F"
          iconBg="#F6E8D8"
          value="8"
          label="Tarefas hoje"
          note="3 concluídas"
          noteColor="#C26D1F"
          onPress={() => onNavigateTab && onNavigateTab('tarefas')}
        />
      </View>

      {/* Secção: Ações prioritárias */}
      <SectionHeader
        title="Ações prioritárias"
        actionLabel="Ver todas"
        onActionPress={() => onNavigateTab && onNavigateTab('tarefas')}
      />

      {ACOES_PRIORITARIAS.map((acao) => (
        <TouchableOpacity
          key={acao.id}
          style={styles.actionCard}
          activeOpacity={0.85}
          onPress={() => onNavigateTab && onNavigateTab(acao.targetTab)}
        >
          <View style={[styles.actionIconBox, { backgroundColor: acao.iconBg }]}>
            <Ionicons name={acao.iconName} size={20} color={acao.iconColor} />
          </View>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>{acao.titulo}</Text>
            <Text style={styles.actionSub}>{acao.subtitulo}</Text>
          </View>
          <Text style={[styles.actionBadge, { color: acao.estadoColor }]}>
            {acao.estado}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Cartão: Reserva de água */}
      <View style={styles.waterCard}>
        <View style={styles.waterHeader}>
          <Text style={styles.waterTitle}>Reserva de água</Text>
          <Text style={styles.waterPercent}>72%</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '72%' }]} />
        </View>
        <Text style={styles.waterFooter}>
          Autonomia estimada: 11 dias ao ritmo atual
        </Text>
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
    padding: 20,
    paddingTop: 14,
    paddingBottom: 28,
    backgroundColor: '#F4F6F3',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTextCol: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E2923',
  },
  companySub: {
    fontSize: 13,
    color: '#6B7871',
    marginTop: 2,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCE7DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#244735',
  },
  weatherCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B3B2B',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },
  weatherLeft: {
    flex: 1,
  },
  weatherLocation: {
    fontSize: 12,
    color: '#C8D6CE',
    marginBottom: 6,
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  tempValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  weatherDesc: {
    fontSize: 12,
    color: '#D5E0DA',
  },
  weatherRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 4,
  },
  weatherMeta: {
    fontSize: 12,
    color: '#D5E0DA',
  },
  weatherAlert: {
    fontSize: 11,
    fontWeight: '800',
    color: '#E59A4C',
    marginTop: 6,
    letterSpacing: 0.3,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  actionIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2923',
  },
  actionSub: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 2,
  },
  actionBadge: {
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 8,
  },
  waterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  waterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  waterTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E2923',
  },
  waterPercent: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2D6A4F',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5EAE7',
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#1B3B2B',
  },
  waterFooter: {
    fontSize: 12,
    color: '#7C8A82',
  },
});