import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

export default function Login() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem - vindo</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput placeholder='Email' style={styles.input} />
        <Text style={styles.title}>Senha</Text>
        <TextInput placeholder='Digite sua senha' style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.reset} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.textreset}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('home')}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
          <Text style={styles.dividerLine}>__________________</Text>
          <Text style={styles.dividerText}>Acesse com</Text>
          <Text style={styles.dividerLine}>__________________</Text>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <AntDesign name="google" size={40} color="#db4a39" />
          </View>
          <View style={styles.iconWrapper}>
            <AntDesign name="apple1" size={40} color="black" />
          </View>
          <View style={styles.iconWrapper}>
            <FontAwesome name="facebook" size={40} color="#3b5998" />
          </View>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Não possui acesso?  {' '}
            <Text style={styles.registerLink} onPress={() => navigation.navigate('Create')}>Cadastre-se</Text>
          </Text>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004853',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
textreset:{
  color:'#FFFFFF'
},

  containerForm: {
    backgroundColor: '#007e80',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: '5%',
  },
  reset: {
    alignSelf: 'flex-end',
  
  },
  title: {
    fontSize: 20,
    marginTop: 28,
    color:'#FFFFFF'
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f63700',
    width: '100%',
    borderRadius: 18,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerLine: {
    fontSize: 16,
    color: '#EFEEEE',
  },
  dividerText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#EFEEEE',
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#EFEEEE',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  registerText: {
    color: '#EFEEEE',
    fontSize: 16,
  },
  registerLink: {
    color: '#e3492b',
    fontSize: 16,
    textDecorationLine: 'underline', // optional, if you want an underline effect
  },
});
