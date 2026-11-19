// components/PerfilScreen.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PerfilScreen({ onOpenOperadores }) {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.subtitle}>Conta e exploração</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={22} color="#1E2923" />
        </TouchableOpacity>
      </View>

      {/* Cartão Principal do Utilizador */}
      <View style={styles.profileCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>MC</Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.userName}>Maria Costa</Text>
          <Text style={styles.userRole}>Agricultora · Proprietária</Text>
          <Text style={styles.userFarm}>Quinta do Vale</Text>
        </View>

        <TouchableOpacity style={styles.qrButton}>
          <MaterialCommunityIcons name="qrcode" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Banner Plano Profissional */}
      <View style={styles.planBanner}>
        <View>
          <Text style={styles.planTitle}>Plano Profissional</Text>
          <Text style={styles.planSub}>Renova a 14 out. 2026</Text>
        </View>
        <View style={styles.activeBadge}>
          <Text style={styles.activeBadgeText}>ATIVO</Text>
        </View>
      </View>

      {/* Secção: Exploração */}
      <Text style={styles.sectionTitle}>Exploração</Text>

      <TouchableOpacity style={styles.menuCard}>
        <View style={styles.menuIconBox}>
          <MaterialCommunityIcons name="office-building-outline" size={22} color="#1B3B2B" />
        </View>
        <View style={styles.menuInfo}>
          <Text style={styles.menuTitle}>Quinta do Vale</Text>
          <Text style={styles.menuSub}>Évora · 128,4 ha</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6B7871" />
      </TouchableOpacity>

      {/* Gatilho para Operadores / Equipa e permissões */}
      <TouchableOpacity
        style={styles.menuCard}
        onPress={onOpenOperadores}
        activeOpacity={0.8}
      >
        <View style={styles.menuIconBox}>
          <Ionicons name="people-outline" size={22} color="#1B3B2B" />
        </View>
        <View style={styles.menuInfo}>
          <Text style={styles.menuTitle}>Equipa e permissões</Text>
          <Text style={styles.menuSub}>12 utilizadores · 3 convites</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6B7871" />
      </TouchableOpacity>

      {/* Secção: Preferências */}
      <Text style={styles.sectionTitle}>Preferências</Text>

      <TouchableOpacity style={styles.menuCard}>
        <View style={styles.menuIconBox}>
          <Ionicons name="notifications-outline" size={22} color="#1B3B2B" />
        </View>
        <View style={styles.menuInfo}>
          <Text style={styles.menuTitle}>Notificações</Text>
          <Text style={styles.menuSub}>Alertas críticos e tarefas</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6B7871" />
      </TouchableOpacity>
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
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B3B2B',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F3DEC3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#C26D1F',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userRole: {
    fontSize: 12,
    color: '#D5E0D9',
    marginTop: 2,
  },
  userFarm: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E6A15C',
    marginTop: 4,
  },
  qrButton: {
    padding: 6,
  },
  planBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8ECE0',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 22,
  },
  planTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E2923',
  },
  planSub: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 2,
  },
  activeBadge: {
    backgroundColor: '#DCE8E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2D6A4F',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E2923',
    marginBottom: 12,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  menuIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#E3ECE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2923',
  },
  menuSub: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 2,
  },
});