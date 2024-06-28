import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await axios.post('http://10.0.2.2:3333/reset-password', { email }); // Use o IP correto aqui
      Alert.alert('Sucesso!', 'Um e-mail de redefinição de senha foi enviado para: ' + email);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar o e-mail de redefinição de senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Esqueci a Senha</Text>
      <Text style={styles.description}>Digite seu e-mail abaixo e enviaremos um link para redefinir sua senha.</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        placeholderTextColor="#B0B0B0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Enviar E-mail</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#004853',
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffe8d3',
    fontSize: 28,
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#ffe8d3',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: 'white',
    backgroundColor: '#1F1F1F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    borderRadius: 25,
    backgroundColor: '#f63700',
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
