import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Aqui você pode adicionar a lógica para enviar um e-mail de redefinição de senha
    console.log('Um e-mail de redefinição de senha foi enviado para:', email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Esqueci a Senha</Text>
      <Text style={styles.description}>Digite seu e-mail abaixo e enviaremos um link para redefinir sua senha.</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={alert('Sucesso!!                                                          E-mail enviado com sucesso!')}>
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
    paddingHorizontal: 20,
    backgroundColor:'#171615'
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20,
    color:'white',
    fontSize:28,
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
    color:'white',
  
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    color:'white',
  },
  button: {
    position:'absolute',
    borderRadius:50,
    backgroundColor:'#126782',
    paddingVertical:8,
    width:'60%',
    alignSelf:'center',
    bottom:'15%',  
    alignItems:'center',
    justifyContent:'center'
  },
  
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
