import { View, Text,StyleSheet } from 'react-native';

export default function principal() {
 return (
   <View style={styles.container}>
    <Text>pagima home</Text>
   </View>
  );
}

const styles =StyleSheet.create({

  container:{
    backgroundColor:'#151413',
    flex:1,
  }
})