import React from 'react';
import { StyleSheet, Text, View ,StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes';
import {AuthProvider} from './src/contexts/AuthContext'
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
<StatusBar backgroundColor="#121212" barStyle={'light-content'} />
      <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}
