// App.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import CamposScreen from './components/CamposScreen';
import CriarCamposScreen from './components/CriarCamposScreen';
import EditarCamposScreen from './components/EditarCamposScreen';
import CriarParcelaScreen from './components/CriarParcelaScreen';
import EditarParcelaScreen from './components/EditarParcelaScreen';
import PlantacoesScreen from './components/PlantacoesScreen';
import TarefasScreen from './components/TarefasScreen';
import PerfilScreen from './components/PerfilScreen';
import OperadoresScreen from './components/OperadoresScreen';
import RegistarOperadorScreen from './components/RegistarOperadorScreen';
import BottomNav from './components/BottomNav';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [activeTab, setActiveTab] = useState('inicio');
  const [subScreen, setSubScreen] = useState(null);
  const [ultimoOperador, setUltimoOperador] = useState(null);
  const [novoCampo, setNovoCampo] = useState(null);
  const [campoEmEdicao, setCampoEmEdicao] = useState(null);
  const [campoEditado, setCampoEditado] = useState(null);
  const [campoParcelaContexto, setCampoParcelaContexto] = useState(null);
  const [novaParcela, setNovaParcela] = useState(null);
  const [parcelaEmEdicao, setParcelaEmEdicao] = useState(null);
  const [parcelaEditada, setParcelaEditada] = useState(null);

  if (currentScreen === 'login') {
    return (
      <SafeAreaView style={styles.authContainer}>
        <LoginScreen
          onNavigateToRegister={() => setCurrentScreen('register')}
          onLoginSuccess={() => setCurrentScreen('home')}
        />
      </SafeAreaView>
    );
  }

  if (currentScreen === 'register') {
    return (
      <SafeAreaView style={styles.authContainer}>
        <RegisterScreen
          onBackToLogin={() => setCurrentScreen('login')}
          onRegisterSuccess={() => setCurrentScreen('home')}
        />
      </SafeAreaView>
    );
  }

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    setSubScreen(null);
  };

  const abrirCriarCampo = () => setSubScreen('criar-campo');

  const abrirEditarCampo = (campo) => {
    setCampoEmEdicao(campo);
    setSubScreen('editar-campo');
  };

  const abrirCriarParcela = (nomeCampo = null) => {
    setCampoParcelaContexto(nomeCampo);
    setSubScreen('criar-parcela');
  };

  const abrirEditarParcela = (parcela) => {
    setParcelaEmEdicao(parcela);
    setSubScreen('editar-parcela');
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.mainContent}>
        {activeTab === 'inicio' && <HomeScreen />}

        {activeTab === 'campos' && !subScreen && (
          <CamposScreen
            onOpenCriarCampo={abrirCriarCampo}
            onAddCampo={abrirCriarCampo}
            onPressAdd={abrirCriarCampo}
            onEditCampo={abrirEditarCampo}
            onOpenCriarParcela={abrirCriarParcela}
            onEditParcela={abrirEditarParcela}
            novoCampo={novoCampo}
            campoEditado={campoEditado}
            novaParcela={novaParcela}
            parcelaEditada={parcelaEditada}
          />
        )}

        {activeTab === 'campos' && subScreen === 'criar-campo' && (
          <CriarCamposScreen
            onBack={() => setSubScreen(null)}
            onCampoCriado={(campo) => {
              setNovoCampo(campo);
              setSubScreen(null);
            }}
          />
        )}

        {activeTab === 'campos' && subScreen === 'editar-campo' && (
          <EditarCamposScreen
            campo={campoEmEdicao}
            onBack={() => setSubScreen(null)}
            onGuardarAlteracoes={(atualizado) => {
              setCampoEditado(atualizado);
              setSubScreen(null);
            }}
          />
        )}

        {activeTab === 'campos' && subScreen === 'criar-parcela' && (
          <CriarParcelaScreen
            campoInicial={campoParcelaContexto}
            onBack={() => setSubScreen(null)}
            onParcelaCriada={(parcela) => {
              setNovaParcela(parcela);
              setSubScreen(null);
            }}
          />
        )}

        {activeTab === 'campos' && subScreen === 'editar-parcela' && (
          <EditarParcelaScreen
            parcela={parcelaEmEdicao}
            onBack={() => setSubScreen(null)}
            onGuardarAlteracoes={(atualizada) => {
              setParcelaEditada(atualizada);
              setSubScreen(null);
            }}
          />
        )}

        {activeTab === 'plantacoes' && <PlantacoesScreen />}
        {activeTab === 'tarefas' && <TarefasScreen />}

        {activeTab === 'perfil' && !subScreen && (
          <PerfilScreen onOpenOperadores={() => setSubScreen('operadores')} />
        )}

        {activeTab === 'perfil' && subScreen === 'operadores' && (
          <OperadoresScreen
            onBack={() => setSubScreen(null)}
            onAddOperador={() => setSubScreen('registar-operador')}
            novoOperador={ultimoOperador}
          />
        )}

        {activeTab === 'perfil' && subScreen === 'registar-operador' && (
          <RegistarOperadorScreen
            onBack={() => setSubScreen('operadores')}
            onOperadorRegistado={(dados) => {
              setUltimoOperador(dados);
              setSubScreen('operadores');
            }}
          />
        )}
      </View>

      <BottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#F4F6F3',
  },
  mainContent: {
    flex: 1,
  },
});