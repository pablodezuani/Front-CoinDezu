import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Button } from 'react-native';
import { Header } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ConfettiCannon from 'react-native-confetti-cannon';

const GoalDetailScreen = () => {
  const [goalValue, setGoalValue] = useState(3500);
  const [transactions, setTransactions] = useState([
    { id: '1', type: 'Entrada', amount: 3500, date: '2024-05-22' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDeposit, setIsDeposit] = useState(true);
  const [amount, setAmount] = useState('');
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
    const value = parseFloat(amount);
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

  return (
    <View style={styles.container}>
     
      <View style={styles.contentContainer}>
        <Text style={styles.goalName}>{goalName}</Text>
        <Text style={styles.goalTotal}>Total da Meta: {goalTotal}</Text>
        <Text style={styles.goalValue}>Valor Atual: {goalValue}</Text>
        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            size={200}
            width={30}
            fill={progress * 100}
            tintColor="#6200EE"
            backgroundColor="#e6e6e6"
            lineCap="round"
            rotation={0}
            duration={1000}
          />
        </View>
        <Text style={styles.progressText}>{progressPercentage}%</Text>
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
                {item.date} - {item.type}: {item.amount}
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
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Valor"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.modalButtonsContainer}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Confirmar" onPress={handleTransaction} />
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
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  goalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  goalTotal: {
    fontSize: 18,
    marginBottom: 5,
  },
  goalValue: {
    fontSize: 18,
    marginBottom: 20,
  },
  progressContainer: {
    marginVertical: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  transactionList: {
    width: '100%',
  },
  transactionItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
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
});

export default GoalDetailScreen;
