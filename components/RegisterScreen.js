// components/RegisterScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BrandLogo from './ui/BrandLogo';
import AuthInput from './ui/AuthInput';
import PrimaryButton from './ui/PrimaryButton';

const ROLES = [
  { key: 'agricultor', label: 'Agricultor', icon: 'tractor-variant' },
  { key: 'operador', label: 'Operador', icon: 'hard-hat' },
  { key: 'administrador', label: 'Administrador', icon: 'shield-check-outline' },
];

export default function RegisterScreen({ onBackToLogin, onRegisterSuccess }) {
  const [role, setRole] = useState('agricultor');
  const [nomeCompleto, setNomeCompleto] = useState('Maria Costa');
  const [empresa, setEmpresa] = useState('Quinta do Vale');
  const [nifEmpresa, setNifEmpresa] = useState('509123456');
  const [moradaEmpresa, setMoradaEmpresa] = useState('Rua do Vale, 12');
  const [emailProfissional, setEmailProfissional] = useState('maria.costa@quintadovale.pt');
  const [password, setPassword] = useState('•••••••••••');
  const [aceitouTermos, setAceitouTermos] = useState(true);
  const [erro, setErro] = useState('');

  const handleContinuar = () => {
    if (!nomeCompleto.trim() || !emailProfissional.trim() || !password.trim()) {
      setErro('Preencha os seus dados pessoais e credenciais de acesso.');
      return;
    }

    if (role === 'agricultor' && (!empresa.trim() || !nifEmpresa.trim() || !moradaEmpresa.trim())) {
      setErro('Os dados fiscais da empresa (nome, NIF e morada) são obrigatórios.');
      return;
    }

    if (!aceitouTermos) {
      setErro('É necessário aceitar os Termos de Utilização e a Política de Privacidade.');
      return;
    }

    setErro('');
    if (onRegisterSuccess) {
      onRegisterSuccess({
        role,
        nomeCompleto: nomeCompleto.trim(),
        empresa: empresa.trim(),
        nifEmpresa: nifEmpresa.trim(),
        moradaEmpresa: moradaEmpresa.trim(),
        email: emailProfissional.trim(),
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Cabeçalho Superior */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={onBackToLogin}>
          <Ionicons name="arrow-back" size={19} color="#1E2923" />
        </TouchableOpacity>
        <BrandLogo size="sm" />
      </View>

      {/* Título e Subtítulo */}
      <Text style={styles.title}>Criar a sua conta</Text>
      <Text style={styles.subtitle}>
        Configure a exploração em poucos passos. Pode convidar a equipa mais tarde.
      </Text>

      {/* Barra de Progresso (3 passos) */}
      <View style={styles.progressRow}>
        <View style={[styles.progressStep, styles.progressStepActive]} />
        <View style={styles.progressStep} />
        <View style={styles.progressStep} />
      </View>

      {/* Seletor de Função */}
      <Text style={styles.sectionLabel}>Qual é a sua função?</Text>
      <View style={styles.rolesRow}>
        {ROLES.map((item) => {
          const ativa = role === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.roleCard, ativa && styles.roleCardActive]}
              onPress={() => setRole(item.key)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={21}
                color={ativa ? '#244735' : '#6B7871'}
              />
              <Text style={[styles.roleText, ativa && styles.roleTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Campos Pessoais e Fiscais da Empresa (RAC0a) */}
      <AuthInput
        label="NOME COMPLETO"
        iconName="person-outline"
        value={nomeCompleto}
        onChangeText={setNomeCompleto}
        placeholder="Maria Costa"
      />

      {role !== 'administrador' && (
        <>
          <AuthInput
            label="EMPRESA / EXPLORAÇÃO"
            iconName="business-outline"
            value={empresa}
            onChangeText={setEmpresa}
            placeholder="Quinta do Vale"
          />

          <AuthInput
            label="NIF- empresa"
            iconName="card-account-details-outline"
            iconLibrary="mci"
            value={nifEmpresa}
            onChangeText={setNifEmpresa}
            placeholder="509123456"
            keyboardType="numeric"
            secureTextEntry
          />

          <AuthInput
            label="MORADA DA EMPRESA"
            iconName="business-outline"
            value={moradaEmpresa}
            onChangeText={setMoradaEmpresa}
            placeholder="Rua do Vale, 12"
          />
        </>
      )}

      <AuthInput
        label="EMAIL PROFISSIONAL"
        iconName="mail-outline"
        value={emailProfissional}
        onChangeText={setEmailProfissional}
        placeholder="maria.costa@quintadovale.pt"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <AuthInput
        label="PALAVRA-PASSE"
        iconName="lock-closed-outline"
        value={password}
        onChangeText={setPassword}
        placeholder="•••••••••••"
        secureTextEntry
      />

      {/* Aceitação dos Termos */}
      <TouchableOpacity
        style={styles.termsRow}
        onPress={() => setAceitouTermos((prev) => !prev)}
        activeOpacity={0.8}
      >
        <View style={[styles.checkbox, aceitouTermos && styles.checkboxChecked]}>
          {aceitouTermos && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
        </View>
        <Text style={styles.termsText}>
          Aceito os Termos de Utilização e a Política de Privacidade.
        </Text>
      </TouchableOpacity>

      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      <PrimaryButton title="Continuar" onPress={handleContinuar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#F4F6F3',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7871',
    marginTop: 6,
    marginBottom: 16,
    lineHeight: 19,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  progressStep: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DCE2DE',
  },
  progressStepActive: {
    backgroundColor: '#244735',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E2923',
    marginBottom: 10,
  },
  rolesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  roleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    gap: 5,
  },
  roleCardActive: {
    backgroundColor: '#DCE7DF',
    borderColor: '#244735',
    borderWidth: 1.5,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7871',
  },
  roleTextActive: {
    fontWeight: '800',
    color: '#244735',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    marginBottom: 18,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#8B9890',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: '#244735',
    borderColor: '#244735',
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: '#5C6962',
    lineHeight: 17,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C2410C',
    marginBottom: 12,
  },
});