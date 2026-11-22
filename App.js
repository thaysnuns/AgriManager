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
import PerfilScreen from './components/PerfilScreen';
import TarefasScreen from './components/TarefasScreen';
import PlantacoesScreen from './components/PlantacoesScreen';
import CriarCamposScreen from './components/CriarCamposScreen';
import EditarCamposScreen from './components/EditarCamposScreen';
import OperadorTarefasScreen from './components/operador/OperadorTarefasScreen';
import OperadorScannerScreen from './components/operador/OperadorScannerScreen';
import OperadorParcelaScreen from './components/operador/OperadorParcelaScreen';
import OperadorMapaScreen, { PARCELAS_CAMPO } from './components/operador/OperadorMapaScreen';
import OperadorPerfilScreen from './components/operador/OperadorPerfilScreen';
import OperadorTarefaDetalheScreen from './components/operador/OperadorTarefaDetalheScreen';
import AdminDashboardScreen from './components/adm/AdminDashboardScreen';
import AdminCamposScreen from './components/adm/AdminCamposScreen';
import AdminEmpresasScreen from './components/adm/AdminEmpresasScreen';
import AdminUtilizadoresScreen from './components/adm/AdminUtilizadoresScreen';
import AdminParcelaDetalheScreen from './components/adm/AdminParcelaDetalheScreen';
import AdminPerfilScreen from './components/adm/AdminPerfilScreen';
import CriarParcelaScreen from './components/CriarParcelaScreen';
import EditarParcelaScreen from './components/EditarParcelaScreen';
import CriarTarefaScreen from './components/CriarTarefaScreen';
import CriarPlantacaoScreen from './components/CriarPlantacaoScreen';

export default function App() {
  const [screenMode, setScreenMode] = useState('login');
  const [activeTab, setActiveTab] = useState('inicio');
  const [campoSelecionado, setCampoSelecionado] = useState(null);
  const [campoFiltroParcelas, setCampoFiltroParcelas] = useState(null);
  const [parcelaDetalhe, setParcelaDetalhe] = useState(null);
  const [mostrarCriarCampo, setMostrarCriarCampo] = useState(false);
  const [campoEmEdicao, setCampoEmEdicao] = useState(null);
  const [campoEditado, setCampoEditado] = useState(null);
  const [novoCampo, setNovoCampo] = useState(null);
  const [novoParcela, setNovoParcela] = useState(null);
  const [mostrarCriarParcela, setMostrarCriarParcela] = useState(false);
  const [operadorParcelaAtiva, setOperadorParcelaAtiva] = useState(null);
  const [operadorTarefaAtiva, setOperadorTarefaAtiva] = useState(null);
  const [adminParcelaAtiva, setAdminParcelaAtiva] = useState(null);
  const [mostrarTarefasNoPerfil, setMostrarTarefasNoPerfil] = useState(false);
  const [mostrarCriarTarefa, setMostrarCriarTarefa] = useState(false);
  const [origemCriarTarefa, setOrigemCriarTarefa] = useState('tarefas');
  const [parcelaEmEdicao, setParcelaEmEdicao] = useState(null);
  const [parcelaEditada, setParcelaEditada] = useState(null);
  const [mostrarCriarPlantacao, setMostrarCriarPlantacao] = useState(false);
  const [novaPlantacao, setNovaPlantacao] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    nomeCompleto: 'Maria Costa',
    empresa: 'Quinta do Vale',
    role: 'agricultor',
  });

  const resetSubNavegacao = () => {
    setCampoSelecionado(null);
    setCampoFiltroParcelas(null);
    setParcelaDetalhe(null);
    setMostrarCriarCampo(false);
    setCampoEmEdicao(null);
    setMostrarTarefasNoPerfil(false);
    setAdminParcelaAtiva(null);
    setOperadorParcelaAtiva(null);
    setMostrarCriarTarefa(false);
    setOrigemCriarTarefa('tarefas');
    setMostrarCriarParcela(false);
    setMostrarCriarPlantacao(false);
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser({
      nomeCompleto: userData?.nomeCompleto || 'Maria Costa',
      empresa: userData?.empresa || 'Quinta do Vale',
      role: userData?.role || 'agricultor',
      email: userData?.email,
    });
    resetSubNavegacao();
    setActiveTab(
      userData?.role === 'operador'
        ? 'tarefas'
        : userData?.role === 'administrador'
        ? 'resumo'
        : 'inicio'
    );
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
            {currentUser?.role === 'operador' && activeTab === 'tarefas' && (
              <OperadorTarefasScreen
                iniciais={primeiroNome === 'João' ? 'JS' : primeiroNome.slice(0, 2).toUpperCase()}
                user={currentUser}
                onOpenPerfil={() => setActiveTab('perfil')}
                onContinuar={(tarefa) => {
                  setOperadorTarefaAtiva(tarefa);
                  setActiveTab('tarefaDetalhe');
                }}
                onSelectTarefa={(tarefa) => {
                  setOperadorTarefaAtiva(tarefa);
                  setActiveTab('tarefaDetalhe');
                }}
              />
            )}

            {currentUser?.role !== 'operador' && currentUser?.role !== 'administrador' && activeTab === 'tarefas' && (
              mostrarCriarTarefa ? (
                <CriarTarefaScreen
                  onBack={() => {
                    setMostrarCriarTarefa(false);
                    setActiveTab(origemCriarTarefa);
                  }}
                  onTarefaCriada={(tarefa) => {
                    console.log('Nova tarefa:', tarefa);
                    setMostrarCriarTarefa(false);
                    setActiveTab(origemCriarTarefa);
                  }}
                />
              ) : (
                <TarefasScreen
                  onBack={() => setActiveTab('inicio')}
                  onAdd={() => {
                    setOrigemCriarTarefa('tarefas');
                    setMostrarCriarTarefa(true);
                  }}
                />
              )
            )}

            {currentUser?.role === 'operador' && activeTab === 'scanner' && (
              <OperadorScannerScreen
                onCodigo={(codigo) => {
                  const limpo = (codigo || '').trim().toUpperCase();
                  const correspondencia = limpo.match(/^([A-Z]{2})0*(\d+)-\d+$/);
                  const idParcela = correspondencia
                    ? `${correspondencia[1]}-${correspondencia[2].padStart(2, '0')}`
                    : null;
                  const parcela = PARCELAS_CAMPO.find((item) => item.id === idParcela);

                  setOperadorParcelaAtiva(parcela || null);
                  setActiveTab('mapa');
                }}
                onHistorico={() => setActiveTab('tarefas')}
              />
            )}

            {currentUser?.role === 'operador' && activeTab === 'mapa' && (
              operadorParcelaAtiva ? (
                <OperadorParcelaScreen
                  parcela={operadorParcelaAtiva}
                  onBack={() => {
                    setOperadorParcelaAtiva(null);
                    setActiveTab('mapa');
                  }}
                  onLerQR={() => setActiveTab('scanner')}
                  onNavegar={(tipo) => console.log('Navegar:', tipo)}
                  onContactar={() => console.log('Contactar responsável')}
                  onContinuar={() => setActiveTab('tarefas')}
                />
              ) : (
                <OperadorMapaScreen
                  onSelectParcela={(parcela) => setOperadorParcelaAtiva(parcela)}
                />
              )
            )}

            {currentUser?.role === 'operador' && activeTab === 'perfil' && (
              <OperadorPerfilScreen
                onItemPress={(item) => console.log(item.titulo)}
                onSettings={() => console.log('Abrir definições do operador')}
                user={currentUser}
                onLogout={() => {
                  resetSubNavegacao();
                  setActiveTab('tarefas');
                  setScreenMode('login');
                }}
              />
            )}

            {currentUser?.role === 'operador' && activeTab === 'tarefaDetalhe' && (
              <OperadorTarefaDetalheScreen
                tarefa={operadorTarefaAtiva}
                onBack={() => setActiveTab('tarefas')}
                onEstadoChange={(tarefa, estado) =>
                  console.log('Estado da tarefa:', tarefa?.titulo, estado)
                }
                onAbrirMapa={() => setActiveTab('mapa')}
                onLerQR={() => setActiveTab('scanner')}
                onReportar={(tarefa, tipo, notas) =>
                  console.log('Ocorrência:', tarefa?.titulo, tipo, notas)
                }
              />
            )}

            {/* ABA INÍCIO */}
            {currentUser?.role !== 'administrador' && activeTab === 'inicio' && (
              <HomeScreen
                userName={primeiroNome}
                empresaNome={currentUser?.empresa || 'Quinta do Vale'}
                areaTotal="128,4 ha"
                onNavigateTab={handleSelectTab}
              />
            )}

            {/* ABA CAMPOS */}
            {currentUser?.role !== 'administrador' && activeTab === 'campos' &&
              (campoEmEdicao ? (
                <EditarCamposScreen
                  campo={campoEmEdicao}
                  onBack={() => setCampoEmEdicao(null)}
                  onGuardarAlteracoes={(campoAtualizado) => {
                    setCampoEditado(campoAtualizado);
                    setCampoEmEdicao(null);
                  }}
                />
              ) : mostrarCriarCampo ? (
                <CriarCamposScreen
                  onBack={() => setMostrarCriarCampo(false)}
                  onCampoCriado={(campo) => {
                    setNovoCampo(campo);
                    setMostrarCriarCampo(false);
                  }}
                />
              ) : parcelaDetalhe ? (
                <ParcelaDetalheScreen
                  parcela={parcelaDetalhe}
                  campoContexto={campoSelecionado}
                  onBack={() => setParcelaDetalhe(null)}
                  onCriarTarefa={() => {
                    setOrigemCriarTarefa('campos');
                    setActiveTab('tarefas');
                    setMostrarCriarTarefa(true);
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
                  onOpenCriarCampo={() => setMostrarCriarCampo(true)}
                  onEditCampo={(campo) => setCampoEmEdicao(campo)}
                  novoCampo={novoCampo}
                  campoEditado={campoEditado}
                />
              ))}

            {/* ABA PARCELAS */}
            {activeTab === 'parcelas' &&
              (parcelaEmEdicao ? (
                <EditarParcelaScreen
                  parcela={{
                    ...parcelaEmEdicao,
                    nome: parcelaEmEdicao.nome || parcelaEmEdicao.titulo || parcelaEmEdicao.codigo,
                    qrCode: parcelaEmEdicao.qrCode || parcelaEmEdicao.codigo,
                  }}
                  camposDisponiveis={[
                    'Olival Norte',
                    'Vinha do Poente',
                    'Cereal Sul',
                    'Horta Poente',
                  ]}
                  onBack={() => setParcelaEmEdicao(null)}
                  onGuardarAlteracoes={(parcelaAtualizada) => {
                    setParcelaEditada(parcelaAtualizada);
                    setParcelaEmEdicao(null);
                  }}
                />
              ) : mostrarCriarParcela ? (
                <CriarParcelaScreen
                  campoInicial={campoFiltroParcelas?.nome}
                  camposDisponiveis={[
                    'Olival Norte',
                    'Vinha do Poente',
                    'Cereal Sul',
                    'Horta Poente',
                  ]}
                  onBack={() => setMostrarCriarParcela(false)}
                  onParcelaCriada={(parcela) => {
                    setNovoParcela(parcela);
                    setMostrarCriarParcela(false);
                  }}
                />
              ) : parcelaDetalhe ? (
                <ParcelaDetalheScreen
                  parcela={parcelaDetalhe}
                  campoContexto={campoFiltroParcelas}
                  onBack={() => setParcelaDetalhe(null)}
                  onCriarTarefa={() => {
                    setOrigemCriarTarefa('parcelas');
                    setActiveTab('tarefas');
                    setMostrarCriarTarefa(true);
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
                  onOpenCriarParcela={() => setMostrarCriarParcela(true)}
                  onEditParcela={(parcela) => setParcelaEmEdicao(parcela)}
                  novaParcela={novoParcela}
                  parcelaEditada={parcelaEditada}
                />
              ))}

            {/* ABA PLANTAÇÕES */}
            {activeTab === 'plantacoes' && (
              mostrarCriarPlantacao ? (
                <CriarPlantacaoScreen
                  onBack={() => setMostrarCriarPlantacao(false)}
                  onPlantacaoCriada={(plantacao) => {
                    setNovaPlantacao(plantacao);
                    setMostrarCriarPlantacao(false);
                  }}
                />
              ) : (
                <PlantacoesScreen
                  onOpenCriarPlantacao={() => setMostrarCriarPlantacao(true)}
                  novaPlantacao={novaPlantacao}
                />
              )
            )}

            {/* ABA PERFIL */}
           {currentUser?.role !== 'operador' &&
  currentUser?.role !== 'administrador' &&
  activeTab === 'perfil' && (
                  <PerfilScreen
                    user={currentUser}
                    onLogout={() => {
                      resetSubNavegacao();
                      setActiveTab('inicio');
                      setScreenMode('login');
                    }}
                  />
            )}

            {/* ABA ADMIN - DASHBOARD */}
            {currentUser?.role === 'admin' && activeTab === 'dashboard' && (
              <AdminDashboardScreen
                onSelectTab={setActiveTab}
                onLogout={() => {
                  resetSubNavegacao();
                  setActiveTab('inicio');
                  setScreenMode('login');
                }}
              />
            )}

            {/* ABA ADMIN - CAMPOS */}
            {currentUser?.role === 'admin' && activeTab === 'adminCampos' && (
              <AdminCamposScreen
                onBack={() => setActiveTab('dashboard')}
                onSelectCampo={(campo) => {
                  setCampoSelecionado(campo);
                  setActiveTab('adminCampoDetalhe');
                }}
                onOpenCriarCampo={() => setMostrarCriarCampo(true)}
                onEditCampo={(campo) => setCampoEmEdicao(campo)}
                novoCampo={novoCampo}
                campoEditado={campoEditado}
              />
            )}

            {/* ABA ADMIN - EMPRESAS */}
            {currentUser?.role === 'admin' && activeTab === 'adminEmpresas' && (
              <AdminEmpresasScreen
                onBack={() => setActiveTab('dashboard')}
                onSelectEmpresa={(empresa) => console.log('Selecionar empresa:', empresa)}
                onOpenCriarEmpresa={() => console.log('Abrir Criar Empresa')}
                onEditEmpresa={(empresa) => console.log('Editar Empresa:', empresa)}
              />
            )}

            {/* ABA ADMIN - UTILIZADORES */}
            {currentUser?.role === 'admin' && activeTab === 'adminUtilizadores' && (
              <AdminUtilizadoresScreen
                onBack={() => setActiveTab('dashboard')}
                onSelectUtilizador={(utilizador) => console.log('Selecionar utilizador:', utilizador)}
                onOpenCriarUtilizador={() => console.log('Abrir Criar Utilizador')}
                onEditUtilizador={(utilizador) => console.log('Editar Utilizador:', utilizador)}
              />
            )}

            {/* ABA ADMIN - DETALHE PARCELA */}
            {currentUser?.role === 'admin' && activeTab === 'adminCampoDetalhe' && (
              <AdminParcelaDetalheScreen
                parcela={parcelaDetalhe}
                onBack={() => setActiveTab('adminCampos')}
                onEditParcela={(parcela) => console.log('Editar Parcela:', parcela.codigo)}
                onDeleteParcela={() => setParcelaDetalhe(null)}
              />
            )}

            {/* ECRÃS ADMINISTRADOR */}
            {currentUser?.role === 'administrador' && (activeTab === 'resumo' || activeTab === 'inicio') && (
              <AdminDashboardScreen
                iniciais="ADM"
                onVerRelatorio={() => setActiveTab('empresas')}
                onOpenPerfil={() => setActiveTab('perfil')}
                onSelectEstado={(estado) => console.log('Estado da rede:', estado)}
              />
            )}

            {currentUser?.role === 'administrador' && activeTab === 'campos' && (
              adminParcelaAtiva ? (
                <AdminParcelaDetalheScreen
                  parcela={{
                    nome: adminParcelaAtiva.nome,
                    subtitulo: adminParcelaAtiva.sub,
                    qr: 'QR-' + (adminParcelaAtiva.id || 'campo'),
                    alerta: adminParcelaAtiva.nota,
                  }}
                  onBack={() => setAdminParcelaAtiva(null)}
                  onAbrirMapa={() => console.log('Abrir mapa:', adminParcelaAtiva.nome)}
                  onHistorico={() => console.log('Ver histórico:', adminParcelaAtiva.nome)}
                  onMais={() => console.log('Mais opções:', adminParcelaAtiva.nome)}
                />
              ) : (
                <AdminCamposScreen
                  onSelectCampo={(campo) => setAdminParcelaAtiva(campo)}
                  onExportar={() => console.log('Exportar campos')}
                  onVerTodos={() => console.log('Ver todos os campos')}
                />
              )
            )}

            {currentUser?.role === 'administrador' && activeTab === 'empresas' && (
              <AdminEmpresasScreen
                onAdicionar={() => console.log('Adicionar empresa')}
                onSelectEmpresa={(empresa) => {
                  console.log('Empresa selecionada:', empresa.nome);
                  setActiveTab('campos');
                }}
              />
            )}

            {currentUser?.role === 'administrador' && activeTab === 'utilizadores' && (
              <AdminUtilizadoresScreen
                onConvidar={() => console.log('Convidar utilizador')}
                onSelectUtilizador={(utilizador) =>
                  console.log('Utilizador selecionado:', utilizador.nome)
                }
              />
            )}

            {/* ABA ADMIN - PERFIL */}
            {currentUser?.role === 'administrador' && activeTab === 'perfil' && (
              <AdminPerfilScreen
                user={currentUser}
                onSettings={() => console.log('Abrir definições do administrador')}
                onLogout={() => {
                  resetSubNavegacao();
                  setActiveTab('resumo');
                  setScreenMode('login');
                }}
              />
            )}
          </View>

          <BottomNav
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            role={currentUser?.role}
          />
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
