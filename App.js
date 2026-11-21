// App.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import CamposScreen from './components/CamposScreen';
import CampoDetalheScreen from './components/CampoDetalheScreen';
import ParcelasScreen from './components/ParcelasScreen';
import ParcelaDetalheScreen from './components/ParcelaDetalheScreen';
import PlantacoesScreen from './components/PlantacoesScreen';
import PerfilScreen from './components/PerfilScreen';
import TarefasScreen from './components/TarefasScreen';
import BottomNav from './components/BottomNav';

export default function App() {
  const [authScreen, setAuthScreen] = useState('login'); // 'login' | 'register' | 'app'
  const [activeTab, setActiveTab] = useState('inicio'); // 'inicio' | 'campos' | 'parcelas' | 'plantacoes' | 'perfil'

  const [selectedCampo, setSelectedCampo] = useState(null);
  const [campoFiltroParcelas, setCampoFiltroParcelas] = useState(null);
  const [selectedParcela, setSelectedParcela] = useState(null);
  const [selectedPlantacao, setSelectedPlantacao] = useState(null);
  const [subScreenPerfil, setSubScreenPerfil] = useState(null); // null | 'tarefas'

  const limparSubEcransTab = () => {
    setSelectedCampo(null);
    setSelectedParcela(null);
    setSelectedPlantacao(null);
    setSubScreenPerfil(null);
  };

  const handleSelectTab = (tabKey) => {
    setActiveTab(tabKey);
    limparSubEcransTab();
    if (tabKey !== 'parcelas') {
      setCampoFiltroParcelas(null);
    }
  };

  if (authScreen === 'login') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <LoginScreen
          onLoginSuccess={() => {
            setActiveTab('inicio');
            limparSubEcransTab();
            setAuthScreen('app');
          }}
          onGoToRegister={() => setAuthScreen('register')}
        />
      </SafeAreaView>
    );
  }

  if (authScreen === 'register') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <RegisterScreen
          onRegisterSuccess={() => {
            setActiveTab('inicio');
            limparSubEcransTab();
            setAuthScreen('app');
          }}
          onBackToLogin={() => setAuthScreen('login')}
        />
      </SafeAreaView>
    );
  }

  const renderMainContent = () => {
    if (selectedParcela) {
      return (
        <ParcelaDetalheScreen
          parcela={selectedParcela}
          onBack={() => setSelectedParcela(null)}
        />
      );
    }

    if (activeTab === 'inicio') {
      return (
        <HomeScreen
          onNavigateTab={(tab) => handleSelectTab(tab)}
          onSelectCampo={(campo) => {
            setActiveTab('campos');
            setSelectedCampo(campo);
          }}
          onSelectParcela={(parcela) => setSelectedParcela(parcela)}
        />
      );
    }

    if (activeTab === 'campos') {
      if (selectedCampo) {
        return (
          <CampoDetalheScreen
            campo={selectedCampo}
            onBack={() => setSelectedCampo(null)}
            onVerParcelasCampo={(campo) => {
              setCampoFiltroParcelas(campo);
              setSelectedCampo(null);
              setActiveTab('parcelas');
            }}
          />
        );
      }
      return (
        <CamposScreen
          onSelectCampo={(campo) => setSelectedCampo(campo)}
        />
      );
    }

    if (activeTab === 'parcelas') {
      return (
        <ParcelasScreen
          campoFiltro={campoFiltroParcelas}
          onBackToCampo={() => {
            const campoAtual = campoFiltroParcelas;
            setCampoFiltroParcelas(null);
            setActiveTab('campos');
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

    if (activeTab === 'plantacoes') {
      return (
        <PlantacoesScreen
          onSelectPlantacao={(plantacao) => {
            setSelectedPlantacao(plantacao);
          }}
          onOpenCriarPlantacao={() => {}}
        />
      );
    }

    if (activeTab === 'perfil') {
      if (subScreenPerfil === 'tarefas') {
        return (
          <TarefasScreen
            onBack={() => setSubScreenPerfil(null)}
          />
        );
      }
      return (
        <PerfilScreen
          onOpenTarefas={() => setSubScreenPerfil('tarefas')}
          onLogout={() => {
            limparSubEcransTab();
            setCampoFiltroParcelas(null);
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
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
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