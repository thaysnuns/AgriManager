// App.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import CamposScreen from './components/CamposScreen';
import PlantacoesScreen from './components/PlantacoesScreen';
import TarefasScreen from './components/TarefasScreen';
import PerfilScreen from './components/PerfilScreen';
import BottomNav from './components/BottomNav';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [activeTab, setActiveTab] = useState('inicio');
  const [subScreen, setSubScreen] = useState(null);

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

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.mainContent}>
        {activeTab === 'inicio' && <HomeScreen />}
        {activeTab === 'campos' && <CamposScreen />}
        {activeTab === 'plantacoes' && <PlantacoesScreen />}
        {activeTab === 'tarefas' && <TarefasScreen />}

        {activeTab === 'perfil' && !subScreen && (
          <PerfilScreen onOpenOperadores={() => setSubScreen('operadores')} />
        )}

        {activeTab === 'perfil' && subScreen === 'operadores' && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>OPERADORES (EM BREVE)</Text>
          </View>
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
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B3B2B',
  },
});