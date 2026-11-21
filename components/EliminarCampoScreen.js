import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const IMAGEM_AEREA_ELIMINAR = {
  uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
};

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

export default function EliminarCampoScreen({
  campo,
  onCancel,
  onConfirmDelete,
}) {
  if (!campo) return null;

  const nomeCampo = campo.nome || 'Campo';
  const areaTexto = formatarArea(campo.area);
  const culturaTexto = campo.cultura || 'Cultura agrícola';
  const parcelasCount = campo.parcelasCount ?? 0;

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
          onPress={() => onCancel && onCancel()}
        >
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>

        <View style={styles.headerTextCol}>
          <Text style={styles.headerTitle}>Eliminar campo</Text>
          <Text style={styles.headerSubtitle}>
            Campos · Confirmar eliminação
          </Text>
        </View>
      </View>

      {/* Ícone de alerta superior */}
      <View style={styles.topTrashBadge}>
        <Ionicons name="trash-outline" size={20} color="#B9382E" />
      </View>

      {/* Pergunta e descrição */}
      <Text style={styles.questionTitle}>Eliminar {nomeCampo}?</Text>
      <Text style={styles.questionDescription}>
        Confirme que pretende eliminar este campo de cultivo da Terra Clara.
      </Text>

      {/* Fotografia aérea */}
      <View style={styles.mapCard}>
        <Image
          source={IMAGEM_AEREA_ELIMINAR}
          style={styles.mapImage}
          resizeMode="cover"
        />
      </View>

      {/* Resumo do campo */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryTopRow}>
          <View style={styles.summaryIconBox}>
            <MaterialCommunityIcons
              name="pine-tree"
              size={20}
              color="#2A6F4E"
            />
          </View>

          <View style={styles.summaryInfoCol}>
            <Text numberOfLines={1} style={styles.summaryName}>
              {nomeCampo}
            </Text>
            <Text numberOfLines={1} style={styles.summaryMeta}>
              {areaTexto} · {culturaTexto}
            </Text>
          </View>
        </View>

        <Text style={styles.summaryParcelas}>
          {parcelasCount} {parcelasCount === 1 ? 'parcela associada' : 'parcelas associadas'} a este campo.
        </Text>
      </View>

      {/* Aviso de ação irreversível */}
      <View style={styles.warningCard}>
        <Ionicons
          name="warning-outline"
          size={18}
          color="#B9382E"
          style={styles.warningIcon}
        />
        <View style={styles.warningTextCol}>
          <Text style={styles.warningTitle}>Esta ação não pode ser anulada</Text>
          <Text style={styles.warningBody}>
            A confirmação aplica-se apenas ao campo selecionado, não à eliminação de parcelas ou históricos.
          </Text>
        </View>
      </View>

      {/* Botões Cancelar / Sim, eliminar campo */}
      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={styles.cancelBtn}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={() => onCancel && onCancel()}
        >
          <Text style={styles.cancelBtnText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.confirmDeleteBtn}
          activeOpacity={0.85}
          delayPressIn={0}
          onPress={() => onConfirmDelete && onConfirmDelete(campo)}
        >
          <Ionicons name="trash-outline" size={17} color="#FFFFFF" />
          <Text style={styles.confirmDeleteBtnText}>Sim, eliminar campo</Text>
        </TouchableOpacity>
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
  topTrashBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F9E6E4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E2923',
    marginBottom: 6,
  },
  questionDescription: {
    fontSize: 13.5,
    lineHeight: 19,
    color: '#6B7871',
    marginBottom: 16,
  },
  mapCard: {
    width: '100%',
    height: 152,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#DCE5DE',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  summaryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#E1ECE4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  summaryInfoCol: {
    flex: 1,
  },
  summaryName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E2923',
  },
  summaryMeta: {
    fontSize: 12,
    color: '#7A8680',
    marginTop: 2,
  },
  summaryParcelas: {
    fontSize: 12,
    color: '#6B7871',
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FCECEB',
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#F3D2CF',
  },
  warningIcon: {
    marginRight: 10,
    marginTop: 1,
  },
  warningTextCol: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#B9382E',
    marginBottom: 3,
  },
  warningBody: {
    fontSize: 12,
    lineHeight: 17,
    color: '#7A5653',
  },
  actionsSection: {
    gap: 10,
  },
  cancelBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE2DD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1E2923',
  },
  confirmDeleteBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#B4382E',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  confirmDeleteBtnText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});