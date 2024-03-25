import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Modal, TouchableWithoutFeedback, Input,Button} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

export default function Actions() {

  // Estados para controlar a visibilidade de cada modal
  const [modalVisibleEntradas, setModalVisibleEntradas] = useState(false);
  const [modalVisibleBoleto, setModalVisibleBoleto] = useState(false);
  const [modalVisibleCompras, setModalVisibleCompras] = useState(false);
  const [modalVisiblePix, setModalVisiblePix] = useState(false);
  const [modalVisibleCartao, setModalVisibleCartao] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const navigation =useNavigation();
  const handleGoToCaixinha = () => {
  }


  return (
    <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
      {/* Botões para abrir cada modal */}
      <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisibleEntradas(true)}>
        <View style={styles.ButtonArea}>
          <AntDesign name="plussquare" size={24} color="#8C2A96" />
        </View>
        <Text style={styles.buttonlabel}>Entradas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}onPress={() =>navigation.navigate('box')}>
        <View style={styles.ButtonArea}>
          <AntDesign name="piechart" size={24} color="#8C2A96" />
        </View>
        <Text style={styles.buttonlabel}>Caixinha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisibleBoleto(true)}>
        <View style={styles.ButtonArea}>
          <AntDesign name="barcode" size={24} color="#8C2A96" />
        </View>
        <Text style={styles.buttonlabel}>Boleto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisibleCompras(true)}>
        <View style={styles.ButtonArea}>
          <AntDesign name="shoppingcart" size={24} color="#8C2A96" />
        </View>
        <Text style={styles.buttonlabel}>Compras</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisiblePix(true)}>
        <View style={styles.ButtonArea}>
          <AntDesign name="tagso" size={24} color="#8C2A96" />
        </View>
        <Text style={styles.buttonlabel}>Pix</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisibleCartao(true)}>
        <View style={styles.ButtonArea}>
          <AntDesign name="creditcard" size={24} color="black" />
        </View>
        <Text style={styles.buttonlabel}>Cartão</Text>
      </TouchableOpacity>

      {/* Modal para Entradas */}
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisibleEntradas}
      onRequestClose={() => setModalVisibleEntradas(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisibleEntradas(false)}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setModalVisibleEntradas(false)} style={styles.closeIcon}>
                <Feather name="x" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.Titlehome}>Adicione a Sua Entrada</Text>
<Text
style={styles.Select}
>Tipo de entrada</Text>
              <RNPickerSelect
placeholder={{ label: 'Tipo de entrada', value: null }}
  onValueChange={(value) => console.log(value)}
  items={[
    { label: 'Salario', value: 'Salario' },
    { label: 'Deposito', value: 'Deposito' },
    { label: 'Outros ', value: 'Outros' },
  ]}
/>
 <Input
                style={{ height: 50, width: 320, borderColor: 'gray', borderWidth: 1, borderRadius: 0, padding: 5 }}
                margin="4px 0px 4px 4px"
                placeholder="Nome da entrada"
                textAlign="center"
                title="Nome da entrada"
              />

<Input
                style={{ height: 50, width: 320, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 5 }}
                margin="4px 0px 4px 4px"
                placeholder="Nome da entrada"
                textAlign="center"
                title="valor da entrada"
              />
            
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 200 }}>
                <Button title="Lançar" />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

      {/* Modal para Boleto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleBoleto}
        onRequestClose={() => setModalVisibleBoleto(false)}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text>Conteúdo do modal para Boleto</Text>
              <TouchableOpacity onPress={() => setModalVisibleBoleto(false)} style={styles.closeIcon}>
                <Feather name="x" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal para Compras */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleCompras}
        onRequestClose={() => setModalVisibleCompras(false)}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text>Conteúdo do modal para Compras</Text>
              <TouchableOpacity onPress={() => setModalVisibleCompras(false)} style={styles.closeIcon}>
                <Feather name="x" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal para Pix */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisiblePix}
        onRequestClose={() => setModalVisiblePix(false)}
      >
        <TouchableWithoutFeedback >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text>Conteúdo do modal para Pix</Text>
              <TouchableOpacity onPress={() => setModalVisiblePix(false)} style={styles.closeIcon}>
                <Feather name="x" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      
      {/* Modal para Cartão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleCartao}
        onRequestClose={() => setModalVisibleCartao(false)}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text>Conteúdo do modal para Cartão</Text>
              <TouchableOpacity onPress={() => setModalVisibleCartao(false)} style={styles.closeIcon}>
                <Feather name="x" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 84,
    marginBottom: 14,
    marginTop: 18,
    paddingEnd: 14,
    paddingStart: 14,
    backgroundColor:'#126782'
    
  },
  actionButton: {
    alignItems: 'center',
    marginRight: 32,
    
  },
  ButtonArea: {
    backgroundColor: '#C1F4F8',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  buttonlabel: {
    marginTop: 8,
    textAlign: 'center'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent:'flex-end',
    alignItems: 'center',
    padding:25,
  
  },
  modalContent: {
    backgroundColor: '#C1F4F8',
    padding: 20,
    borderRadius: 18,
    elevation: 5,
    height:600,
    width:380,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  Titlehome:{
    marginTop:16,
    fontSize:18,
    fontWeight:'bold'
  },

Select:{
marginTop:24,
marginLeft:12,
 color:'#8C2A96',
 fontWeight:'bold'
},

date:{
  width:350,
}

});

