// App.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';

// --- RESTANTES ECRÃS COMENTADOS PARA TESTAR APENAS LOGIN E REGISTO ---
// import HomeScreen from './components/HomeScreen';
// import BottomNav from './components/BottomNav';
// import CamposScreen from './components/CamposScreen';
// import CriarCamposScreen from './components/CriarCamposScreen';
// import EditarCamposScreen from './components/EditarCamposScreen';
// import CriarParcelaScreen from './components/CriarParcelaScreen';
// import EditarParcelaScreen from './components/EditarParcelaScreen';
// import PlantacoesScreen from './components/PlantacoesScreen';
// import TarefasScreen from './components/TarefasScreen';
// import PerfilScreen from './components/PerfilScreen';

export default function App() {
  // 'login' | 'register' | 'app' (quando o resto for reativado)
  const [authScreen, setAuthScreen] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  // --- ESTADOS COMENTADOS DO RESTO DA APLICAÇÃO ---
  // const [activeTab, setActiveTab] = useState('inicio');
  // const [subScreen, setSubScreen] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser({
      ...userData,
      role: 'agricultor',
    });
    console.log('Login efetuado com sucesso:', userData);
    // Quando reativares o resto da app, podes fazer:
    // setAuthScreen('app');
  };

  const handleRegisterSuccess = (newUserData) => {
    setCurrentUser(newUserData);
    console.log('Conta criada com sucesso:', newUserData);
    // Volta ao login ou entra na app quando reativares o resto:
    setAuthScreen('login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F3" />

      {authScreen === 'register' ? (
        <RegisterScreen
          onBackToLogin={() => setAuthScreen('login')}
          onRegisterSuccess={handleRegisterSuccess}
        />
      ) : (
        <LoginScreen
          onNavigateToRegister={() => setAuthScreen('register')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* --- BLOCO PRINCIPAL DA APP COMENTADO PARA ESTE TESTE ---
      {authScreen === 'app' && (
        <>
          ...
          <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
        </>
      )}
      --- */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F3',
  },
});