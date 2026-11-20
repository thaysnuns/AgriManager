// components/BottomNav.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TABS = [
  { key: 'inicio', label: 'Início', iconActive: 'grid', iconOutline: 'grid-outline' },
  { key: 'campos', label: 'Campos', iconActive: 'map', iconOutline: 'map-outline' },
  { key: 'plantacoes', label: 'Plantações', iconActive: 'leaf', iconOutline: 'leaf-outline' },
  { key: 'tarefas', label: 'Tarefas', iconActive: 'checkbox', iconOutline: 'checkbox-outline' },
  { key: 'perfil', label: 'Perfil', iconActive: 'person', iconOutline: 'person-outline' },
];

export default function BottomNav({ activeTab = 'inicio', onSelectTab }) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const ativa = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onSelectTab && onSelectTab(tab.key)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconPill, ativa && styles.iconPillActive]}>
              <Ionicons
                name={ativa ? tab.iconActive : tab.iconOutline}
                size={20}
                color={ativa ? '#1B3B2B' : '#7C8A82'}
              />
            </View>
            <Text style={[styles.label, ativa && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E9E6',
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 6,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPill: {
    width: 44,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  iconPillActive: {
    backgroundColor: '#DCE7DF',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#7C8A82',
  },
  labelActive: {
    fontWeight: '800',
    color: '#1B3B2B',
  },
});