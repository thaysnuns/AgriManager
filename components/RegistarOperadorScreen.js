// components/RegistarOperadorScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthInput from './ui/AuthInput';
import PrimaryButton from './ui/PrimaryButton';

export default function RegistarOperadorScreen({
  quintaNome = 'Quinta do Vale',
  perfilFixo = 'Operador',
  onBack,
  onRegistarOperador,
}) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [palavraPasse, setPalavraPasse] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [erroForm, setErroForm] = useState('');

  const handleSubmit = () => {
    const nomeLimpo = nomeCompleto.trim();
    const emailLimpo = email.trim();
    const passLimpa = palavraPasse.trim();

    if (!nomeLimpo || !emailLimpo || !passLimpa) {
      setErroForm('Preencha o nome completo, o e-mail e a palavra-passe.');
      return;
    }

    if (passLimpa.length < 8) {
      setErroForm('A palavra-passe deve ter pelo menos 8 caracteres.');
      return;
    }

    setErroForm('');

    if (onRegistarOperador) {
      onRegistarOperador({
        nome: nomeLimpo,
        email: emailLimpo,
        palavraPasse: passLimpa,
        empresa: quintaNome,
        perfil: perfilFixo,
        estado: 'Ativo',
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
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.8}
          delayPressIn={0}
          onPress={() => onBack && onBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>

        <View style={styles.headerTextCol}>
          <Text style={styles.title}>Registar operador</Text>
          <Text style={styles.subtitle}>Perfil · Operadores</Text>
        </View>
      </View>

      <Text style={styles.introText}>
        Crie uma conta para um novo membro da sua equipa.
      </Text>

      {/* Bloco verde claro com empresa e perfil fixos */}
      <View style={styles.lockedBox}>
        <View style={[styles.lockedRow, styles.lockedRowBorder]}>
          <View style={styles.lockedIconWrap}>
            <Ionicons name="business-outline" size={20} color="#24593F" />
          </View>
          <View style={styles.lockedTextCol}>
            <Text style={styles.lockedLabel}>
              Empresa associada automaticamente
            </Text>
            <Text numberOfLines={1} style={styles.lockedValue}>
              {quintaNome}
            </Text>
          </View>
          <Ionicons name="lock-closed-outline" size={17} color="#6E8277" />
        </View>

        <View style={styles.lockedRow}>
          <View style={styles.lockedIconWrap}>
            <Ionicons name="person-outline" size={20} color="#24593F" />
          </View>
          <View style={styles.lockedTextCol}>
            <Text style={styles.lockedLabel}>Perfil de acesso fixo</Text>
            <Text numberOfLines={1} style={styles.lockedValue}>
              {perfilFixo}
            </Text>
          </View>
          <Ionicons name="lock-closed-outline" size={17} color="#6E8277" />
        </View>
      </View>

      {/* Cabeçalho da secção de dados */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Dados do operador</Text>
        <Text style={styles.requiredHint}>Todos obrigatórios</Text>
      </View>

      {/* Nome completo (AuthInput) */}
      <Text style={styles.fieldTopLabel}>Nome completo</Text>
      <AuthInput
        iconName="person-outline"
        iconLibrary="ion"
        value={nomeCompleto}
        onChangeText={(texto) => {
          setNomeCompleto(texto);
          if (erroForm) setErroForm('');
        }}
        placeholder="Ana Martins"
        autoCapitalize="words"
      />

      {/* E-mail (AuthInput) */}
      <Text style={styles.fieldTopLabel}>E-mail</Text>
      <AuthInput
        iconName="mail-outline"
        iconLibrary="ion"
        value={email}
        onChangeText={(texto) => {
          setEmail(texto);
          if (erroForm) setErroForm('');
        }}
        placeholder="ana.martins@email.pt"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Palavra-passe (AuthInput + alternar visibilidade fora do input) */}
      <Text style={styles.fieldTopLabel}>Palavra-passe</Text>
      <View style={styles.passwordGroup}>
        <View style={styles.passwordInputFlex}>
          <AuthInput
            iconName="lock-closed-outline"
            iconLibrary="ion"
            value={palavraPasse}
            onChangeText={(texto) => {
              setPalavraPasse(texto);
              if (erroForm) setErroForm('');
            }}
            placeholder="••••••••••••"
            secureTextEntry={!mostrarPassword}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={styles.eyeBtn}
          activeOpacity={0.8}
          delayPressIn={0}
          onPress={() => setMostrarPassword((prev) => !prev)}
        >
          <Ionicons
            name={mostrarPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#7A8680"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.passwordHint}>
        Use pelo menos 8 caracteres, incluindo letras e números.
      </Text>

      <View style={styles.permissionNoteRow}>
        <Ionicons
          name="shield-checkmark-outline"
          size={17}
          color="#2D7A4F"
          style={styles.permissionIcon}
        />
        <Text style={styles.permissionNoteText}>
          Acesso às tarefas atribuídas, sem permissões de administração.
        </Text>
      </View>

      {erroForm ? <Text style={styles.errorText}>{erroForm}</Text> : null}

      <PrimaryButton
        title="Registar operador"
        iconName="person-add-outline"
        onPress={handleSubmit}
      />
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
    marginBottom: 14,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 12.5,
    color: '#6B7871',
    marginTop: 2,
  },
  introText: {
    fontSize: 13.5,
    color: '#5C6962',
    marginBottom: 14,
  },
  lockedBox: {
    backgroundColor: '#E1ECE4',
    borderRadius: 18,
    paddingHorizontal: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#D0E0D5',
  },
  lockedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  lockedRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#CFE0D4',
  },
  lockedIconWrap: {
    width: 32,
    alignItems: 'center',
    marginRight: 10,
  },
  lockedTextCol: {
    flex: 1,
    marginRight: 8,
  },
  lockedLabel: {
    fontSize: 11.5,
    color: '#5E7267',
  },
  lockedValue: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#1E2923',
    marginTop: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#1E2923',
  },
  requiredHint: {
    fontSize: 12,
    color: '#6B7871',
  },
  fieldTopLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E2923',
    marginBottom: 6,
  },
  passwordGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  passwordInputFlex: {
    flex: 1,
  },
  eyeBtn: {
    width: 48,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordHint: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: -2,
    marginBottom: 12,
  },
  permissionNoteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  permissionIcon: {
    marginRight: 8,
    marginTop: 1,
  },
  permissionNoteText: {
    flex: 1,
    fontSize: 12.5,
    color: '#5C6962',
    lineHeight: 18,
  },
  errorText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#B85D19',
    marginBottom: 12,
  },
});