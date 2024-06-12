import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ConfettiCannon from 'react-native-confetti-cannon';
import { TextInputMask } from 'react-native-masked-text';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';

const GoalDetailScreen = () => {
  const [goalValue, setGoalValue] = useState(3500);
  const [transactions, setTransactions] = useState([{ id: '1', type: 'Entrada', amount: 3500, date: '2024-05-22' }]);
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
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteAllTransactions = () => {
    setTransactions([]);
    setGoalValue(0);
    setDeleteModalVisible(false);
  };

  const getProgressColor = (progress) => {
    if (progress <= 0.5) {
      // Interpolating between red and yellow
      const ratio = progress / 0.5;
      const red = 255;
      const green = Math.round(255 * ratio);
      const blue = 0;
      return `rgb(${red}, ${green}, ${blue})`;
    } else {
      // Interpolating between yellow and green
      const ratio = (progress - 0.5) / 0.5;
      const red = Math.round(255 * (1 - ratio));
      const green = 255;
      const blue = 0;
      return `rgb(${red}, ${green}, ${blue})`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.deleteButton} onPress={openDeleteModal}>
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.goalName}>{goalName}</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.goalTotal}>Total da Meta: {formatCurrency(goalTotal)}</Text>
        <Text style={styles.goalValue}>Valor Atual: {formatCurrency(goalValue)}</Text>
        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            size={200}
            width={19}
            fill={progress * 100}
            tintColor={getProgressColor(progress)}
            backgroundColor="#e6e6e6"
            lineCap="round"
            rotation={0}
            duration={1000}
          >
            {() => <Text style={styles.progressText}>{progressPercentage}%</Text>}
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
            <View style={[styles.transactionItem, item.type === 'Entrada' ? styles.income : styles.expense]}>
              <Ionicons
                name={item.type === 'Entrada' ? 'arrow-down-circle' : 'arrow-up-circle'}
                size={24}
                color={item.type === 'Entrada' ? 'green' : 'red'}
                style={styles.transactionIcon}
              />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionDate}>{item.date}</Text>
                <Text style={styles.transactionType}>{item.type}</Text>
              </View>
              <Text style={styles.transactionAmount}>{formatCurrency(item.amount)}</Text>
            </View>
          )}
          style={styles.transactionList}
        />
      </View>
      {progress >= 1 && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fadeOut ref={confettiRef} />}

      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{isDeposit ? 'Depositar' : 'Sacar'}</Text>
            <TextInputMask
              style={styles.input}
              type={'money'}
              options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }}
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={handleTransaction}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={deleteModalVisible} onRequestClose={() => setDeleteModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalMessage}>Tem certeza de que deseja excluir todas as transações?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={handleDeleteAllTransactions}>
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
    backgroundColor: '#126782',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  goalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    width: 65,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  goalTotal: {
    fontSize: 20,
    marginBottom: 5,
    color: '#fff',
    textAlign: 'center',
  },
  goalValue: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  progressContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
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
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  transactionIcon: {
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#126782',
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
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#126782',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#f0f0f0',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff6347',
  },
  confirmButton: {
    backgroundColor: '#126782',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GoalDetailScreen;

