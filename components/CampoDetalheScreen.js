// components/CampoDetalheScreen.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CampoDetalheScreen({ campo, onBack }) {
  // Dados dinâmicos consoante o campo clicado (com valores exatos da imagem para Olival Norte)
  const isOlival = !campo || campo.nome === 'Olival Norte';
  const isVinha = campo?.nome === 'Vinha do Poente';

  const titulo = campo?.nome || 'Olival Norte';
  const area = isOlival ? '42,8 ha' : isVinha ? '18,6 ha' : '31,2 ha';
  const estado = campo?.estado || 'Saudável';
  const parcelasLabel = isOlival ? '4 parcelas' : isVinha ? '3 parcelas' : '2 parcelas';
  const cultura = isOlival ? 'Oliveira Galega' : isVinha ? 'Touriga Nacional' : 'Trigo Mole';
  const humidade = isOlival ? '64%' : isVinha ? '38%' : '59%';
  const humidadeNota = isOlival ? 'Ideal' : isVinha ? 'Baixa' : 'Ideal';
  const vigor = isOlival ? '0,82' : isVinha ? '0,61' : '0,76';
  const vigorNota = isOlival ? '+4% / 7 dias' : isVinha ? '-3% / 7 dias' : '+2% / 7 dias';
  const verTotal = isOlival ? 'Ver 4' : isVinha ? 'Ver 3' : 'Ver 2';

  const parcelas = isOlival
    ? [
        {
          id: '1',
          nome: 'Parcela ON-01',
          subtitulo: '12,4 ha · oliveiras 8 anos',
          badge: 'SEM ALERTAS',
          badgeColor: '#2D6A4F',
          iconBg: '#E3ECE6',
          iconColor: '#1B3B2B',
        },
        {
          id: '2',
          nome: 'Parcela ON-02',
          subtitulo: '10,8 ha · próxima rega amanhã',
          badge: 'PLANEADA',
          badgeColor: '#2B6CB0',
          iconBg: '#E2ECF5',
          iconColor: '#2B6CB0',
        },
      ]
    : isVinha
    ? [
        {
          id: '1',
          nome: 'Parcela VP-01',
          subtitulo: '6,4 ha · vinha velha',
          badge: 'REGA URGENTE',
          badgeColor: '#C26D1F',
          iconBg: '#F6E8D8',
          iconColor: '#C26D1F',
        },
        {
          id: '2',
          nome: 'Parcela VP-02',
          subtitulo: '6,2 ha · próxima rega hoje',
          badge: 'PLANEADA',
          badgeColor: '#2B6CB0',
          iconBg: '#E2ECF5',
          iconColor: '#2B6CB0',
        },
      ]
    : [
        {
          id: '1',
          nome: 'Parcela CS-01',
          subtitulo: '16,0 ha · sequeiro',
          badge: 'SEM ALERTAS',
          badgeColor: '#2D6A4F',
          iconBg: '#E3ECE6',
          iconColor: '#1B3B2B',
        },
        {
          id: '2',
          nome: 'Parcela CS-02',
          subtitulo: '15,2 ha · monitorização ativa',
          badge: 'SEM ALERTAS',
          badgeColor: '#2D6A4F',
          iconBg: '#E3ECE6',
          iconColor: '#1B3B2B',
        },
      ];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho com botão voltar, título e botões de menu */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>

        <View style={styles.headerTitleBox}>
          <Text style={styles.title}>{titulo}</Text>
          <Text style={styles.subtitle}>Campo · atualizado há 12 min</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.circleBtn}>
            <Ionicons name="ellipsis-horizontal" size={18} color="#1E2923" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.circleBtn, styles.circleBtnDanger]}>
            <Ionicons name="ellipsis-horizontal" size={18} color="#C26D1F" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Imagem aérea do campo */}
      <View style={styles.mapCardWrapper}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
          }}
          style={styles.mapImage}
          imageStyle={{ borderRadius: 18 }}
        >
          <View style={styles.mapBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.mapBadgeText}>{area} · perímetro validado</Text>
          </View>

          <TouchableOpacity style={styles.locateButton}>
            <Ionicons name="locate-outline" size={20} color="#1B3B2B" />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* Etiquetas (Saudável, 4 parcelas, Oliveira Galega) */}
      <View style={styles.tagsRow}>
        <View
          style={[
            styles.tagPill,
            isVinha ? styles.tagPillWarning : styles.tagPillSuccess,
          ]}
        >
          <View
            style={[
              styles.tagDot,
              { backgroundColor: isVinha ? '#C26D1F' : '#2D6A4F' },
            ]}
          />
          <Text
            style={[
              styles.tagTextBold,
              { color: isVinha ? '#C26D1F' : '#2D6A4F' },
            ]}
          >
            {estado}
          </Text>
        </View>

        <View style={styles.tagPillNeutral}>
          <Text style={styles.tagTextNeutral}>{parcelasLabel}</Text>
        </View>

        <View style={styles.tagPillNeutral}>
          <Text style={styles.tagTextNeutral}>{cultura}</Text>
        </View>
      </View>

      {/* Cartões de Métricas (Humidade e Vigor médio) */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <View style={[styles.metricIconBox, { backgroundColor: '#E2ECF5' }]}>
            <Ionicons name="water-outline" size={20} color="#2B6CB0" />
          </View>
          <Text style={styles.metricValue}>{humidade}</Text>
          <Text style={styles.metricLabel}>Humidade</Text>
          <Text style={[styles.metricNote, { color: isVinha ? '#C26D1F' : '#2B6CB0' }]}>
            {humidadeNota}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <View style={[styles.metricIconBox, { backgroundColor: '#E3ECE6' }]}>
            <Ionicons name="pulse-outline" size={20} color="#1B3B2B" />
          </View>
          <Text style={styles.metricValue}>{vigor}</Text>
          <Text style={styles.metricLabel}>Vigor médio</Text>
          <Text style={[styles.metricNote, { color: isVinha ? '#C26D1F' : '#2D6A4F' }]}>
            {vigorNota}
          </Text>
        </View>
      </View>

      {/* Secção: Parcelas */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Parcelas</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllLink}>{verTotal}</Text>
        </TouchableOpacity>
      </View>

      {parcelas.map((item) => (
        <View key={item.id} style={styles.parcelaCard}>
          <View style={[styles.parcelaIconBox, { backgroundColor: item.iconBg }]}>
            <Ionicons name="layers-outline" size={22} color={item.iconColor} />
          </View>

          <View style={styles.parcelaInfo}>
            <Text style={styles.parcelaNome}>{item.nome}</Text>
            <Text style={styles.parcelaSub}>{item.subtitulo}</Text>
          </View>

          <Text style={[styles.parcelaBadge, { color: item.badgeColor }]}>
            {item.badge}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 30,
    backgroundColor: '#F4F6F3',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8ECE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitleBox: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E2923',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  circleBtnDanger: {
    backgroundColor: '#FAF0EA',
    borderColor: '#F3D6C6',
  },
  mapCardWrapper: {
    marginBottom: 16,
    borderRadius: 18,
    overflow: 'hidden',
  },
  mapImage: {
    height: 180,
    width: '100%',
    justifyContent: 'space-between',
    padding: 12,
  },
  mapBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2D6A4F',
    marginRight: 6,
  },
  mapBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E2923',
  },
  locateButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagPillSuccess: {
    backgroundColor: '#DCE7DF',
  },
  tagPillWarning: {
    backgroundColor: '#F6E8D8',
  },
  tagDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 6,
  },
  tagTextBold: {
    fontSize: 12,
    fontWeight: '700',
  },
  tagPillNeutral: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E9E6',
  },
  tagTextNeutral: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5751',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  metricIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E2923',
  },
  metricLabel: {
    fontSize: 13,
    color: '#6B7871',
    marginTop: 2,
    marginBottom: 8,
  },
  metricNote: {
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E2923',
  },
  seeAllLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D6A4F',
  },
  parcelaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  parcelaIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  parcelaInfo: {
    flex: 1,
  },
  parcelaNome: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2923',
  },
  parcelaSub: {
    fontSize: 12,
    color: '#6B7871',
    marginTop: 3,
  },
  parcelaBadge: {
    fontSize: 11,
    fontWeight: '800',
  },
});
