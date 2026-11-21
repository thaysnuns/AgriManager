import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PrimaryButton from './ui/PrimaryButton';

function formatarArea(area) {
  if (typeof area === 'number') {
    return `${area.toFixed(1).replace('.', ',')} ha`;
  }
  if (typeof area === 'string' && area.trim().length > 0) {
    const limpa = area.trim().replace('.', ',');
    return limpa.includes('ha') ? limpa : `${limpa} ha`;
  }
  return '0,0 ha';
}

function gerarMatrizQr(texto = 'VP05-2026', tamanho = 15) {
  let seed = 0;
  for (let i = 0; i < texto.length; i += 1) {
    seed = (seed * 31 + texto.charCodeAt(i)) % 1000000007;
  }

  const esFinder = (r, c, startR, startC) =>
    r >= startR && r < startR + 5 && c >= startC && c < startC + 5;

  const isFinderFill = (r, c, startR, startC) => {
    const dr = r - startR;
    const dc = c - startC;
    if (dr === 0 || dr === 4 || dc === 0 || dc === 4) return true;
    if (dr >= 1 && dr <= 3 && dc >= 1 && dc <= 3) return true;
    return false;
  };

  const matriz = [];
  for (let r = 0; r < tamanho; r += 1) {
    const linha = [];
    for (let c = 0; c < tamanho; c += 1) {
      if (esFinder(r, c, 0, 0)) {
        linha.push(isFinderFill(r, c, 0, 0));
      } else if (esFinder(r, c, 0, tamanho - 5)) {
        linha.push(isFinderFill(r, c, 0, tamanho - 5));
      } else if (esFinder(r, c, tamanho - 5, 0)) {
        linha.push(isFinderFill(r, c, tamanho - 5, 0));
      } else {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        linha.push((seed >>> 24) % 2 === 0);
      }
    }
    matriz.push(linha);
  }
  return matriz;
}

export default function ParcelaCriadaScreen({
  parcela,
  onBack,
  onVerDetalhes,
  onVoltarParcelas,
}) {
  if (!parcela) return null;

  const nomeParcela = parcela.nome || 'Parcela VP-05';
  const nomeCampo = parcela.campoNome || parcela.campo || 'Vinha do Poente';
  const areaTexto = formatarArea(parcela.area);
  const qrCodigo = parcela.qrCode || 'VP05-2026';

  const matrizQr = useMemo(() => gerarMatrizQr(qrCodigo, 15), [qrCodigo]);

  const handleVoltar = () => {
    if (onVoltarParcelas) {
      onVoltarParcelas();
    } else if (onBack) {
      onBack();
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
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={handleVoltar}
        >
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>

        <View style={styles.headerTextCol}>
          <Text style={styles.headerTitle}>Parcela criada</Text>
          <Text style={styles.headerSubtitle}>
            Parcelas · QR code associado
          </Text>
        </View>
      </View>

      {/* Ícone de sucesso */}
      <View style={styles.successIconBadge}>
        <Ionicons name="checkmark" size={22} color="#2A6F4E" />
      </View>

      <Text style={styles.successTitle}>Parcela criada com sucesso</Text>
      <Text style={styles.successSubtitle}>
        O QR code foi gerado automaticamente e já está associado à sua parcela.
      </Text>

      {/* Cartão da parcela com QR code */}
      <View style={styles.qrCard}>
        <Text numberOfLines={1} style={styles.parcelaNome}>
          {nomeParcela}
        </Text>
        <Text numberOfLines={1} style={styles.parcelaMeta}>
          {nomeCampo} · {areaTexto}
        </Text>

        <View style={styles.qrBox}>
          {matrizQr.map((linha, rIdx) => (
            <View key={`row-${rIdx}`} style={styles.qrRow}>
              {linha.map((ativa, cIdx) => (
                <View
                  key={`cell-${rIdx}-${cIdx}`}
                  style={[
                    styles.qrCell,
                    ativa ? styles.qrCellDark : styles.qrCellLight,
                  ]}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.qrCodePill}>
          <Text style={styles.qrCodeText}>{qrCodigo}</Text>
        </View>

        <Text style={styles.qrHelper}>
          Identificador único gerado na criação da parcela.
        </Text>
      </View>

      {/* Dica de leitura */}
      <View style={styles.hintRow}>
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={18}
          color="#24593F"
          style={styles.hintIcon}
        />
        <Text style={styles.hintText}>
          Leia este QR code para identificar a parcela. Pode consultá-lo
          novamente nos detalhes.
        </Text>
      </View>

      {/* Ações principais */}
      <PrimaryButton
        title="Ver detalhes da parcela"
        showIcon={true}
        onPress={() => onVerDetalhes && onVerDetalhes(parcela)}
      />

      <TouchableOpacity
        style={styles.secondaryBtn}
        activeOpacity={0.85}
        delayPressIn={0}
        onPress={handleVoltar}
      >
        <Text style={styles.secondaryBtnText}>Voltar às parcelas</Text>
      </TouchableOpacity>
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
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 28,
    backgroundColor: '#F4F6F3',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8ECE8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E2923',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#7A8680',
    marginTop: 1,
  },
  successIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCEAE0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  successTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#1E2923',
    textAlign: 'center',
    marginBottom: 6,
  },
  successSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: '#6B7871',
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
    marginBottom: 14,
  },
  parcelaNome: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E2923',
    textAlign: 'center',
  },
  parcelaMeta: {
    fontSize: 12.5,
    color: '#7A8680',
    marginTop: 3,
    marginBottom: 18,
    textAlign: 'center',
  },
  qrBox: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
  },
  qrRow: {
    flexDirection: 'row',
  },
  qrCell: {
    width: 9,
    height: 9,
  },
  qrCellDark: {
    backgroundColor: '#1E2923',
  },
  qrCellLight: {
    backgroundColor: '#FFFFFF',
  },
  qrCodePill: {
    backgroundColor: '#E3EEE6',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
  },
  qrCodeText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#24593F',
    letterSpacing: 0.4,
  },
  qrHelper: {
    fontSize: 11.5,
    color: '#7A8680',
    textAlign: 'center',
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 6,
    marginBottom: 18,
    gap: 10,
  },
  hintIcon: {
    marginTop: 1,
  },
  hintText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    color: '#6B7871',
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  secondaryBtnText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1E2923',
  },
});