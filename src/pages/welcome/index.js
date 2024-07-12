import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require('../../assets/splash.png')}
          style={{ width: '100%' }}
          resizeMode="contain"
        />
      </View>
      <Animatable.View
        delay={600}
        animation="fadeInUp"
        style={styles.containerForm}
      >
        <Text style={styles.title}>Seja Bem vindo</Text>
        <Text style={styles.text}>Tenha o controle do seu Dinheiro e realize seus sonhos</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('login')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091440', // Cor de fundo clara
  },
  containerLogo: {
    flex: 2,
    backgroundColor: '#091440', // Cor de fundo clara
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#1A2B5C',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    color: '#ffe8d3', // Texto escuro para contraste
  },
  text: {
    color: '#ffe8d3', // Texto escuro para contraste
  },
  button: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#F63700',
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffe8d3',
    fontWeight: 'bold',
  },
});
