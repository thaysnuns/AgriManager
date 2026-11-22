// components/OperadorScannerScreen.js — "Scanner QR" (operador)
// A câmara aqui é uma imagem de exemplo. Para ler QR de verdade, usar expo-camera (CameraView) no lugar do ImageBackground.
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground, Image, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FOTO_ETIQUETA = {
  uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85',
};
const IMAGEM_QR = {
  uri: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=VP03-2026&bgcolor=FFFFFF&color=1E2923',
};
const ALTURA_MOLDURA = 210;

export default function OperadorScannerScreen({ onCodigo, onHistorico }) {
  const [lanterna, setLanterna] = useState(false);
  const [codigo, setCodigo] = useState('');
  const inputRef = useRef(null);
  const linha = useRef(new Animated.Value(0)).current; // posição da linha verde que "varre" a moldura

  useEffect(() => {
    const animacao = Animated.loop(
      Animated.sequence([
        Animated.timing(linha, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(linha, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    );
    animacao.start();
    return () => animacao.stop();
  }, [linha]);

  const translateY = linha.interpolate({ inputRange: [0, 1], outputRange: [6, ALTURA_MOLDURA - 10] });

  const enviarCodigo = useCallback(() => {
    const limpo = codigo.trim().toUpperCase();
    if (!limpo) {
      inputRef.current?.focus();
      return;
    }
    onCodigo && onCodigo(limpo);
  }, [codigo, onCodigo]);

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Scanner QR</Text>
          <Text style={styles.subtitle}>Identifique parcela ou equipamento</Text>
        </View>
        <TouchableOpacity style={styles.roundBtn} onPress={onHistorico} activeOpacity={0.8}>
          <Ionicons name="time-outline" size={20} color="#1E2923" />
        </TouchableOpacity>
      </View>

      <ImageBackground source={FOTO_ETIQUETA} style={styles.camera} imageStyle={{ borderRadius: 24 }}>
        <View style={styles.hint}>
          <Text style={styles.hintText}>Alinhe o código dentro da moldura</Text>
        </View>

        <View style={styles.frame}>
          <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />
          <View style={styles.qrCard}>
            <Image source={IMAGEM_QR} style={styles.qrImage} resizeMode="contain" />
          </View>
          <Text style={styles.frameText}>A PROCURAR CÓDIGO...</Text>
        </View>

        <View style={styles.cameraButtons}>
          <TouchableOpacity style={styles.camBtn} onPress={() => setLanterna((v) => !v)} activeOpacity={0.8}>
            <Ionicons name={lanterna ? 'flashlight' : 'flashlight-outline'} size={20} color="#1E2923" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.camBtn} activeOpacity={0.8}>
            <Ionicons name="image-outline" size={20} color="#1E2923" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.manualCard}>
        <Text style={styles.manualTitle}>Não consegue ler o código?</Text>
        <Text style={styles.manualSub}>Introduza o identificador impresso na etiqueta.</Text>
        <View style={styles.inputBox}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={codigo}
            onChangeText={setCodigo}
            placeholder="Ex.: VP03-2026"
            placeholderTextColor="#8B9890"
            autoCapitalize="characters"
            returnKeyType="go"
            onSubmitEditing={enviarCodigo}
          />
          <TouchableOpacity onPress={enviarCodigo} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="arrow-forward" size={20} color="#2D6A4F" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.offlineRow}>
        <Ionicons name="cloud-offline-outline" size={18} color="#6B7871" />
        <Text style={styles.offlineText}>O scanner funciona sem ligação à internet.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 16, paddingBottom: 30, backgroundColor: '#F4F6F3' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 13, color: '#6B7871', marginTop: 2 },
  roundBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E9E6', justifyContent: 'center', alignItems: 'center' },
  camera: { height: 390, borderRadius: 24, overflow: 'hidden', alignItems: 'center', marginBottom: 16 },
  hint: { marginTop: 14, backgroundColor: 'rgba(30,41,35,0.82)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16 },
  hintText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  frame: {
    width: 230, height: ALTURA_MOLDURA, marginTop: 26, borderWidth: 3, borderColor: '#FFFFFF',
    borderRadius: 26, overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 8,
    backgroundColor: 'rgba(30,41,35,0.12)',
  },
  qrCard: {
    position: 'absolute', top: 10, width: 168, height: 168, borderRadius: 18,
    backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center',
    padding: 8, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
  qrImage: { width: 152, height: 152, borderRadius: 10 },
  cameraButtons: { position: 'absolute', bottom: 14, flexDirection: 'row', gap: 70 },
  camBtn: { width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(255,255,255,0.92)', justifyContent: 'center', alignItems: 'center' },
  manualCard: { backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 1, borderColor: '#E5E9E6', padding: 16, marginBottom: 14 },
  manualTitle: { fontSize: 16, fontWeight: '800', color: '#1E2923' },
  manualSub: { fontSize: 12.5, color: '#6B7871', marginTop: 4, marginBottom: 12 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F6F3', borderRadius: 14, paddingHorizontal: 14, height: 50 },
  input: { flex: 1, fontSize: 14, color: '#1E2923' },
  offlineRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4 },
  offlineText: { fontSize: 12.5, color: '#6B7871' },
  scanLine: { position: 'absolute', top: 0, left: 12, right: 12, height: 2, borderRadius: 1, backgroundColor: '#7BE0A6', zIndex: 3 },
  frameText: { fontSize: 11, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.4, zIndex: 4, textShadowColor: 'rgba(0,0,0,0.65)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
});
