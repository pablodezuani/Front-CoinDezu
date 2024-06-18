import { View ,Text, StyleSheet , TouchableOpacity} from 'react-native';
import React, { useState }  from 'react';

export default function Movements({dados}) {
const [showValue, setShowValue] = useState(false);
 return (
  <TouchableOpacity style={styles.container} onPress={() => setShowValue(!showValue) }>

<Text style={styles.date}>{dados.date} </Text>

<View style={styles.content}>
    <Text style={styles.label}>{dados.label}</Text>
{showValue ? (
    
    <Text style={dados.type === 1? styles.value : styles.saida}>
        
   {dados.type === 1 ? ` R$ ${dados.value}`:` R$ -${dados.value}`}     
   </Text>
) : (
<View style={styles.ocultar}>

</View>
)}

</View>
  </TouchableOpacity>
  );



}

const styles = StyleSheet.create(
    {
        container:{

flex:1,
marginBottom:24,
borderBottomWidth:0.5,
backgroundColor:'#007e80'


        },

        content:{
flexDirection:'row',
justifyContent:'space-between',
marginBottom:8,
marginTop:2,

        },

        date:{

            color:'#ffe8d3',
            fontWeight:'bold',
            
        },
        label:{
            fontSize:16,
            fontWeight:'bold',
            color:'#ffe8d3'
        
        },

        value:{
            fontSize:16,
            color:'#2ecc71',
            fontWeight:'bold'

        },

        saida:{
            backgroundColor:'#007e80',
            fontSize:16,
            color:'#e74c3c',
            fontWeight:'bold'  
        },
ocultar:{
    marginTop: 6,
    width:80,
    height:10,
    backgroundColor:'#DADADA',
    borderRadius:8,

}

    }
)