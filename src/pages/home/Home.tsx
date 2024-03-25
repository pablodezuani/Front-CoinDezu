import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Balance from '../../components/Balance'
import Movements from '../../components/Movements';
import Actions from '../../components/Actions';
import Header from '../../components/Header';


const list =[
  {
    id:1,
    label:'boleto conta luz',
    value :'303,90',
    date :'17/20/2054',
    type: 0 // despesas
  },
  {
    id:2,
    label:'pix',
    value :'5.303,90',
    date :'17/20/2054',
    type: 1 // entrada
  },
  {
    id:3,
    label:'salario',
    value :'5.303,90',
    date :'17/20/2054',
    type: 1 // entrada
  },
  {
    id:4,
    label:'pix',
    value :'5.303,90',
    date :'17/20/2054',
    type: 1 // entrada
  },
  
]

export default function Home() {
  return (
    <View style={styles.container}>
        <Header name="Pablo"/>
     <Balance saldo="5.514.61" gastos="524,25"/>
     <Actions/>
    <Text style={styles.titulo}> Ultimas movimentações </Text>
  

    <FlatList
    style={styles.list}
    data={list}
    keyExtractor={(item) => String(item.id)}
    showsVerticalScrollIndicator={false}
    renderItem={({item}) => <Movements dados={item}/>}
    />
    </View>
  );
}

const styles = StyleSheet.create(
{
    container:{
        flex:1,
        backgroundColor:'#126782'
    },
    titulo:{
      fontSize:18,
      fontWeight:'bold',
      marginLeft:14,
      marginRight:14,
      marginTop:14,
      marginBottom:24,
  
     },
     list:{
      marginStart: 14,
      marginEnd: 14,
     },
}

)