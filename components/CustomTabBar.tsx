import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../design/colors';
import { Typography } from '../design/typography';
import { Layout } from '../design/layout';

type TabBarProps = {
  activeTab: string;
  onTabPress: (tab: string) => void;
};

export const CustomTabBar: React.FC<TabBarProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {/* Home Tab */}
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'Home' && styles.activeTab]}
          onPress={() => onTabPress('Home')}
        >
          <Text style={[styles.tabIcon, activeTab === 'Home' && styles.activeTabIcon]}>🏠</Text>
          {activeTab === 'Home' && <Text style={styles.tabLabel}>Home</Text>}
        </TouchableOpacity>
        
        {/* Insights Tab */}
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => onTabPress('Insights')}
        >
          <Text style={[styles.tabIcon, activeTab === 'Insights' && styles.activeTabIcon]}>📊</Text>
        </TouchableOpacity>
        
        {/* Add FAB - This will be positioned separately */}
        <View style={styles.placeholder} />
        
        {/* Chat Tab */}
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => onTabPress('Chat')}
        >
          <Text style={[styles.tabIcon, activeTab === 'Chat' && styles.activeTabIcon]}>💬</Text>
        </TouchableOpacity>
        
        {/* Profile Tab */}
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => onTabPress('Profile')}
        >
          <Text style={[styles.tabIcon, activeTab === 'Profile' && styles.activeTabIcon]}>👤</Text>
        </TouchableOpacity>
      </View>
      
      {/* Add FAB Button - Floating above the tab bar */}
      <TouchableOpacity 
        style={styles.fabButton}
        onPress={() => onTabPress('Add')}
      >
        <Text style={styles.fabIcon}>➕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'relative',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  activeTab: {
    backgroundColor: Colors.accent,
    borderRadius: 20,
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
  },
  tabIcon: {
    fontSize: Typography.size.lg,
    color: Colors.textSecondary,
  },
  activeTabIcon: {
    color: Colors.accentText,
  },
  tabLabel: {
    ...Typography.style.caption,
    color: Colors.accentText,
    marginTop: Layout.spacing.xs,
  },
  placeholder: {
    flex: 1,
  },
  fabButton: {
    position: 'absolute',
    top: -30,
    left: '50%',
    transform: [{ translateX: -30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  fabIcon: {
    fontSize: Typography.size.xl,
    color: Colors.accentText,
  },
});
