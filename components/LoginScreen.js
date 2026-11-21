// components/LoginScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BrandLogo from './ui/BrandLogo';
import AuthInput from './ui/AuthInput';
import PrimaryButton from './ui/PrimaryButton';

export default function LoginScreen({
  onNavigateToRegister,
  onOpenRegister,
  onLoginSuccess,
}) {
  const [email, setEmail] = useState('maria.costa@quintadovale.pt');
  const [password, setPassword] = useState('•••••••••••');
  const [manterSessao, setManterSessao] = useState(true);
  const [mensagemInfo, setMensagemInfo] = useState('');
  const [erro, setErro] = useState('');

  const handleAbrirRegisto = () => {
    setErro('');
    setMensagemInfo('');
    if (onNavigateToRegister) {
      onNavigateToRegister();
    } else if (onOpenRegister) {
      onOpenRegister();
    }
  };

  const handleEntrar = () => {
    const emailLimpo = email.trim();
    const passLimpa = password.trim();

    if (!emailLimpo || !passLimpa) {
      setMensagemInfo('');
      setErro('Introduza o email e a palavra-passe.');
      return;
    }

    if (!emailLimpo.includes('@')) {
      setMensagemInfo('');
      setErro('Introduza um endereço de email válido.');
      return;
    }

    setErro('');
    setMensagemInfo('');

    if (onLoginSuccess) {
      onLoginSuccess({
        email: emailLimpo,
        manterSessao,
      });
    }
  };

  const handleRecuperarPassword = () => {
    setErro('');
    if (!email.trim()) {
      setMensagemInfo(
        'Indique o seu email acima para receber instruções de recuperação.'
      );
      return;
    }
    setMensagemInfo(
      `Enviámos instruções de recuperação para ${email.trim()}.`
    );
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Imagem Hero Superior */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
        }}
        style={styles.heroImage}
      >
        <View style={styles.heroOverlay}>
          <View style={styles.heroBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.heroBadgeText}>A TERRA, EM TEMPO REAL</Text>
          </View>
          <Text style={styles.heroTitle}>
            Decisões melhores,{'\n'}desde o terreno.
          </Text>
        </View>
      </ImageBackground>

      {/* Corpo do Formulário */}
      <View style={styles.formWrapper}>
        <BrandLogo />

        <Text style={styles.subtitle}>
          Entre para acompanhar campos, equipas e operações agrícolas.
        </Text>

        <AuthInput
          label="EMAIL"
          iconName="mail-outline"
          iconLibrary="ion"
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            if (erro) setErro('');
            if (mensagemInfo) setMensagemInfo('');
          }}
          placeholder="nome@empresa.pt"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <AuthInput
          label="PALAVRA-PASSE"
          iconName="lock-closed-outline"
          iconLibrary="ion"
          value={password}
          onChangeText={(t) => {
            setPassword(t);
            if (erro) setErro('');
          }}
          placeholder="•••••••••••"
          secureTextEntry
        />

        <View style={styles.linksRow}>
          <TouchableOpacity
            style={styles.keepSignedBtn}
            activeOpacity={0.75}
            delayPressIn={0}
            onPress={() => setManterSessao((prev) => !prev)}
          >
            <View
              style={[
                styles.checkboxBox,
                manterSessao && styles.checkboxBoxActive,
              ]}
            >
              {manterSessao ? (
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              ) : null}
            </View>
            <Text style={styles.keepSignedText}>Manter sessão iniciada</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            delayPressIn={0}
            onPress={handleRecuperarPassword}
          >
            <Text style={styles.forgotText}>Esqueci-me da palavra-passe</Text>
          </TouchableOpacity>
        </View>

        {mensagemInfo ? (
          <View style={styles.infoBox}>
            <Ionicons
              name="information-circle-outline"
              size={17}
              color="#24593F"
            />
            <Text style={styles.infoText}>{mensagemInfo}</Text>
          </View>
        ) : null}

        {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

        <PrimaryButton title="Entrar" onPress={handleEntrar} />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Ainda não tem conta? </Text>
          <TouchableOpacity
            onPress={handleAbrirRegisto}
            activeOpacity={0.75}
            delayPressIn={0}
          >
            <Text style={styles.footerLink}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: '#F4F6F3',
  },
  heroImage: {
    height: 255,
    width: '100%',
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    padding: 20,
    paddingBottom: 24,
    backgroundColor: 'rgba(20, 32, 24, 0.34)',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 246, 243, 0.92)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  greenDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#2D6A4F',
    marginRight: 6,
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1E2923',
    letterSpacing: 0.4,
  },
  heroTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 30,
  },
  formWrapper: {
    padding: 22,
    paddingTop: 22,
    paddingBottom: 32,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7871',
    marginTop: 12,
    marginBottom: 18,
    lineHeight: 19,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 2,
    marginBottom: 18,
  },
  keepSignedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  checkboxBox: {
    width: 17,
    height: 17,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#8B9890',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxActive: {
    backgroundColor: '#1B3B2B',
    borderColor: '#1B3B2B',
  },
  keepSignedText: {
    fontSize: 12,
    color: '#6B7871',
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#244735',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#DCEAE0',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#1E2923',
    lineHeight: 17,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C2410C',
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#6B7871',
  },
  footerLink: {
    fontSize: 13,
    fontWeight: '800',
    color: '#244735',
  },
});