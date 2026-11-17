// App.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import CamposScreen from './components/CamposScreen';
import PlantacoesScreen from './components/PlantacoesScreen';
import TarefasScreen from './components/TarefasScreen';
import BottomNav from './components/BottomNav';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [activeTab, setActiveTab] = useState('inicio');

  // LoginScreen
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

  // RegisterScreen
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

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.mainContent}>
        {/* HomeScreen */}
        {activeTab === 'inicio' && <HomeScreen />}

        {/* CamposScreen */}
        {activeTab === 'campos' && <CamposScreen />}

        {/* PlantacoesScreen */}
        {activeTab === 'plantacoes' && <PlantacoesScreen />}

        {/* TarefasScreen */}
        {activeTab === 'tarefas' && <TarefasScreen />}

        {/* Perfil */}
        {activeTab === 'perfil' && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>PERFIL</Text>
          </View>
        )}
      </View>

      {/* BottomNav */}
      <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
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