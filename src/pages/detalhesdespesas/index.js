import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const data = [
  { id: '1', tipo: 'Agua', fornecedor: 'Sabesp', valor: 200, status: 'Pago', dataPagamento: '10/07/2024' },
  { id: '2', tipo: 'Agua', fornecedor: 'Sabesp', valor: 200, status: 'Pago', dataPagamento: '10/07/2024' },
  { id: '3', tipo: 'Agua', fornecedor: 'Sabesp', valor: 200, status: 'Pendente', dataPagamento: null },
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes dos Pagamentos</Text>
      <Text style={styles.description}>Acompanhe abaixo os detalhes dos pagamentos do Mês X.</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)} style={styles.row}>
            <Text style={styles.cell}>{item.tipo}</Text>
            <Text style={styles.cell}>{item.fornecedor}</Text>
            <Text style={styles.cell}>{`R$ ${item.valor.toFixed(2)}`}</Text>
            <Text style={[styles.cell, item.status === 'Pago' ? styles.paid : styles.pending]}>{item.status}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Tipo</Text>
            <Text style={styles.headerCell}>Fornecedor</Text>
            <Text style={styles.headerCell}>Valor</Text>
            <Text style={styles.headerCell}>Status</Text>
          </View>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes da Despesa</Text>
            {selectedItem && (
              <>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Tipo: </Text>{selectedItem.tipo}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Fornecedor: </Text>{selectedItem.fornecedor}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Valor: </Text>R$ {selectedItem.valor.toFixed(2)}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Status: </Text>{selectedItem.status}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Data de Pagamento: </Text>{selectedItem.dataPagamento || 'N/A'}
                </Text>
              </>
            )}
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#091440',
  },
  title: {
    fontSize: 28,
    marginTop: 50,
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
    paddingVertical: 15,
    paddingHorizontal: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 8,
    backgroundColor: '#1A2B5C',
    borderRadius: 6,
    marginBottom: 6,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#121212',
    fontSize: 12,
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
    borderRadius: 10,
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
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  modalLabel: {
    fontWeight: 'bold',
  },
  closeButton: {
    alignSelf: 'center',
    backgroundColor: '#F63700',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetalhesScreen;
