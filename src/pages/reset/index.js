import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Aqui você pode adicionar a lógica para enviar um e-mail de redefinição de senha
    Alert.alert('Sucesso!', 'Um e-mail de redefinição de senha foi enviado para: ' + email);
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
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Enviar E-mail</Text>
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
    backgroundColor: '#00b9bd',
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    fontSize: 28,
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
    color: 'white',
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
