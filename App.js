// App.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import CamposScreen from './components/CamposScreen';
import PlantacoesScreen from './components/PlantacoesScreen';
import TarefasScreen from './components/TarefasScreen';
import PerfilScreen from './components/PerfilScreen';
import OperadoresScreen from './components/OperadoresScreen';
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
          <OperadoresScreen onBack={() => setSubScreen(null)} />
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