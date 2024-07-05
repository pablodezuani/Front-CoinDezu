
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';


const data = [
  { id: '1', tipo: 'Agua',Fornecedor:'Sabesp' ,valor: 200, status: 'Pago', dataPagamento: '01/01/2024' },
  { id: '2', tipo: 'Luz',Fornecedor:'Enel' ,valor: 200, status: 'Pago', dataPagamento: '01/01/2024' },
  { id: '3', tipo: 'Internet',Fornecedor:'Claro' ,valor: 200, status: 'pendente', dataPagamento: '01/01/2024' },
  { id: '4', tipo: 'Compras',Fornecedor:'Atacadão' ,valor: 200, status: 'Pago', dataPagamento: '01/01/2024' },
  { id: '5', tipo: 'Convenio',Fornecedor:'Amil' ,valor: 900, status: 'Pago', dataPagamento: '01/01/2024' },
  { id: '6', tipo: 'Convenio mãe',Fornecedor:'Amil' ,valor: 1500, status: 'Pago', dataPagamento: '01/01/2024' },
  { id: '7', tipo: 'Seguro HRV',Fornecedor:'Porto Seguro' ,valor: 500, status: 'pendente', dataPagamento: '01/01/2024' },
];

const DetalhesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const chartData = {
    labels: data.map(item => item.mes),
    datasets: [
      {
        data: data.map(item => item.valor),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes dos Pagamentos</Text>
      <Text style={styles.description}>Acompanhe abaixo os detalhes dos pagamentos mensais.</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)} style={styles.row}>
             <Text style={styles.cell}>{item.tipo}</Text>
            <Text style={styles.cell}>{item.Fornecedor}</Text>
            <Text style={styles.cell}>{`R$ ${item.valor.toFixed(2)}`}</Text>
            <Text style={[styles.cell, item.status === 'Pago' ? styles.paid : styles.pending]}>{item.status}</Text>
            <Text style={styles.cell}>{item.dataPagamento}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Tipo</Text>
            <Text style={styles.headerCell}>Fornecedor</Text>
            <Text style={styles.headerCell}>Valor</Text>
            <Text style={styles.headerCell}>Status</Text>
            <Text style={styles.headerCell}>Data de Pagamento</Text>
          </View>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Fornecedor de Cartão </Text>
            <Text style={styles.modalText}>Mês: {selectedItem ? selectedItem.tipo : ''}</Text>
            <Text style={styles.modalText}>Valor: R$ {selectedItem ? selectedItem.valor.toFixed(2) : ''}</Text>
            <Text style={styles.modalText}>Status: {selectedItem ? selectedItem.status : ''}</Text>
            <Text style={styles.modalText}>Data de Pagamento: {selectedItem ? selectedItem.dataPagamento : ''}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#004853',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#ffe8d3',
  },
  description: {
    fontSize: 18,
    color: '#ffe8d3',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#007e80',
    borderRadius: 8,
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#121212',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',

  },
  paid: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  pending: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#121212',
  },
  modalText: {
    color: '#121212',
    fontSize: 18,
    marginBottom: 8,
  },
  closeButton: {
    alignSelf: 'center',
    backgroundColor: '#F63700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetalhesScreen;
 