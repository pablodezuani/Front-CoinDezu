import { View, Text, StyleSheet, TextInput,TouchableOpacity } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';



export default function login() {
  const navigation =useNavigation();
 return (
   <View style={styles.container}>
<Animatable.View 
animation="fadeInLeft" delay={500} style={styles.containerHeader}>

  <Text style={styles.message}>Bem - vindo</Text>
</Animatable.View>
<Animatable.View
animation="fadeInUp"
style={styles.containerform}>
<Text style={styles.title}>Email</Text>
<TextInput
placeholder='Email'
style={styles.input}
/>
<Text style={styles.title}>Senha</Text>
<TextInput
placeholder='digite sua senha'
style={styles.input}
/>
<TouchableOpacity
style={styles.reset}
onPress={() =>navigation.navigate('ForgotPasswordScreen')}><Text> Esqueceu a senha?</Text></TouchableOpacity>

<TouchableOpacity style={styles.button}
onPress={() =>navigation.navigate('home')}>
  <Text style={styles.buttontext}>Acessar</Text>
</TouchableOpacity>


<View style={{flexDirection: 'row',marginTop:50}}>
  <Text style={{fontSize:16,marginTop: 36,color:'#FFF'}}>__________________    </Text>
  <Text style={{fontSize:16,marginTop: 41,color:'#FFF'}}>Acesse com</Text>
  <Text style={{fontSize:16,marginTop: 36,color:'#FFF'}}>    __________________</Text>
</View>
<View style={{flexDirection: 'row',marginTop:60, justifyContent:'center', alignContent:'center'}}>
  <AntDesign name="google" size={40} color="#db4a39" style={{marginRight:44}}/>

<AntDesign name="apple1" size={40} color="black" />
</View>
<View style={{ alignItems: 'center' }}>
<Text style = {{color:'#171615',marginTop: 50}}>
  Não possui acesso ?{'   '}
  <TouchableOpacity  onPress={() =>navigation.navigate('Create')}>
  <Text style={{color: '#e3492b',marginTop:50}}>
  Cadastre-se
  </Text></TouchableOpacity>
  
</Text>
</View>

</Animatable.View >


   </View>
  );
}

const styles =StyleSheet.create({
container:{
  flex:1,
  backgroundColor:'#171615'
},
containerHeader:{
  marginTop:'14%',
  marginBottom:'8%',
  paddingStart:'5%'
},
message:{
  fontSize:28,
  fontWeight:'bold',
  color:'#fff'
},
containerform:{
  backgroundColor:'#126782',
  flex:1,
  borderTopLeftRadius:25,
  borderTopRightRadius:25,
  paddingStart:'5%',
  paddingEnd:'5%'
},

reset:{
justifyContent:'flex-end'

},
title:{
  fontSize:20,
  marginTop:28,
},
input:{
  borderBottomWidth:1,
  height:40,
  marginBottom:12,
  fontSize:16,
},
button:{
  backgroundColor:'#171615',
  width:'100%',
  borderRadius:18,
  paddingVertical:8,
  marginTop:14,
  justifyContent:'center',
  alignItems:'center'
},
buttontext:{
  color:'#FFF',
  fontSize:18,
  fontWeight:'bold'
},

buttonRegister:{

  marginTop:38,
  alignSelf:'center'

},
registerText:{

  color:'#171615'
},
icones:{},

})