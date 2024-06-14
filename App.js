import React from 'react';
import { StyleSheet, Text, View ,StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes';
export default function App() {
  return (
    <NavigationContainer>
<StatusBar backgroundColor="#121212" barStyle={'light-content'} />
      <Routes/>
    </NavigationContainer>
  );
}
