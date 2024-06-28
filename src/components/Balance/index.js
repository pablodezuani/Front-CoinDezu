import { View, Text  ,StyleSheet,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';

export default function Balance({saldo,gastos}) {

 const [showValue, setShowValue] = useState(false);
 const [showgasto, setShowgasto] = useState(false);
 return (
<View style={styles.container}>
  <View style={styles.item}>
    
    <Text style={styles.itemTitle}>Saldo</Text>
    <TouchableOpacity style={styles.content} onPress={() => setShowValue(!showValue)}>
    <Text style={styles.currencySymbol}>R$</Text>
    
      <View style={styles.content}>
        {showValue ? (
          <Text style={styles.balance}>{saldo}</Text>
        ) : (
          <View style={styles.ocultar}></View>
        )}
      </View>
  
    </TouchableOpacity>

  </View>
  

  <View style={styles.item}>
    <Text style={styles.itemTitle}>Gastos</Text>
    <View style={styles.content}>
      <Text style={styles.currencySymbol}>R$</Text>
      <TouchableOpacity style={styles.gastos} onPress={() => setShowgasto(!showgasto)}>
        <View style={styles.content}>
          {showgasto ? (
            <Text style={styles.gastos}>{gastos}</Text>
          ) : (
            <View style={styles.ocultar}></View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  </View>
</View>


  );
}

const styles = StyleSheet.create({
container:{
    backgroundColor:'#006170',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingStart:18,
    paddingEnd:18,
    marginTop:-30,
    marginStart:14,
    margin:14,
    borderRadius:8,
    paddingTop:22,
    paddingBottom:40,
    zIndex:99,
},
itemTitle:{
fontSize:18,
color:'#000',
},
content:{
flexDirection:'row',
alignItems:"center",
},
currencySymbol:{
color:'#DADADA',
marginRight:6,

},
balance:{
fontSize:18,
color:'#007e80',
},

gastos:{
fontSize:18,
color:'#e74c3c',
},
ocultar:{
width:54,
height:20,
backgroundColor:'#DADADA',
borderRadius:8,
},
}


)