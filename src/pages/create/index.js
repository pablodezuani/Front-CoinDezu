import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons';

const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = () => {
    // Aqui você pode implementar a lógica para realizar o cadastro do usuário
    console.log('Nome:', nome);
    console.log('Data de Nascimento:', dataNascimento);
    console.log('Email:', email);
    console.log('Senha:', senha);
    console.log('Confirmar Senha:', confirmarSenha);
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Cadastro</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerform}>
        <Text style={styles.label}>Nome completo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Data de Nascimento:</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={dataNascimento}
          onChangeText={setDataNascimento}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />

        <Text style={styles.label}>Confirmar Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry={true}
        />

     <TouchableOpacity style={styles.button}>
      <Text>Cadastrar</Text>
     </TouchableOpacity>

<View style={{flexDirection: 'row'}}>
  <Text style={{fontSize:16,marginTop: 36,color:'#171615'}}>__________________    </Text>
  <Text style={{fontSize:16,marginTop: 41,color:'#171615'}}>Cadastrar com</Text>
  <Text style={{fontSize:16,marginTop: 36,color:'#171615'}}>    __________________</Text>
</View>
<View style={{flexDirection: 'row',marginTop:20, justifyContent:'center', alignContent:'center'}}>
  <AntDesign name="google" size={40} color="#db4a39" style={{marginRight:44}}/>

<AntDesign name="apple1" size={40} color="black" />
</View>

      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171615',
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
  containerform: {
    backgroundColor: '#126782',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  label: {
    fontSize: 15,
    marginTop: 28
   
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 18,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:35
  ,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',

  },
  buttonRegister: {
    marginTop: 38,
    alignSelf: 'center',
  },
  registerText: {
    color: '#FFF',
  },
});

export default CadastroScreen;
