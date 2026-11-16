// components/BottomNav.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { key: 'inicio', label: 'Início', icon: 'grid-outline' },
    { key: 'campos', label: 'Campos', icon: 'map-outline' },
    { key: 'plantacoes', label: 'Plantações', icon: 'leaf-outline' },
    { key: 'tarefas', label: 'Tarefas', icon: 'list-outline' },
    { key: 'perfil', label: 'Perfil', icon: 'person-outline' },
  ];

  return (
    <View style={styles.navContainer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onSelectTab(tab.key)}
          >
            <View style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}>
              <Ionicons
                name={tab.icon}
                size={20}
                color={isActive ? '#1B3B2B' : '#7A8680'}
              />
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E9E6',
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconWrapperActive: {
    backgroundColor: '#DCE7DF',
  },
  tabLabel: {
    fontSize: 11,
    color: '#7A8680',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#1B3B2B',
    fontWeight: '700',
  },
});