// components/RegisterScreen.js
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ onBackToLogin, onRegisterSuccess }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Topo com botão voltar e logótipo */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBackToLogin} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#1e293b" />
        </TouchableOpacity>
        <View style={styles.brandRow}>
          <View style={styles.logoIcon}>
            <Ionicons name="leaf" size={16} color="#064e3b" />
          </View>
          <Text style={styles.brandTitle}>Terra Clara</Text>
        </View>
      </View>

      <Text style={styles.title}>Criar a sua conta</Text>
      <Text style={styles.subtitle}>Configure a exploração em poucos passos. Pode convidar a equipa mais tarde.</Text>

      {/* Campos de Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>NOME COMPLETO</Text>
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
          <TextInput style={styles.inputText} defaultValue="Maria Costa" />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>EMPRESA / EXPLORAÇÃO</Text>
        <View style={styles.inputBox}>
          <Ionicons name="business-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
          <TextInput style={styles.inputText} defaultValue="Quinta do Vale" />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>NIF - empresa</Text>
        <View style={styles.inputBox}>
          <Ionicons name="card-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
          <TextInput style={styles.inputText} secureTextEntry defaultValue="••••••••" />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>MORADA DA EMPRESA</Text>
        <View style={styles.inputBox}>
          <Ionicons name="location-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
          <TextInput style={styles.inputText} defaultValue="Rua do Vale, 12" />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>EMAIL PROFISSIONAL</Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
          <TextInput style={styles.inputText} defaultValue="maria.costa@quintadovale.pt" />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>PALAVRA-PASSE</Text>
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
          <TextInput style={styles.inputText} secureTextEntry defaultValue="••••••••" />
        </View>
      </View>

      {/* Termos e Condições */}
      <View style={styles.termsRow}>
        <View style={styles.checkboxActive}>
          <Ionicons name="checkmark" size={12} color="#fff" />
        </View>
        <Text style={styles.termsText}>Aceito os Termos de Utilização e a Política de Privacidade.</Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={onRegisterSuccess}>
        <Text style={styles.primaryButtonText}>→ Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8fafc', paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  backButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: { width: 28, height: 28, borderRadius: 8, backgroundColor: '#d1fae5', justifyContent: 'center', alignItems: 'center', marginRight: 6 },
  brandTitle: { fontSize: 16, fontWeight: '700', color: '#064e3b' },
  title: { fontSize: 24, fontWeight: '800', color: '#1e293b', marginBottom: 6 },
  subtitle: { fontSize: 13, color: '#64748b', marginBottom: 20 },
  inputGroup: { marginBottom: 14 },
  inputLabel: { fontSize: 10, fontWeight: '700', color: '#64748b', marginBottom: 4, letterSpacing: 0.5 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, paddingHorizontal: 12, height: 46 },
  inputIcon: { marginRight: 8 },
  inputText: { flex: 1, fontSize: 13, color: '#1e293b' },
  termsRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  checkboxActive: { width: 18, height: 18, borderRadius: 4, backgroundColor: '#059669', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  termsText: { fontSize: 12, color: '#64748b', flex: 1 },
  primaryButton: { backgroundColor: '#064e3b', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  primaryButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});