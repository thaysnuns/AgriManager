// components/PerfilScreen.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PerfilScreen({
  userName = 'Maria Costa',
  roleText = 'Agricultora · Proprietária',
  quintaNome = 'Quinta do Vale',
  quintaDetalhe = 'Évora · 128,4 ha',
  planoNome = 'Plano Profissional',
  planoRenovacao = 'Renova a 14 out. 2026',
  equipaResumo = '12 utilizadores · 3 convites',
  onOpenDefinicoes,
  onOpenQrPerfil,
  onOpenExploracao,
  onOpenOperadores,
  onOpenNotificacoes,
  onLogout,
}) {
  const iniciais = (userName || 'MC')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('');

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <View style={styles.headerTextCol}>
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.subtitle}>Conta e exploração</Text>
        </View>

        <TouchableOpacity
          style={styles.settingsBtn}
          activeOpacity={0.8}
          delayPressIn={0}
          onPress={() => onOpenDefinicoes && onOpenDefinicoes()}
        >
          <Ionicons name="settings-outline" size={20} color="#1E2923" />
        </TouchableOpacity>
      </View>

      {/* Cartão Verde Escuro do Utilizador */}
      <View style={styles.heroCard}>
        <TouchableOpacity
          style={styles.heroMainTouchable}
          activeOpacity={0.88}
          delayPressIn={0}
          onPress={() => onOpenExploracao && onOpenExploracao()}
        >
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{iniciais}</Text>
          </View>

          <View style={styles.heroInfoCol}>
            <Text numberOfLines={1} style={styles.heroName}>
              {userName}
            </Text>
            <Text numberOfLines={1} style={styles.heroRole}>
              {roleText}
            </Text>
            <Text numberOfLines={1} style={styles.heroQuinta}>
              {quintaNome}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.qrBtn}
          activeOpacity={0.8}
          delayPressIn={0}
          onPress={() => onOpenQrPerfil && onOpenQrPerfil()}
        >
          <Ionicons name="qr-code-outline" size={22} color="#E6F0EA" />
        </TouchableOpacity>
      </View>

      {/* Faixa Plano Profissional */}
      <View style={styles.planBanner}>
        <View style={styles.planLeft}>
          <Text style={styles.planTitle}>{planoNome}</Text>
          <Text style={styles.planSub}>{planoRenovacao}</Text>
        </View>

        <View style={styles.activeBadge}>
          <Text style={styles.activeBadgeText}>ATIVO</Text>
        </View>
      </View>

      {/* Secção: Exploração */}
      <Text style={styles.sectionTitle}>Exploração</Text>

      <TouchableOpacity
        style={styles.itemCard}
        activeOpacity={0.85}
        delayPressIn={0}
        onPress={() => onOpenExploracao && onOpenExploracao()}
      >
        <View style={styles.iconBox}>
          <Ionicons name="business-outline" size={20} color="#24593F" />
        </View>
        <View style={styles.itemTextCol}>
          <Text numberOfLines={1} style={styles.itemTitle}>
            {quintaNome}
          </Text>
          <Text numberOfLines={1} style={styles.itemSub}>
            {quintaDetalhe}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#8A9690" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemCard}
        activeOpacity={0.85}
        delayPressIn={0}
        onPress={() => onOpenOperadores && onOpenOperadores()}
      >
        <View style={styles.iconBox}>
          <Ionicons name="people-outline" size={20} color="#24593F" />
        </View>
        <View style={styles.itemTextCol}>
          <Text style={styles.itemTitle}>Equipa e permissões</Text>
          <Text numberOfLines={2} style={styles.itemSub}>
            {equipaResumo}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#8A9690" />
      </TouchableOpacity>

      {/* Secção: Preferências */}
      <Text style={styles.sectionTitle}>Preferências</Text>

      <TouchableOpacity
        style={styles.itemCard}
        activeOpacity={0.85}
        delayPressIn={0}
        onPress={() => onOpenNotificacoes && onOpenNotificacoes()}
      >
        <View style={styles.iconBox}>
          <Ionicons name="notifications-outline" size={20} color="#24593F" />
        </View>
        <View style={styles.itemTextCol}>
          <Text style={styles.itemTitle}>Notificações</Text>
          <Text numberOfLines={2} style={styles.itemSub}>
            Alertas críticos e tarefas
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#8A9690" />
      </TouchableOpacity>

      {onLogout && (
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={onLogout}
        >
          <Ionicons name="log-out-outline" size={18} color="#B85D19" />
          <Text style={styles.logoutText}>Terminar sessão</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 16,
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
  settingsBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1B3B2B',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 12,
  },
  heroMainTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F7E7D5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#B85D19',
  },
  heroInfoCol: {
    flex: 1,
  },
  heroName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroRole: {
    fontSize: 12.5,
    color: '#C8D8CE',
    marginTop: 2,
  },
  heroQuinta: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#E59A4C',
    marginTop: 3,
  },
  qrBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9ECE0',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    gap: 10,
  },
  planLeft: {
    flex: 1,
  },
  planTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#1E2923',
  },
  planSub: {
    fontSize: 12,
    color: '#7A7269',
    marginTop: 2,
  },
  activeBadge: {
    backgroundColor: '#DCE8E0',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 10,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2D6A4F',
    letterSpacing: 0.4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E2923',
    marginBottom: 12,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: '#E1ECE4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  itemTextCol: {
    flex: 1,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#1E2923',
  },
  itemSub: {
    fontSize: 12.5,
    color: '#6B7871',
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FCF8F4',
    borderRadius: 16,
    paddingVertical: 13,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#F0DEC9',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#B85D19',
  },
});