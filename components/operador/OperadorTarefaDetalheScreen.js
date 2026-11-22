// components/OperadorTarefaDetalheScreen.js
// Abre quando o operador toca numa tarefa da lista: iniciar, pausar, finalizar, reportar problema.
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeader from '../ui/SectionHeader';
import PrimaryButton from '../ui/PrimaryButton';

const ESTADOS = {
  pendente: { rotulo: 'PENDENTE', fundo: '#FFFFFF', borda: '#E5E9E6', badge: '#6B7871' },
  curso: { rotulo: 'EM CURSO', fundo: '#DCE8EE', borda: '#C9DCE5', badge: '#3F7A96' },
  pausada: { rotulo: 'EM PAUSA', fundo: '#F6E8D8', borda: '#EED6BC', badge: '#C26D1F' },
  concluida: { rotulo: 'CONCLUÍDA', fundo: '#E3ECE6', borda: '#CFE0D5', badge: '#2D6A4F' },
};

const PASSOS = [
  'Confirmar a localização (ler o QR da parcela)',
  'Executar a tarefa no local',
  'Registar fotografia e incidência',
  'Verificar equipamento e arrumar material',
];

const PROBLEMAS = ['Equipamento avariado', 'Mau tempo', 'Acesso bloqueado', 'Outro'];

const dois = (n) => String(n).padStart(2, '0');

function BotaoClaro({ icone, texto, onPress, cor = '#1E2923' }) {
  return (
    <TouchableOpacity style={styles.btnClaro} onPress={onPress} activeOpacity={0.85}>
      <Ionicons name={icone} size={18} color={cor} />
      <Text style={[styles.btnClaroTexto, { color: cor }]}>{texto}</Text>
    </TouchableOpacity>
  );
}

export default function OperadorTarefaDetalheScreen({
  tarefa,
  onBack,
  onEstadoChange,
  onAbrirMapa,
  onLerQR,
  onReportar,
}) {
  const inicial = tarefa?.estado === 'curso' ? 'curso' : tarefa?.estado === 'concluida' ? 'concluida' : 'pendente';

  const [estado, setEstado] = useState(inicial);
  const [segundos, setSegundos] = useState(inicial === 'curso' ? 1 * 3600 + 24 * 60 + 18 : 0);
  const [feitos, setFeitos] = useState(
    inicial === 'concluida' ? PASSOS.map((_, i) => i) : inicial === 'curso' ? [0] : []
  );
  const [notas, setNotas] = useState('');
  const [painelProblema, setPainelProblema] = useState(false);
  const notasRef = useRef(null);

  // o cronómetro só anda enquanto a tarefa está em curso
  useEffect(() => {
    if (estado !== 'curso') return undefined;
    const id = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [estado]);

  const cronometro = useMemo(
    () => `${dois(Math.floor(segundos / 3600))}:${dois(Math.floor((segundos % 3600) / 60))}:${dois(segundos % 60)}`,
    [segundos]
  );
  const progresso = useMemo(() => feitos.length / PASSOS.length, [feitos]);

  const mudarEstado = useCallback(
    (novo) => {
      setEstado(novo);
      setPainelProblema(false);
      onEstadoChange && onEstadoChange(tarefa, novo);
    },
    [tarefa, onEstadoChange]
  );

  const alternarPasso = (i) => {
    if (estado === 'pendente' || estado === 'concluida') return;
    setFeitos((lista) => (lista.includes(i) ? lista.filter((x) => x !== i) : [...lista, i]));
  };

  const finalizar = useCallback(() => {
    const concluir = () => mudarEstado('concluida');
    const faltam = PASSOS.length - feitos.length;
    if (faltam > 0) {
      Alert.alert('Finalizar tarefa', `Ainda há ${faltam} passo(s) por concluir. Quer finalizar mesmo assim?`, [
        { text: 'Voltar', style: 'cancel' },
        { text: 'Finalizar', onPress: concluir },
      ]);
    } else {
      concluir();
    }
  }, [feitos, mudarEstado]);

  const reportar = (tipo) => {
    setPainelProblema(false);
    onReportar && onReportar(tarefa, tipo, notas);
    Alert.alert('Ocorrência registada', tipo);
  };

  const [horaTxt, localTxt] = (tarefa?.subtitulo || '').split(' · ');
  const hora = horaTxt || 'Hoje';
  const local = tarefa?.local || localTxt || 'Local por definir';
  const prioridade = tarefa?.etiqueta === 'ALTA' ? 'Alta' : 'Normal';
  const visual = ESTADOS[estado];
  const editavel = estado === 'curso' || estado === 'pausada';

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.roundBtn} onPress={onBack} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color="#1E2923" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.title}>
            {tarefa?.titulo || 'Tarefa'}
          </Text>
          <Text style={styles.subtitle}>Tarefa atribuída à sua equipa</Text>
        </View>
      </View>

      {/* Cartão de estado */}
      <View style={[styles.estadoCard, { backgroundColor: visual.fundo, borderColor: visual.borda }]}>
        <View style={styles.estadoTop}>
          <View style={[styles.badge, { backgroundColor: visual.badge }]}>
            <Text style={styles.badgeText}>{visual.rotulo}</Text>
          </View>
          {(estado === 'curso' || estado === 'pausada' || (estado === 'concluida' && segundos > 0)) && (
            <Text style={[styles.timer, { color: visual.badge }]}>{cronometro}</Text>
          )}
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={18} color="#5F6D66" />
          <Text style={styles.infoText}>{hora}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color="#5F6D66" />
          <Text style={styles.infoText}>{local}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="flag-outline" size={18} color={prioridade === 'Alta' ? '#C26D1F' : '#5F6D66'} />
          <Text style={[styles.infoText, prioridade === 'Alta' && { color: '#C26D1F', fontWeight: '800' }]}>
            Prioridade {prioridade}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="people-outline" size={18} color="#5F6D66" />
          <Text style={styles.infoText}>Equipa Campo A</Text>
        </View>
      </View>

      {/* Passos */}
      <SectionHeader title="Passos da tarefa" actionLabel={`${feitos.length}/${PASSOS.length}`} />
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progresso * 100}%` }]} />
      </View>

      {PASSOS.map((passo, i) => {
        const marcado = feitos.includes(i);
        return (
          <TouchableOpacity
            key={passo}
            style={styles.passoCard}
            onPress={() => alternarPasso(i)}
            activeOpacity={editavel ? 0.8 : 1}
          >
            <View style={[styles.check, marcado && styles.checkOn]}>
              {marcado && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
            </View>
            <Text style={[styles.passoTexto, marcado && styles.passoFeito]}>{passo}</Text>
          </TouchableOpacity>
        );
      })}
      {estado === 'pendente' && <Text style={styles.dica}>Inicie a tarefa para poder marcar os passos.</Text>}

      {/* Notas */}
      <Text style={styles.label}>Notas</Text>
      <TouchableOpacity activeOpacity={1} onPress={() => editavel && notasRef.current?.focus()}>
        <TextInput
          ref={notasRef}
          style={[styles.notas, !editavel && { opacity: 0.6 }]}
          value={notas}
          onChangeText={setNotas}
          editable={editavel}
          multiline
          placeholder="Adicionar notas sobre a tarefa..."
          placeholderTextColor="#8B9890"
          textAlignVertical="top"
        />
      </TouchableOpacity>

      {/* Reportar problema */}
      {painelProblema && (
        <View style={styles.problemaCard}>
          <Text style={styles.problemaTitulo}>O que aconteceu?</Text>
          <View style={styles.problemaChips}>
            {PROBLEMAS.map((p) => (
              <TouchableOpacity key={p} style={styles.problemaChip} onPress={() => reportar(p)} activeOpacity={0.85}>
                <Text style={styles.problemaChipTexto}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Ações conforme o estado */}
      <View style={styles.acoes}>
        {estado === 'pendente' && (
          <>
            <PrimaryButton title="Iniciar tarefa" iconName="play-outline" onPress={() => mudarEstado('curso')} />
            <View style={styles.linhaBotoes}>
              <BotaoClaro icone="map-outline" texto="Abrir mapa" onPress={() => onAbrirMapa && onAbrirMapa(tarefa)} />
              <BotaoClaro icone="scan-outline" texto="Ler QR" onPress={() => onLerQR && onLerQR(tarefa)} />
            </View>
          </>
        )}

        {estado === 'curso' && (
          <>
            <PrimaryButton title="Finalizar tarefa" iconName="checkmark-done-outline" onPress={finalizar} />
            <View style={styles.linhaBotoes}>
              <BotaoClaro icone="pause-outline" texto="Pausar" onPress={() => mudarEstado('pausada')} />
              <BotaoClaro
                icone="alert-circle-outline"
                texto="Reportar problema"
                cor="#C26D1F"
                onPress={() => setPainelProblema((v) => !v)}
              />
            </View>
          </>
        )}

        {estado === 'pausada' && (
          <>
            <PrimaryButton title="Retomar tarefa" iconName="play-outline" onPress={() => mudarEstado('curso')} />
            <View style={styles.linhaBotoes}>
              <BotaoClaro
                icone="alert-circle-outline"
                texto="Reportar problema"
                cor="#C26D1F"
                onPress={() => setPainelProblema((v) => !v)}
              />
            </View>
          </>
        )}

        {estado === 'concluida' && (
          <>
            <View style={styles.concluidaBox}>
              <Ionicons name="checkmark-circle" size={22} color="#2D6A4F" />
              <Text style={styles.concluidaTexto}>Tarefa concluída. Bom trabalho!</Text>
            </View>
            <PrimaryButton title="Voltar às tarefas" iconName="arrow-back" onPress={onBack} />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 16, paddingBottom: 30, backgroundColor: '#F4F6F3' },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  roundBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E8ECE7', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '800', color: '#1E2923' },
  subtitle: { fontSize: 12, color: '#6B7871', marginTop: 2 },
  estadoCard: { borderRadius: 20, borderWidth: 1, padding: 16, marginBottom: 20 },
  estadoTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  badgeText: { fontSize: 10, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.3 },
  timer: { fontSize: 15, fontWeight: '800' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  infoText: { flex: 1, fontSize: 14, color: '#1E2923' },
  progressBg: { height: 7, backgroundColor: '#E5E9E6', borderRadius: 4, overflow: 'hidden', marginBottom: 12, marginTop: -2 },
  progressFill: { height: '100%', backgroundColor: '#3F7A96', borderRadius: 4 },
  passoCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E5E9E6', padding: 14, marginBottom: 8 },
  check: { width: 22, height: 22, borderRadius: 7, borderWidth: 1.5, borderColor: '#9AA7A0', backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  checkOn: { backgroundColor: '#2D6A4F', borderColor: '#2D6A4F' },
  passoTexto: { flex: 1, fontSize: 14, color: '#1E2923' },
  passoFeito: { color: '#6B7871', textDecorationLine: 'line-through' },
  dica: { fontSize: 12, color: '#6B7871', marginTop: 2, marginBottom: 4 },
  label: { fontSize: 13, fontWeight: '700', color: '#1E2923', marginTop: 14, marginBottom: 7 },
  notas: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E5E9E6', padding: 14, minHeight: 90, fontSize: 14, color: '#1E2923' },
  problemaCard: { backgroundColor: '#F6E8D8', borderRadius: 16, padding: 14, marginTop: 14 },
  problemaTitulo: { fontSize: 14, fontWeight: '800', color: '#1E2923', marginBottom: 10 },
  problemaChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  problemaChip: { backgroundColor: '#FFFFFF', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#EED6BC' },
  problemaChipTexto: { fontSize: 13, fontWeight: '700', color: '#C26D1F' },
  acoes: { marginTop: 20 },
  linhaBotoes: { flexDirection: 'row', gap: 10, marginTop: 10 },
  btnClaro: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: '#E5E9E6', paddingVertical: 13 },
  btnClaroTexto: { fontSize: 14, fontWeight: '800' },
  concluidaBox: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#E3ECE6', borderRadius: 16, padding: 14, marginBottom: 12 },
  concluidaTexto: { fontSize: 14, fontWeight: '700', color: '#2D6A4F' },
});
