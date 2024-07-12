import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking, ActivityIndicator, Modal } from 'react-native';
import React, { useState, useContext } from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';

export default function Login() {
  const { signIn, loadingAuth, user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigation = useNavigation();

  async function handleLogin() {
    if (email === '' || password === '') {
      return;
    }
    try {
      await signIn({ email, password });
      console.log('Token gerado:', user.token);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setModalMessage('Email ou senha incorretos');
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 2000);
      } else {
        setModalMessage('Ocorreu um erro inesperado');
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 2000);
      }
    }
  }

  const openGoogle = () => {
    Linking.openURL('https://mail.google.com'); // Opens Gmail
  };

  const openApple = () => {
    Linking.openURL('https://www.apple.com'); // Opens Apple webpage
  };

  const openFacebook = () => {
    Linking.openURL('https://www.facebook.com'); // Opens Facebook
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem - vindo</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput 
          placeholder='Digite seu email' 
          style={styles.input}
          placeholderTextColor="#FFFFFF"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder='Digite sua senha' 
          placeholderTextColor="#f0f0f0"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.reset} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.textReset}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogin}
        >
          {loadingAuth ? (
            <ActivityIndicator size={25} color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Acesse com</Text>
          <View style={styles.dividerLine} />
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconWrapper} onPress={openGoogle}>
            <AntDesign name="google" size={40} color="#db4a39" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={openApple}>
            <AntDesign name="apple1" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={openFacebook}>
            <FontAwesome name="facebook" size={40} color="#3b5998" />
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Não possui acesso?  {' '}
            <Text style={styles.registerLink} onPress={() => navigation.navigate('Create')}>Cadastre-se</Text>
          </Text>
        </View>
      </Animatable.View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091440',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffe8d3',
  },
  textReset: {
    color: '#ffe8d3',
  },
  containerForm: {
    backgroundColor: '#1A2B5C',
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
    color: '#ffe8d3',
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    color:'#FFFFFF'
  },
  button: {
    backgroundColor: '#F63700',
    width: '100%',
    borderRadius: 18,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffe8d3',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EFEEEE',
  },
  dividerText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#EFEEEE',
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#E4FFFF',
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 10,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: 'red',
  },
});
