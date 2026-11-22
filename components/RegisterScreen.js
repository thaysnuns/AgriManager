// components/RegisterScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BrandLogo from './ui/BrandLogo';
import AuthInput from './ui/Authinput';
import PrimaryButton from './ui/PrimaryButton';

export default function RegisterScreen({ onBackToLogin, onRegisterSuccess }) {
  const role = 'agricultor';

  const [nomeCompleto, setNomeCompleto] = useState('Maria Costa');
  const [empresa, setEmpresa] = useState('Quinta do Vale');
  const [nifEmpresa, setNifEmpresa] = useState('509123456');
  const [moradaEmpresa, setMoradaEmpresa] = useState('Rua do Vale, 12');
  const [emailProfissional, setEmailProfissional] = useState('maria.costa@quintadovale.pt');
  const [password, setPassword] = useState('123456');
  const [aceitouTermos, setAceitouTermos] = useState(true);
  const [erro, setErro] = useState('');

  const handleContinuar = () => {
    if (!nomeCompleto.trim() || !emailProfissional.trim() || !password.trim()) {
      setErro('Preencha os seus dados pessoais e credenciais de acesso.');
      return;
    }

    if (!empresa.trim() || !nifEmpresa.trim() || !moradaEmpresa.trim()) {
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
      style={styles.scrollView}
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
        Registo de Agricultor e dados fiscais da exploração. Pode convidar operadores mais tarde.
      </Text>

      {/* Barra de Progresso */}
      <View style={styles.progressRow}>
        <View style={[styles.progressStep, styles.progressStepActive]} />
        <View style={styles.progressStep} />
        <View style={styles.progressStep} />
      </View>

      {/* Identificação de Perfil Fixo: Agricultor */}
      <View style={styles.roleBanner}>
        <Ionicons name="leaf-outline" size={18} color="#244735" />
        <Text style={styles.roleBannerText}>Conta de Agricultor (Exploração Agrícola)</Text>
      </View>

      {/* Campos Pessoais e Fiscais da Empresa (RFA0 / RAC0a) */}
      <AuthInput
        label="NOME COMPLETO"
        iconName="person-outline"
        value={nomeCompleto}
        onChangeText={setNomeCompleto}
        placeholder="Maria Costa"
      />

      <AuthInput
        label="EMPRESA / EXPLORAÇÃO"
        iconName="business-outline"
        value={empresa}
        onChangeText={setEmpresa}
        placeholder="Quinta do Vale"
      />

      <AuthInput
        label="NIF- empresa"
        iconName="card-outline"
        value={nifEmpresa}
        onChangeText={setNifEmpresa}
        placeholder="509123456"
        keyboardType="numeric"
        secureTextEntry
      />

      <AuthInput
        label="MORADA DA EMPRESA"
        iconName="location-outline"
        value={moradaEmpresa}
        onChangeText={setMoradaEmpresa}
        placeholder="Rua do Vale, 12"
      />

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
          {aceitouTermos ? (
            <Ionicons name="checkmark" size={14} color="#FFFFFF" />
          ) : null}
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
  scrollView: {
    flex: 1,
    backgroundColor: '#F4F6F3',
  },
  container: {
    flexGrow: 1,
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
    marginBottom: 16,
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
  roleBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#DCE7DF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#C5D8CB',
  },
  roleBannerText: {
    fontSize: 13,
    fontWeight: '700',
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