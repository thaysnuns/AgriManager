// App.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Text } from 'react-native';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import BottomNav from './components/BottomNav';

// --- RESTANTES ECRÃS COMENTADOS PARA FASE SEGUINTE ---
// import CamposScreen from './components/CamposScreen';
// import CriarCamposScreen from './components/CriarCamposScreen';
// import EditarCamposScreen from './components/EditarCamposScreen';
// import CriarParcelaScreen from './components/CriarParcelaScreen';
// import EditarParcelaScreen from './components/EditarParcelaScreen';
// import PlantacoesScreen from './components/PlantacoesScreen';
// import TarefasScreen from './components/TarefasScreen';
// import PerfilScreen from './components/PerfilScreen';

export default function App() {
  // Começa já em 'app' para testar o Dashboard + BottomNav; muda para 'login' para testar autenticação
  const [screenMode, setScreenMode] = useState('app');
  const [activeTab, setActiveTab] = useState('inicio');
  const [currentUser, setCurrentUser] = useState({
    nomeCompleto: 'Maria Costa',
    empresa: 'Quinta do Vale',
    role: 'agricultor',
  });

  const handleLoginSuccess = (userData) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...userData,
      nomeCompleto: prev?.nomeCompleto || 'Maria Costa',
      empresa: prev?.empresa || 'Quinta do Vale',
    }));
    setActiveTab('inicio');
    setScreenMode('app');
  };

  const handleRegisterSuccess = (newUserData) => {
    setCurrentUser(newUserData);
    setActiveTab('inicio');
    setScreenMode('app');
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
            {activeTab === 'inicio' ? (
              <HomeScreen
                userName={primeiroNome}
                empresaNome={currentUser?.empresa || 'Quinta do Vale'}
                areaTotal="128,4 ha"
                onNavigateTab={setActiveTab}
              />
            ) : (
              <View style={styles.placeholderBox}>
                <Text style={styles.placeholderTitle}>
                  Secção "{activeTab}" em revisão
                </Text>
                <Text style={styles.placeholderSub}>
                  Diz-me quando quiseres avançar para este ecrã.
                </Text>
              </View>
            )}
          </View>

          <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
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
  },
});