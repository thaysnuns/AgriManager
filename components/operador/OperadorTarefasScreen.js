// components/OperadorTarefasScreen.js — "As minhas tarefas" (operador)
import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SectionHeader from '../ui/SectionHeader';
import FilterChips from '../ui/FilterChips';

const TAREFAS = [
  {
    id: 't1', estado: 'curso', titulo: 'Inspeção fitossanitária',
    local: 'Vinha do Poente · Parcela VP-03 · 6,2 ha', progresso: 0.55,
  },
  {
    id: 't2', estado: 'seguir', titulo: 'Verificar rega setor 4', subtitulo: '11:30 · Olival Norte',
    etiqueta: 'ALTA', etiquetaCor: '#C26D1F',
    icone: { lib: 'ion', name: 'water-outline' }, iconBg: '#F6E8D8', iconColor: '#C26D1F',
  },
  {
    id: 't3', estado: 'seguir', titulo: 'Preparar equipamento', subtitulo: '13:00 · Armazém central',
    etiqueta: 'NORMAL', etiquetaCor: '#2B6C8F',
    icone: { lib: 'mci', name: 'tractor' }, iconBg: '#DCE8EE', iconColor: '#2B6C8F',
  },
  {
    id: 't4', estado: 'seguir', titulo: 'Registar aplicação', subtitulo: '15:00 · Cereal Sul',
    etiqueta: 'NORMAL', etiquetaCor: '#2B6C8F',
    icone: { lib: 'ion', name: 'clipboard-outline' }, iconBg: '#E3ECE6', iconColor: '#1B3B2B',
  },
  {
    id: 't5', estado: 'seguir', titulo: 'Limpar equipamento', subtitulo: '15:45 · Armazém central',
    etiqueta: 'NORMAL', etiquetaCor: '#2B6C8F',
    icone: { lib: 'ion', name: 'build-outline' }, iconBg: '#E3ECE6', iconColor: '#1B3B2B',
  },
  {
    id: 't6', estado: 'concluida', titulo: 'Calibrar pulverizador', subtitulo: '07:30 · Armazém central',
    etiqueta: 'CONCLUÍDA', etiquetaCor: '#2D6A4F',
    icone: { lib: 'ion', name: 'checkmark-circle-outline' }, iconBg: '#E3ECE6', iconColor: '#2D6A4F',
  },
  {
    id: 't7', estado: 'concluida', titulo: 'Recolher amostras de solo', subtitulo: '09:00 · Vinha do Poente',
    etiqueta: 'CONCLUÍDA', etiquetaCor: '#2D6A4F',
    icone: { lib: 'ion', name: 'checkmark-circle-outline' }, iconBg: '#E3ECE6', iconColor: '#2D6A4F',
  },
];

const dois = (n) => String(n).padStart(2, '0');

export default function OperadorTarefasScreen({ iniciais = 'MC', user, onContinuar, onAbrirMapa, onSelectTarefa, onOpenPerfil }) {
  const [filtro, setFiltro] = useState('hoje');
  const [segundos, setSegundos] = useState(1 * 3600 + 24 * 60 + 18); // cronómetro da tarefa em curso

  useEffect(() => {
    const id = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const cronometro = useMemo(
    () => `${dois(Math.floor(segundos / 3600))}:${dois(Math.floor((segundos % 3600) / 60))}:${dois(segundos % 60)}`,
    [segundos]
  );

  const { emCurso, aSeguir, concluidas } = useMemo(
    () => ({
      emCurso: TAREFAS.find((t) => t.estado === 'curso'),
      aSeguir: TAREFAS.filter((t) => t.estado === 'seguir'),
      concluidas: TAREFAS.filter((t) => t.estado === 'concluida'),
    }),
    []
  );

  const chips = [
    { key: 'hoje', label: `Hoje ${aSeguir.length + 1}` },
    { key: 'curso', label: 'Em curso 1', variant: 'success' },
    { key: 'concluidas', label: `Concluídas ${concluidas.length}` },
  ];

  const renderIcone = (t) =>
    t.icone.lib === 'mci' ? (
      <MaterialCommunityIcons name={t.icone.name} size={22} color={t.iconColor} />
    ) : (
      <Ionicons name={t.icone.name} size={22} color={t.iconColor} />
    );

  const listaVisivel = filtro === 'concluidas' ? concluidas : filtro === 'hoje' ? aSeguir : [];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>As minhas tarefas</Text>
          <Text style={styles.subtitle}>{user?.email || 'Operador · Equipa Campo A'}</Text>
        </View>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => onOpenPerfil && onOpenPerfil()}
          activeOpacity={0.85}
        >
          <Text style={styles.avatarText}>{iniciais}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.shiftCard}>
        <View>
          <Text style={styles.shiftLabel}>Turno de hoje</Text>
          <Text style={styles.shiftHours}>07:00 — 16:00</Text>
        </View>
        <View style={styles.shiftPill}>
          <View style={styles.shiftDot} />
          <Text style={styles.shiftPillText}>Em serviço</Text>
        </View>
      </View>

      <FilterChips items={chips} activeKey={filtro} onSelect={setFiltro} style={{ marginBottom: 14 }} />

      {emCurso && filtro !== 'concluidas' && (
        <View style={styles.activeCard}>
          <View style={styles.activeTop}>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>EM CURSO</Text>
            </View>
            <Text style={styles.timer}>{cronometro}</Text>
          </View>
          <Text style={styles.activeTitle}>{emCurso.titulo}</Text>
          <Text style={styles.activeSub}>{emCurso.local}</Text>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${emCurso.progresso * 100}%` }]} />
          </View>
          <View style={styles.activeButtons}>
            <TouchableOpacity style={styles.btnDark} onPress={() => onContinuar && onContinuar(emCurso)} activeOpacity={0.85}>
              <Ionicons name="play-outline" size={18} color="#FFFFFF" />
              <Text style={styles.btnDarkText}>Continuar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLight} onPress={() => onAbrirMapa && onAbrirMapa(emCurso)} activeOpacity={0.85}>
              <Ionicons name="map-outline" size={18} color="#1E2923" />
              <Text style={styles.btnLightText}>Abrir mapa</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {filtro !== 'curso' && (
        <>
          <SectionHeader
            title={filtro === 'concluidas' ? 'Concluídas' : 'A seguir'}
            actionLabel={`${listaVisivel.length} tarefas`}
          />
          {listaVisivel.map((t) => (
            <TouchableOpacity
              key={t.id}
              style={styles.taskCard}
              activeOpacity={0.85}
              onPress={() => onSelectTarefa && onSelectTarefa(t)}
            >
              <View style={[styles.taskIcon, { backgroundColor: t.iconBg }]}>{renderIcone(t)}</View>
              <View style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>{t.titulo}</Text>
                <Text style={styles.taskSub}>{t.subtitulo}</Text>
              </View>
              <Text style={[styles.taskBadge, { color: t.etiquetaCor }]}>{t.etiqueta}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 16, paddingBottom: 30, backgroundColor: '#F4F6F3' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 13, color: '#6B7871', marginTop: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#DCE7DF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 14, fontWeight: '800', color: '#244735' },
  shiftCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#27505F', borderRadius: 20, padding: 18, marginBottom: 14,
  },
  shiftLabel: { fontSize: 13, color: '#B7CFD9' },
  shiftHours: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', marginTop: 4 },
  shiftPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.14)', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 16 },
  shiftDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#6FD39A' },
  shiftPillText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  activeCard: { backgroundColor: '#DCE8EE', borderRadius: 20, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#C9DCE5' },
  activeTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  activeBadge: { backgroundColor: '#3F7A96', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  activeBadgeText: { fontSize: 10, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.3 },
  timer: { fontSize: 14, fontWeight: '800', color: '#2B6C8F' },
  activeTitle: { fontSize: 19, fontWeight: '800', color: '#1E2923' },
  activeSub: { fontSize: 12, color: '#5F6D66', marginTop: 4, marginBottom: 14 },
  progressBg: { height: 7, backgroundColor: '#FFFFFF', borderRadius: 4, overflow: 'hidden', marginBottom: 14 },
  progressFill: { height: '100%', backgroundColor: '#3F7A96', borderRadius: 4 },
  activeButtons: { flexDirection: 'row', gap: 10 },
  btnDark: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#244735', borderRadius: 14, paddingHorizontal: 18, paddingVertical: 13 },
  btnDarkText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  btnLight: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFFFFF', borderRadius: 14, paddingHorizontal: 18, paddingVertical: 13, borderWidth: 1, borderColor: '#E5E9E6' },
  btnLightText: { color: '#1E2923', fontSize: 14, fontWeight: '800' },
  taskCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E5E9E6' },
  taskIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  taskTitle: { fontSize: 15, fontWeight: '800', color: '#1E2923' },
  taskSub: { fontSize: 12, color: '#6B7871', marginTop: 3 },
  taskBadge: { fontSize: 11, fontWeight: '800', marginLeft: 8 },
});
