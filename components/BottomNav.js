// components/BottomNav.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TABS = [
  {
    key: 'inicio',
    label: 'Início',
    icon: 'grid-outline',
    iconActive: 'grid',
  },
  {
    key: 'campos',
    label: 'Campos',
    icon: 'map-outline',
    iconActive: 'map',
  },
  {
    key: 'parcelas',
    label: 'Parcelas',
    icon: 'layers-outline',
    iconActive: 'layers',
  },
  {
    key: 'plantacoes',
    label: 'Plantações',
    icon: 'leaf-outline',
    iconActive: 'leaf',
  },
  {
    key: 'perfil',
    label: 'Perfil',
    icon: 'person-outline',
    iconActive: 'person',
  },
];

export default function BottomNav({ activeTab = 'inicio', onSelectTab }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              activeOpacity={0.8}
              delayPressIn={0}
              onPress={() => onSelectTab && onSelectTab(tab.key)}
            >
              <View style={[styles.iconPill, isActive && styles.iconPillActive]}>
                <Ionicons
                  name={isActive ? tab.iconActive : tab.icon}
                  size={20}
                  color={isActive ? '#244735' : '#6B7871'}
                />
              </View>
              <Text
                numberOfLines={1}
                style={[styles.label, isActive && styles.labelActive]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E9E6',
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 6,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPill: {
    width: 42,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  iconPillActive: {
    backgroundColor: '#DCE7DF',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7871',
  },
  labelActive: {
    fontWeight: '800',
    color: '#244735',
  },
});