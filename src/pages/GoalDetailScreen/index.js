import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ConfettiCannon from 'react-native-confetti-cannon';
import { TextInputMask } from 'react-native-masked-text';

const GoalDetailScreen = () => {
  const [goalValue, setGoalValue] = useState(3500);
  const [transactions, setTransactions] = useState([
    { id: '1', type: 'Entrada', amount: 3500, date: '2024-05-22' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDeposit, setIsDeposit] = useState(true);
  const [amount, setAmount] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const confettiRef = useRef(null);

  const goalName = 'Economizar para Viagem';
  const goalTotal = 10000;
  const progress = goalValue / goalTotal;
  const progressPercentage = (progress * 100).toFixed(2);

  useEffect(() => {
    if (progress >= 1) {
      confettiRef.current.start();
    }
  }, [progress]);

  const handleTransaction = () => {
    const value = parseFloat(amount.replace(/[^\d,-]/g, '').replace(',', '.'));
    if (isNaN(value) || value <= 0) {
      alert('Por favor, insira um valor válido.');
      return;
    }

    const newGoalValue = isDeposit ? goalValue + value : goalValue - value;

    if (!isDeposit && newGoalValue < 0) {
      alert('Saldo insuficiente');
      return;
    }

    setGoalValue(newGoalValue);

    const newTransaction = {
      id: Math.random().toString(),
      type: isDeposit ? 'Entrada' : 'Saída',
      amount: value,
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([...transactions, newTransaction]);
    setModalVisible(false);
    setAmount('');
  };

  const openModal = (deposit) => {
    setIsDeposit(deposit);
    setModalVisible(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteAllTransactions = () => {
    setTransactions([]);
    setGoalValue(0);
    setDeleteModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity  style={styles.excluir}onPress={openDeleteModal}>
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.goalName}>{goalName}</Text>
        
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.goalTotal}>Total da Meta: {formatCurrency(goalTotal)}</Text>
        <Text style={styles.goalValue}>Valor Atual: {formatCurrency(goalValue)}</Text>
        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            size={200}
            width={19}
            fill={progress * 100}
            tintColor="#126782"
            backgroundColor="#e6e6e6"
            lineCap="round"
            rotation={0}
            duration={1000}
          >
            {() => (
              <Text style={styles.progressText}>{progressPercentage}%</Text>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => openModal(true)}>
            <Text style={styles.buttonText}>Depositar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => openModal(false)}>
            <Text style={styles.buttonText}>Sacar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[
              styles.transactionItem,
              item.type === 'Entrada' ? styles.income : styles.expense
            ]}>
              <Text style={styles.transactionText}>
                {item.date} - {item.type}: {formatCurrency(item.amount)}
              </Text>
            </View>
          )}
          style={styles.transactionList}
        />
      </View>
      {progress >= 1 && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fadeOut
          ref={confettiRef}
        />
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{isDeposit ? 'Depositar' : 'Sacar'}</Text>
            <TextInputMask
              style={styles.input}
              type={'money'}
              options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$ ',
                suffixUnit: ''
              }}
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleTransaction}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalMessage}>Tem certeza de que deseja excluir todas as transações?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleDeleteAllTransactions}>
                <Text style={styles.modalButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171615',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  goalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize:15,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  goalTotal: {
    fontSize: 18,
    marginBottom: 5,
    color: '#fff',
    textAlign: 'center',
  },
  goalValue: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  progressContainer: {
    marginVertical: 20,
    alignItems: 'center',
    color: 'white',
  },
  progressText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFF',
    position: 'absolute',
    alignSelf: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#126782',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  transactionList: {
    width: '100%',
    flex: 1,
  },
  transactionItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  transactionText: {
    fontSize: 16,
  },
  income: {
    borderLeftColor: 'green',
    borderLeftWidth: 5,
  },
  expense: {
    borderLeftColor: 'red',
    borderLeftWidth: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  excluir:{
alignContent:'center'
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#126782',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GoalDetailScreen;
