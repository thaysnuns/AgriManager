// components/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho com Saudação e Avatar */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Bom dia, Maria</Text>
          <Text style={styles.subtitle}>Quinta do Vale · 128,4 ha</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MC</Text>
        </View>
      </View>

      {/* Cartão Meteorológico Verde Escuro */}
      <View style={styles.weatherCard}>
        <View style={styles.weatherCircleDecor} />
        <View style={styles.weatherLeft}>
          <Text style={styles.weatherLocation}>Évora · Hoje</Text>
          <View style={styles.tempRow}>
            <Ionicons name="sunny-outline" size={30} color="#D97706" />
            <Text style={styles.tempText}>23°</Text>
          </View>
          <Text style={styles.weatherCondition}>Céu limpo · vento 11 km/h</Text>
        </View>

        <View style={styles.weatherRight}>
          <Text style={styles.weatherDetail}>Chuva 10%</Text>
          <Text style={styles.weatherDetail}>Humidade 61%</Text>
          <Text style={styles.weatherAlert}>REGAR AO FIM DO DIA</Text>
        </View>
      </View>

      {/* Cartões de Resumo (Campos ativos e Tarefas hoje) */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={[styles.iconBox, { backgroundColor: '#E3ECE6' }]}>
            <Ionicons name="map-outline" size={20} color="#1B3B2B" />
          </View>
          <Text style={styles.statNumber}>6</Text>
          <Text style={styles.statLabel}>Campos ativos</Text>
          <Text style={styles.statGreenNote}>+1 esta época</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.iconBox, { backgroundColor: '#F6E8D8' }]}>
            <Ionicons name="list-outline" size={20} color="#C26D1F" />
          </View>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Tarefas hoje</Text>
          <Text style={styles.statOrangeNote}>3 concluídas</Text>
        </View>
      </View>

      {/* Secção: Ações prioritárias */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Ações prioritárias</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllLink}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      {/* Item 1: Rega · Olival Norte */}
      <View style={styles.actionCard}>
        <View style={[styles.actionIconBox, { backgroundColor: '#F6E8D8' }]}>
          <Ionicons name="water-outline" size={22} color="#C26D1F" />
        </View>
        <View style={styles.actionInfo}>
          <Text style={styles.actionTitle}>Rega · Olival Norte</Text>
          <Text style={styles.actionSub}>Hoje, 18:00 · 2 operadores</Text>
        </View>
        <Text style={styles.badgeHigh}>ALTA</Text>
      </View>

      {/* Item 2: Inspeção fitossanitária */}
      <View style={styles.actionCard}>
        <View style={[styles.actionIconBox, { backgroundColor: '#E3ECE6' }]}>
          <Ionicons name="scan-outline" size={22} color="#1B3B2B" />
        </View>
        <View style={styles.actionInfo}>
          <Text style={styles.actionTitle}>Inspeção fitossanitária</Text>
          <Text style={styles.actionSub}>Parcela Vinha 03 · até 16:30</Text>
        </View>
        <Text style={styles.badgeActive}>EM CURSO</Text>
      </View>

      {/* Cartão: Reserva de água */}
      <View style={styles.waterCard}>
        <View style={styles.waterHeader}>
          <Text style={styles.waterTitle}>Reserva de água</Text>
          <Text style={styles.waterPercent}>72%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>
        <Text style={styles.waterFooter}>Autonomia estimada: 11 dias ao ritmo atual</Text>
      </View>
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
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7871',
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCE7DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B3B2B',
  },
  weatherCard: {
    backgroundColor: '#1B3B2B',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  weatherCircleDecor: {
    position: 'absolute',
    right: -30,
    top: -20,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  weatherLeft: {
    justifyContent: 'space-between',
  },
  weatherLocation: {
    fontSize: 13,
    color: '#B8C7BE',
    marginBottom: 8,
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tempText: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  weatherCondition: {
    fontSize: 12,
    color: '#B8C7BE',
  },
  weatherRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  weatherDetail: {
    fontSize: 13,
    color: '#E2EBE5',
    marginBottom: 6,
  },
  weatherAlert: {
    fontSize: 10,
    fontWeight: '800',
    color: '#E09F3E',
    marginTop: 6,
    letterSpacing: 0.4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E2923',
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7871',
    marginTop: 2,
    marginBottom: 8,
  },
  statGreenNote: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2D6A4F',
  },
  statOrangeNote: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C26D1F',
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
  seeAllLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D6A4F',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  actionIconBox: {
    width: 44,
    height: 44,
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
    marginTop: 3,
  },
  badgeHigh: {
    fontSize: 11,
    fontWeight: '800',
    color: '#C26D1F',
  },
  badgeActive: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2D6A4F',
  },
  waterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  waterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  waterTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2923',
  },
  waterPercent: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2D6A4F',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E5E9E6',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    width: '72%',
    height: '100%',
    backgroundColor: '#1B3B2B',
    borderRadius: 4,
  },
  waterFooter: {
    fontSize: 12,
    color: '#6B7871',
  },
});