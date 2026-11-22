/// components/LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ onNavigateToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('maria.costa@quintadovale.pt');
  const [password, setPassword] = useState('123456');
  const [erro, setErro] = useState('');

  const contasPermitidas = {
    'maria.costa@quintadovale.pt': {
      password: '123456',
      nomeCompleto: 'Maria Costa',
      empresa: 'Quinta do Vale',
      role: 'agricultor',
    },
    'operador': {
      password: '123456',
      nomeCompleto: 'João Silva',
      empresa: 'Quinta do Vale',
      role: 'operador',
    },

    'adm': {
      password: '123456',
      nomeCompleto: 'ADM',
      empresa: 'Quinta do Vale',
      role: 'administrador',
    },

  };

  const handleLogin = () => {
    const emailLimpo = email.trim().toLowerCase();
    const conta = contasPermitidas[emailLimpo];

    if (!conta || conta.password !== password) {
      setErro('E-mail ou palavra-passe incorretos.');
      return;
    }

    setErro('');
    if (onLoginSuccess) {
      onLoginSuccess({
        email: emailLimpo,
        nomeCompleto: conta.nomeCompleto,
        empresa: conta.empresa,
        role: conta.role,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagem de Topo com Overlay */}
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80' }} 
        style={styles.heroImage}
      >
        <View style={styles.heroOverlay}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>● A TERRA, EM TEMPO REAL</Text>
          </View>
          <Text style={styles.heroTitle}>Decisões melhores, desde o terreno.</Text>
        </View>
      </ImageBackground>

      {/* Formulário de Login */}
      <View style={styles.formContainer}>
        <View style={styles.brandRow}>
          <View style={styles.logoIcon}>
            <Ionicons name="leaf" size={20} color="#064e3b" />
          </View>
          <Text style={styles.brandTitle}>AgriManager</Text>
        </View>

        <Text style={styles.subtitle}>Entre para acompanhar campos, equipas e operações agrícolas.</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>EMAIL</Text>
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput 
              style={styles.inputText} 
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>PALAVRA-PASSE</Text>
          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput 
              style={styles.inputText} 
              secureTextEntry 
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        {erro ? (
          <Text style={styles.errorText}>{erro}</Text>
        ) : null}

        <View style={styles.optionsRow}>
          <Text style={styles.optionText}>Manter sessão iniciada</Text>
          <Text style={styles.linkText}>Esqueci-me da palavra-passe</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>→ Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNavigateToRegister} style={styles.footerRedirect}>
          <Text style={styles.footerText}>Ainda não tem conta? <Text style={styles.linkBold}>Criar conta</Text></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f8fafc' },
  heroImage: { height: 260, width: '100%', justifyContent: 'flex-end' },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', padding: 20, justifyContent: 'flex-end', paddingBottom: 24 },
  badge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 8 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: '800', lineHeight: 30 },
  formContainer: { padding: 24, backgroundColor: '#f8fafc', borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -20 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  logoIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#d1fae5', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  brandTitle: { fontSize: 20, fontWeight: '700', color: '#064e3b' },
  subtitle: { fontSize: 13, color: '#64748b', marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 10, fontWeight: '700', color: '#64748b', marginBottom: 6, letterSpacing: 0.5 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, paddingHorizontal: 14, height: 50 },
  inputIcon: { marginRight: 10 },
  inputText: { flex: 1, fontSize: 14, color: '#1e293b' },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  optionText: { fontSize: 12, color: '#64748b' },
  linkText: { fontSize: 12, color: '#059669', fontWeight: '600' },
  primaryButton: { backgroundColor: '#064e3b', height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  primaryButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  footerRedirect: { alignItems: 'center', paddingBottom: 20 },
  footerText: { fontSize: 13, color: '#64748b' },
  linkBold: { color: '#064e3b', fontWeight: '700' },
  errorText: { color: '#dc2626', fontSize: 12, marginTop: 8, textAlign: 'center' },
});