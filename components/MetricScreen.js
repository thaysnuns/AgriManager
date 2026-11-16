import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MetricsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Métricas por Setor</Text>
      
      <View style={styles.itemRow}>
        <Ionicons name="cube-outline" size={20} color="#059669" />
        <View style={styles.itemText}>
          <Text style={styles.itemLabel}>Unidades de Produção</Text>
          <Text style={styles.itemSub}>Setor A - Milho</Text>
        </View>
        <Text style={styles.itemValue}>1,450 ton</Text>
      </View>

      <View style={styles.itemRow}>
        <Ionicons name="flash-outline" size={20} color="#d97706" />
        <View style={styles.itemText}>
          <Text style={styles.itemLabel}>Eficiência de Recursos</Text>
          <Text style={styles.itemSub}>Água e Fertilizantes</Text>
        </View>
        <Text style={styles.itemValue}>92%</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#064e3b', marginBottom: 16 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: { flex: 1, marginLeft: 12 },
  itemLabel: { fontSize: 14, fontWeight: '600', color: '#1e293b' },
  itemSub: { fontSize: 12, color: '#64748b' },
  itemValue: { fontSize: 15, fontWeight: '700', color: '#059669' },
});