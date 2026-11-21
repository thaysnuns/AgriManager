import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import CamposScreen, { CAMPOS_SCREEN_INICIAIS } from './components/CamposScreen';
import CampoDetalheScreen from './components/CampoDetalheScreen';
import CriarCamposScreen from './components/CriarCamposScreen';
import EditarCamposScreen from './components/EditarCamposScreen';
import ParcelasScreen from './components/ParcelasScreen';
import ParcelaDetalheScreen from './components/ParcelaDetalheScreen';
import PlantacoesScreen from './components/PlantacoesScreen';
import TarefasScreen from './components/TarefasScreen';
import PerfilScreen from './components/PerfilScreen';
import OperadoresScreen from './components/OperadoresScreen';
import RegistarOperadorScreen from './components/RegistarOperadorScreen';
import BottomNav from './components/BottomNav';

const OPERADORES_INICIAIS = [
  { id: 'op-1', nome: 'António Silva', email: 'antonio.silva@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-2', nome: 'Beatriz Ferreira', email: 'beatriz.ferreira@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-3', nome: 'Carlos Mendes', email: 'carlos.mendes@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-4', nome: 'Diogo Almeida', email: 'diogo.almeida@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-5', nome: 'Elsa Rocha', email: 'elsa.rocha@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-6', nome: 'Fernando Costa', email: 'fernando.costa@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-7', nome: 'Graça Ribeiro', email: 'graca.ribeiro@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-8', nome: 'Hélder Pereira', email: 'helder.pereira@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-9', nome: 'Inês Carvalho', email: 'ines.carvalho@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-10', nome: 'João Martins', email: 'joao.martins@quintadovale.pt', estado: 'Ativo' },
  { id: 'op-11', nome: 'Luísa Sousa', email: 'luisa.sousa@quintadovale.pt', estado: 'Ativo' },
];

const CONVITES_INICIAIS = [
  { id: 'cv-1', email: 'miguel.teixeira@quintadovale.pt', estado: 'Pendente' },
  { id: 'cv-2', email: 'nuria.gomes@quintadovale.pt', estado: 'Pendente' },
  { id: 'cv-3', email: 'paulo.oliveira@quintadovale.pt', estado: 'Pendente' },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authScreen, setAuthScreen] = useState('login');

  const [activeScreen, setActiveScreen] = useState('campos');
  const [campos, setCampos] = useState(CAMPOS_SCREEN_INICIAIS);
  const [camposSubScreen, setCamposSubScreen] = useState(null);
  const [campoEmEdicao, setCampoEmEdicao] = useState(null);
  const [selectedCampo, setSelectedCampo] = useState(null);

  const [campoFiltroParcelas, setCampoFiltroParcelas] = useState(null);
  const [selectedParcela, setSelectedParcela] = useState(null);
  const [selectedPlantacao, setSelectedPlantacao] = useState(null);
  const [selectedTarefa, setSelectedTarefa] = useState(null);

  const [perfilSubScreen, setPerfilSubScreen] = useState(null);
  const [operadores, setOperadores] = useState(OPERADORES_INICIAIS);
  const [convites] = useState(CONVITES_INICIAIS);
  const [selectedOperador, setSelectedOperador] = useState(null);

  const limparDetalhes = () => {
    setSelectedCampo(null);
    setSelectedParcela(null);
    setSelectedPlantacao(null);
    setSelectedTarefa(null);
    setSelectedOperador(null);
    setCamposSubScreen(null);
    setCampoEmEdicao(null);
    setPerfilSubScreen(null);
  };

  const handleNavigate = (tab) => {
    limparDetalhes();
    if (tab !== 'parcelas') {
      setCampoFiltroParcelas(null);
    }
    setActiveScreen(tab);
  };

  const handleAdicionarOperador = (novoOperador) => {
    const item = {
      id: `op-${Date.now()}`,
      nome: novoOperador.nome,
      email: novoOperador.email,
      estado: novoOperador.estado || 'Ativo',
    };
    setOperadores((prev) => [item, ...prev]);
    setPerfilSubScreen('operadores');
  };

  const handleEliminarCampo = (campoAlvo) => {
    if (!campoAlvo?.id) return;
    setCampos((prev) => prev.filter((item) => item.id !== campoAlvo.id));
    if (selectedCampo?.id === campoAlvo.id) {
      setSelectedCampo(null);
    }
  };

  if (!isAuthenticated) {
    if (authScreen === 'register') {
      return (
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="dark" />
          <View style={styles.contentContainer}>
            <RegisterScreen
              onBackToLogin={() => setAuthScreen('login')}
              onRegisterSuccess={() => {
                setIsAuthenticated(true);
                setActiveScreen('inicio');
              }}
            />
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.contentContainer}>
          <LoginScreen
            onOpenRegister={() => setAuthScreen('register')}
            onLoginSuccess={() => {
              setIsAuthenticated(true);
              setActiveScreen('inicio');
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const bottomNavActiveTab =
    activeScreen === 'tarefas' ? 'inicio' : activeScreen;

  const totalUtilizadoresResumo =
    operadores.length + convites.length === 14 && operadores.length === 11
      ? '12 utilizadores · 3 convites'
      : `${operadores.length} operadores · ${convites.length} convites`;
  const renderMainContent = () => {
    if (selectedParcela) {
      return (
        <ParcelaDetalheScreen
          parcela={selectedParcela}
          onBack={() => setSelectedParcela(null)}
        />
      );
    }

    if (activeScreen === 'inicio') {
      return (
        <HomeScreen
          onNavigateTab={(tab) => handleNavigate(tab)}
          onSelectCampo={(campo) => {
            limparDetalhes();
            setCampoFiltroParcelas(null);
            setActiveScreen('campos');
            setSelectedCampo(campo);
          }}
          onSelectParcela={(parcela) => setSelectedParcela(parcela)}
        />
      );
    }

    if (activeScreen === 'campos') {
      if (camposSubScreen === 'criar') {
        return (
          <CriarCamposScreen
            onBack={() => setCamposSubScreen(null)}
            onCriarCampo={(novoCampo) => {
              const campoFormatado = {
                id: novoCampo.id || `campo-${Date.now()}`,
                codigo:
                  novoCampo.codigo ||
                  `CP-${String(campos.length + 1).padStart(2, '0')}`,
                nome: novoCampo.nome,
                area: novoCampo.area,
                cultura: novoCampo.cultura,
                tipoCultura: 'olival',
                estado: 'Ativo',
                estadoTitulo: 'Saudável',
                detalheEstado: 'NDVI 0,78',
                alerta: false,
                iconBg: '#E1ECE4',
                iconColor: '#2A6F4E',
                parcelasCount: novoCampo.parcelasCount ?? 0,
                zona: novoCampo.zona || novoCampo.localizacao || 'Exploração',
                localizacao: novoCampo.localizacao || '',
                observacoes: novoCampo.observacoes || '',
              };
              setCampos((prev) => [campoFormatado, ...prev]);
              setCamposSubScreen(null);
            }}
          />
        );
      }

      if (camposSubScreen === 'editar' && campoEmEdicao) {
        return (
          <EditarCamposScreen
            campo={campoEmEdicao}
            onBack={() => {
              setCampoEmEdicao(null);
              setCamposSubScreen(null);
            }}
            onGuardarAlteracoes={(campoAtualizado) => {
              setCampos((prev) =>
                prev.map((item) =>
                  item.id === campoAtualizado.id ? campoAtualizado : item
                )
              );
              if (selectedCampo?.id === campoAtualizado.id) {
                setSelectedCampo(campoAtualizado);
              }
              setCampoEmEdicao(null);
              setCamposSubScreen(null);
            }}
          />
        );
      }

      if (selectedCampo) {
        return (
          <CampoDetalheScreen
            campo={selectedCampo}
            onBack={() => setSelectedCampo(null)}
            onVerParcelasCampo={(campo) => {
              setSelectedCampo(null);
              setCampoFiltroParcelas(campo);
              setActiveScreen('parcelas');
            }}
          />
        );
      }

      return (
        <CamposScreen
          camposData={campos}
          onSelectCampo={(campo) => setSelectedCampo(campo)}
          onOpenCriarCampo={() => setCamposSubScreen('criar')}
          onEditCampo={(campo) => {
            setCampoEmEdicao(campo);
            setCamposSubScreen('editar');
          }}
          onDeleteCampo={handleEliminarCampo}
        />
      );
    }

    if (activeScreen === 'parcelas') {
      return (
        <ParcelasScreen
          campoFiltro={campoFiltroParcelas}
          onBackToCampo={() => {
            const campoAtual = campoFiltroParcelas;
            setCampoFiltroParcelas(null);
            setActiveScreen('campos');
            setSelectedCampo(campoAtual);
          }}
          onClearCampoFiltro={() => setCampoFiltroParcelas(null)}
          onSelectParcela={(parcela) => setSelectedParcela(parcela)}
          onOpenCriarParcela={() => {}}
          onEditParcela={(parcela) => setSelectedParcela(parcela)}
          onDeleteParcela={() => {}}
          onQrParcela={(parcela) => setSelectedParcela(parcela)}
        />
      );
    }

    if (activeScreen === 'plantacoes') {
      return (
        <PlantacoesScreen
          onSelectPlantacao={(plantacao) => {
            setSelectedPlantacao(plantacao);
          }}
          onOpenCriarPlantacao={() => {}}
        />
      );
    }

    if (activeScreen === 'tarefas') {
      return (
        <TarefasScreen
          onSelectTarefa={(tarefa) => {
            setSelectedTarefa(tarefa);
          }}
          onOpenCriarTarefa={() => {}}
        />
      );
    }

    if (activeScreen === 'perfil') {
      if (perfilSubScreen === 'registar_operador') {
        return (
          <RegistarOperadorScreen
            quintaNome="Quinta do Vale"
            perfilFixo="Operador"
            onBack={() => setPerfilSubScreen('operadores')}
            onRegistarOperador={handleAdicionarOperador}
          />
        );
      }

      if (perfilSubScreen === 'operadores') {
        return (
          <OperadoresScreen
            quintaNome="Quinta do Vale"
            operadoresData={operadores}
            convitesData={convites}
            totalOperadoresCount={operadores.length}
            totalConvitesCount={convites.length}
            onBack={() => setPerfilSubScreen(null)}
            onSelectOperador={(operador) => setSelectedOperador(operador)}
            onOpenAdicionarOperador={() =>
              setPerfilSubScreen('registar_operador')
            }
          />
        );
      }

      return (
        <PerfilScreen
          userName="Maria Costa"
          roleText="Agricultora · Proprietária"
          quintaNome="Quinta do Vale"
          quintaDetalhe="Évora · 128,4 ha"
          planoNome="Plano Profissional"
          planoRenovacao="Renova a 14 out. 2026"
          equipaResumo={totalUtilizadoresResumo}
          onOpenOperadores={() => setPerfilSubScreen('operadores')}
          onLogout={() => {
            limparDetalhes();
            setCampoFiltroParcelas(null);
            setActiveScreen('inicio');
            setIsAuthenticated(false);
            setAuthScreen('login');
          }}
        />
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.contentContainer}>
        {renderMainContent()}
      </View>
      <BottomNav
        activeTab={bottomNavActiveTab}
        onSelectTab={(tab) => handleNavigate(tab)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F3',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F4F6F3',
  },
});