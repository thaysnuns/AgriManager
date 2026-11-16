import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Ionicons name="stats-chart" size={32} color="#059669" />
        <Text style={styles.cardTitle}>Resumo Operacional</Text>
        <Text style={styles.cardValue}>85% Eficiência Geral</Text>
        <Text style={styles.cardDesc}>Tudo a funcionar dentro dos parâmetros normais.</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Ionicons name="map-outline" size={24} color="#2563eb" />
          <Text style={styles.smallTitle}>Área Total</Text>
          <Text style={styles.smallValue}>120 Hectares</Text>
        </View>
        <View style={styles.smallCard}>
          <Ionicons name="time-outline" size={24} color="#d97706" />
          <Text style={styles.smallTitle}>Horas Trabalhadas</Text>
          <Text style={styles.smallValue}>420 hrs</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: { fontSize: 14, color: '#64748b', marginTop: 8 },
  cardValue: { fontSize: 22, fontWeight: '700', color: '#064e3b', marginVertical: 4 },
  cardDesc: { fontSize: 12, color: '#94a3b8' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  smallCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  smallTitle: { fontSize: 12, color: '#64748b', marginTop: 6 },
  smallValue: { fontSize: 16, fontWeight: '700', color: '#1e293b', marginTop: 2 },
});