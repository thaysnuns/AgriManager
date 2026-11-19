// components/RegistarOperadorScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function RegistarOperadorScreen({ onBack, onOperadorRegistado }) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [palavraPasse, setPalavraPasse] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = () => {
    const nomeLimpo = nomeCompleto.trim();
    const emailLimpo = email.trim().toLowerCase();
    const temLetra = /[A-Za-z]/.test(palavraPasse);
    const temNumero = /\d/.test(palavraPasse);

    if (!nomeLimpo || !emailLimpo || !palavraPasse) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!emailLimpo.includes('@') || !emailLimpo.includes('.')) {
      setErro('Introduza um endereço de e-mail válido.');
      return;
    }

    if (palavraPasse.length < 8 || !temLetra || !temNumero) {
      setErro('A palavra-passe deve ter pelo menos 8 caracteres, incluindo letras e números.');
      return;
    }

    setErro('');
    if (onOperadorRegistado) {
      onOperadorRegistado({
        nome: nomeLimpo,
        email: emailLimpo,
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Registar operador</Text>
          <Text style={styles.subtitle}>Perfil · Operadores</Text>
        </View>
      </View>

      <Text style={styles.leadText}>Crie uma conta para um novo membro da sua equipa.</Text>

      <View style={styles.lockedCard}>
        <View style={styles.lockedRow}>
          <View style={styles.lockedIconBox}>
            <MaterialCommunityIcons name="office-building-outline" size={20} color="#1B3B2B" />
          </View>
          <View style={styles.lockedTextCol}>
            <Text style={styles.lockedLabel}>Empresa associada automaticamente</Text>
            <Text style={styles.lockedValue}>Quinta do Vale</Text>
          </View>
          <Ionicons name="lock-closed-outline" size={18} color="#2D6A4F" />
        </View>

        <View style={styles.divider} />

        <View style={styles.lockedRow}>
          <View style={styles.lockedIconBox}>
            <Ionicons name="person-outline" size={20} color="#1B3B2B" />
          </View>
          <View style={styles.lockedTextCol}>
            <Text style={styles.lockedLabel}>Perfil de acesso fixo</Text>
            <Text style={styles.lockedValue}>Operador</Text>
          </View>
          <Ionicons name="lock-closed-outline" size={18} color="#2D6A4F" />
        </View>
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Dados do operador</Text>
        <Text style={styles.requiredNote}>Todos obrigatórios</Text>
      </View>

      <Text style={styles.fieldLabel}>Nome completo</Text>
      <View style={styles.inputBox}>
        <Ionicons name="person-outline" size={19} color="#7C8A82" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Ana Martins"
          placeholderTextColor="#8B9890"
          value={nomeCompleto}
          onChangeText={(t) => {
            setNomeCompleto(t);
            if (erro) setErro('');
          }}
        />
      </View>

      <Text style={styles.fieldLabel}>E-mail</Text>
      <View style={styles.inputBox}>
        <Ionicons name="mail-outline" size={19} color="#7C8A82" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="ana.martins@email.pt"
          placeholderTextColor="#8B9890"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            if (erro) setErro('');
          }}
        />
      </View>

      <Text style={styles.fieldLabel}>Palavra-passe</Text>
      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={19} color="#7C8A82" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="••••••••••••"
          placeholderTextColor="#8B9890"
          secureTextEntry={!mostrarPassword}
          autoCapitalize="none"
          value={palavraPasse}
          onChangeText={(t) => {
            setPalavraPasse(t);
            if (erro) setErro('');
          }}
        />
        <TouchableOpacity
          onPress={() => setMostrarPassword((prev) => !prev)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={mostrarPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#7C8A82"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.helperText}>
        Use pelo menos 8 caracteres, incluindo letras e números.
      </Text>

      <View style={styles.permissionNoteRow}>
        <Ionicons name="shield-checkmark-outline" size={18} color="#2D6A4F" style={styles.permIcon} />
        <Text style={styles.permissionNoteText}>
          Acesso às tarefas atribuídas, sem permissões de administração.
        </Text>
      </View>

      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        activeOpacity={0.85}
      >
        <Ionicons name="person-add-outline" size={20} color="#FFFFFF" />
        <Text style={styles.submitButtonText}>Registar operador</Text>
      </TouchableOpacity>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
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
  leadText: {
    fontSize: 14,
    color: '#5F6D66',
    marginBottom: 16,
    lineHeight: 20,
  },
  lockedCard: {
    backgroundColor: '#E3ECE6',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D4E2D9',
  },
  lockedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockedIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lockedTextCol: {
    flex: 1,
  },
  lockedLabel: {
    fontSize: 12,
    color: '#5C6C64',
  },
  lockedValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E2923',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#CEE0D5',
    marginVertical: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E2923',
  },
  requiredNote: {
    fontSize: 12,
    color: '#7C8A82',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E2923',
    marginBottom: 7,
    marginTop: 4,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E9E6',
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1E2923',
  },
  helperText: {
    fontSize: 12,
    color: '#7C8A82',
    marginTop: -4,
    marginBottom: 14,
  },
  permissionNoteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 18,
    paddingHorizontal: 2,
  },
  permIcon: {
    marginTop: 1,
  },
  permissionNoteText: {
    flex: 1,
    fontSize: 13,
    color: '#5F6D66',
    lineHeight: 18,
  },
  errorText: {
    color: '#C2410C',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#244735',
    borderRadius: 16,
    paddingVertical: 15,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});