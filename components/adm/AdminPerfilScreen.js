// components/adm/AdminPerfilScreen.js
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdminPerfilScreen({ user, onLogout, onSettings }) {
  const nome = user?.nomeCompleto || 'Administrador';
  const email = user?.email || 'administrador@agrimanager.pt';
  const iniciais = nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.subtitle}>Conta administrativa</Text>
        </View>
        <TouchableOpacity style={styles.roundBtn} onPress={onSettings} activeOpacity={0.8}>
          <Ionicons name="settings-outline" size={22} color="#1E2923" />
        </TouchableOpacity>
      </View>

      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{iniciais}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{nome}</Text>
          <Text style={styles.userRole}>Administrador da plataforma</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Conta</Text>

      <View style={styles.menuCard}>
        <View style={styles.menuIcon}>
          <Ionicons name="business-outline" size={22} color="#1B3B2B" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.menuTitle}>Rede Terra Clara</Text>
          <Text style={styles.menuSub}>Gestão global da plataforma</Text>
        </View>
      </View>

      <View style={styles.menuCard}>
        <View style={styles.menuIcon}>
          <Ionicons name="shield-checkmark-outline" size={22} color="#1B3B2B" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.menuTitle}>Permissões administrativas</Text>
          <Text style={styles.menuSub}>Empresas, utilizadores e campos</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout} activeOpacity={0.85}>
        <Ionicons name="log-out-outline" size={20} color="#B42318" />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 16, paddingBottom: 30, backgroundColor: '#F4F6F3' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  title: { fontSize: 26, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 13, color: '#6B7871', marginTop: 2 },
  roundBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E9E6', justifyContent: 'center', alignItems: 'center' },
  userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#27505F', borderRadius: 22, padding: 18, marginBottom: 22, gap: 14 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#DCE8EE', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, fontWeight: '800', color: '#27505F' },
  userName: { fontSize: 19, fontWeight: '800', color: '#FFFFFF' },
  userRole: { fontSize: 12, color: '#C4D8E0', marginTop: 2 },
  userEmail: { fontSize: 12, fontWeight: '700', color: '#8FD0E8', marginTop: 4 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1E2923', marginBottom: 12 },
  menuCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5E9E6', paddingVertical: 18, paddingHorizontal: 16, marginBottom: 12 },
  menuIcon: { width: 46, height: 46, borderRadius: 14, backgroundColor: '#E3ECE6', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  menuTitle: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  menuSub: { fontSize: 12, color: '#6B7871', marginTop: 3 },
  logoutButton: { height: 52, borderRadius: 14, borderWidth: 1, borderColor: '#F1C9C5', backgroundColor: '#FFF7F6', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, marginTop: 12 },
  logoutText: { fontSize: 14, fontWeight: '800', color: '#B42318' },
});
