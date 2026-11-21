// App.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import CamposScreen from './components/CamposScreen';
import CampoDetalheScreen from './components/CampoDetalheScreen';
import ParcelasScreen from './components/ParcelasScreen';
import ParcelaDetalheScreen from './components/ParcelaDetalheScreen';
import BottomNav from './components/BottomNav';

// --- RESTANTES ECRÃS COMENTADOS PARA FASE SEGUINTE ---
// import CriarCamposScreen from './components/CriarCamposScreen';
// import EditarCamposScreen from './components/EditarCamposScreen';
// import CriarParcelaScreen from './components/CriarParcelaScreen';
// import EditarParcelaScreen from './components/EditarParcelaScreen';
// import PlantacoesScreen from './components/PlantacoesScreen';
// import TarefasScreen from './components/TarefasScreen';
// import PerfilScreen from './components/PerfilScreen';

export default function App() {
  const [screenMode, setScreenMode] = useState('app');
  const [activeTab, setActiveTab] = useState('inicio');
  const [campoSelecionado, setCampoSelecionado] = useState(null);
  const [campoFiltroParcelas, setCampoFiltroParcelas] = useState(null);
  const [parcelaDetalhe, setParcelaDetalhe] = useState(null);
  const [mostrarTarefasNoPerfil, setMostrarTarefasNoPerfil] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    nomeCompleto: 'Maria Costa',
    empresa: 'Quinta do Vale',
    role: 'agricultor',
  });

  const resetSubNavegacao = () => {
    setCampoSelecionado(null);
    setCampoFiltroParcelas(null);
    setParcelaDetalhe(null);
    setMostrarTarefasNoPerfil(false);
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...userData,
      nomeCompleto: prev?.nomeCompleto || 'Maria Costa',
      empresa: prev?.empresa || 'Quinta do Vale',
    }));
    resetSubNavegacao();
    setActiveTab('inicio');
    setScreenMode('app');
  };

  const handleRegisterSuccess = (newUserData) => {
    setCurrentUser(newUserData);
    resetSubNavegacao();
    setActiveTab('inicio');
    setScreenMode('app');
  };

  const handleSelectTab = (tabKey) => {
    resetSubNavegacao();
    setActiveTab(tabKey);
  };

  const handleSelectCampo = (campo) => {
    setParcelaDetalhe(null);
    setCampoFiltroParcelas(null);
    setCampoSelecionado(campo);
  };

  const handleVerTodasParcelasDoCampo = () => {
    setParcelaDetalhe(null);
    setCampoFiltroParcelas(campoSelecionado);
    setActiveTab('parcelas');
  };

  const handleAbrirDetalheParcela = (parcela) => {
    setParcelaDetalhe(parcela);
  };

  const primeiroNome = (currentUser?.nomeCompleto || 'Maria Costa').split(' ')[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F3" />

      {screenMode === 'register' ? (
        <RegisterScreen
          onBackToLogin={() => setScreenMode('login')}
          onRegisterSuccess={handleRegisterSuccess}
        />
      ) : screenMode === 'login' ? (
        <LoginScreen
          onNavigateToRegister={() => setScreenMode('register')}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <View style={styles.appShell}>
          <View style={styles.contentArea}>
            {/* ABA INÍCIO */}
            {activeTab === 'inicio' && (
              <HomeScreen
                userName={primeiroNome}
                empresaNome={currentUser?.empresa || 'Quinta do Vale'}
                areaTotal="128,4 ha"
                onNavigateTab={handleSelectTab}
              />
            )}

            {/* ABA CAMPOS */}
            {activeTab === 'campos' &&
              (parcelaDetalhe ? (
                <ParcelaDetalheScreen
                  parcela={parcelaDetalhe}
                  campoContexto={campoSelecionado}
                  onBack={() => setParcelaDetalhe(null)}
                  onCriarTarefa={() => {
                    setParcelaDetalhe(null);
                    setMostrarTarefasNoPerfil(true);
                    setActiveTab('perfil');
                  }}
                  onAbrirMapa={(p) =>
                    console.log('Abrir mapa da parcela:', p?.codigo || p?.nome)
                  }
                  onVerHistorico={(p) =>
                    console.log('Ver histórico da parcela:', p?.codigo || p?.nome)
                  }
                />
              ) : campoSelecionado ? (
                <CampoDetalheScreen
                  campo={campoSelecionado}
                  onBack={() => setCampoSelecionado(null)}
                  onEditCampo={(campo) => console.log('Editar Campo:', campo.nome)}
                  onDeleteCampo={() => setCampoSelecionado(null)}
                  onVerTodasParcelas={handleVerTodasParcelasDoCampo}
                  onSelectParcela={handleAbrirDetalheParcela}
                />
              ) : (
                <CamposScreen
                  onSelectCampo={handleSelectCampo}
                  onOpenCriarCampo={() => console.log('Abrir Criar Campo')}
                  onEditCampo={(campo) => console.log('Editar Campo:', campo.nome)}
                />
              ))}

            {/* ABA PARCELAS */}
            {activeTab === 'parcelas' &&
              (parcelaDetalhe ? (
                <ParcelaDetalheScreen
                  parcela={parcelaDetalhe}
                  campoContexto={campoFiltroParcelas}
                  onBack={() => setParcelaDetalhe(null)}
                  onCriarTarefa={() => {
                    setParcelaDetalhe(null);
                    setMostrarTarefasNoPerfil(true);
                    setActiveTab('perfil');
                  }}
                  onAbrirMapa={(p) =>
                    console.log('Abrir mapa da parcela:', p?.codigo || p?.nome)
                  }
                  onVerHistorico={(p) =>
                    console.log('Ver histórico da parcela:', p?.codigo || p?.nome)
                  }
                />
              ) : (
                <ParcelasScreen
                  campoFiltro={campoFiltroParcelas}
                  onBackToCampo={() => {
                    setCampoFiltroParcelas(null);
                    setActiveTab('campos');
                  }}
                  onClearCampoFiltro={() => setCampoFiltroParcelas(null)}
                  onSelectParcela={handleAbrirDetalheParcela}
                  onOpenCriarParcela={() => console.log('Abrir Criar Parcela')}
                  onEditParcela={(parcela) =>
                    console.log('Editar Parcela:', parcela.codigo)
                  }
                  onInspectParcela={handleAbrirDetalheParcela}
                />
              ))}

            {/* ABA PLANTAÇÕES */}
            {activeTab === 'plantacoes' && (
              <View style={styles.placeholderBox}>
                <Text style={styles.placeholderTitle}>
                  Secção "Plantações" em revisão
                </Text>
                <Text style={styles.placeholderSub}>
                  Diz-me quando quiseres avançar para este ecrã.
                </Text>
              </View>
            )}

            {/* ABA PERFIL (com acesso a Tarefas) */}
            {activeTab === 'perfil' && (
              <View style={styles.placeholderBox}>
                <Text style={styles.placeholderTitle}>
                  {mostrarTarefasNoPerfil
                    ? 'Tarefas (dentro de Perfil)'
                    : 'Perfil & Tarefas'}
                </Text>
                <Text style={styles.placeholderSub}>
                  {mostrarTarefasNoPerfil
                    ? 'Ecrã de Tarefas pronto para avançarmos a seguir.'
                    : 'Aqui ficará o Perfil do Agricultor com acesso direto às Tarefas.'}
                </Text>

                <TouchableOpacity
                  style={styles.switchBtn}
                  onPress={() =>
                    setMostrarTarefasNoPerfil((prev) => !prev)
                  }
                  activeOpacity={0.85}
                >
                  <Text style={styles.switchBtnText}>
                    {mostrarTarefasNoPerfil ? 'Voltar ao Perfil' : 'Abrir Tarefas'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <BottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F3',
  },
  appShell: {
    flex: 1,
    backgroundColor: '#F4F6F3',
  },
  contentArea: {
    flex: 1,
  },
  placeholderBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E2923',
    marginBottom: 6,
  },
  placeholderSub: {
    fontSize: 13,
    color: '#6B7871',
    textAlign: 'center',
    marginBottom: 16,
  },
  switchBtn: {
    backgroundColor: '#1B3B2B',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 14,
  },
  switchBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});