import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Card, Title, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';

const GoalItem = ({ title, total, saved, onPress }) => {
  const percentSaved = ((saved / total) * 100).toFixed(2);
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.goalTouchable}>
      <Card style={styles.goalCard}>
        <Card.Content>
          <Title style={styles.title}>{title}</Title>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={{ ...styles.progressBarFill, width: `${percentSaved}%` }}>
                <Text style={styles.progressValue}>{percentSaved}%</Text>
              </View>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.text2}>Meta: R$ {total.toLocaleString('pt-BR')}</Text>
            <Text style={styles.text2}>Guardado: R$ {saved.toLocaleString('pt-BR')}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const Box = () => {
  const navigation = useNavigation();
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTotal, setNewGoalTotal] = useState('');

  const fetchGoals = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('https://backend-coin-dezu.vercel.app/metas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGoals(response.data);
    } catch (error) {
      console.error('Erro ao buscar metas:', error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const addGoal = async () => {
    if (newGoalTitle && newGoalTotal) {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.post('https://backend-coin-dezu.vercel.app/metas', {
          name: newGoalTitle,
          target_amount: parseFloat(newGoalTotal.replace(/[^\d]+/g, '')),
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGoals([...goals, response.data]);
        setModalVisible(false);
        setNewGoalTitle('');
        setNewGoalTotal('');
      } catch (error) {
        console.error('Erro ao adicionar meta:', error);
      }
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Minhas Metas</Text>
        <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
          {goals.map((goal) => (
            <GoalItem
              key={goal.id} // Use o ID único da meta
              title={goal.name}
              total={goal.target_amount}
              saved={goal.saved_amount}
              onPress={() => navigation.navigate('GoalDetailScreen', { goal })}
            />
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-outline" size={32} color="#ffe8d3F" />
        </TouchableOpacity>

        <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Adicionar Nova Meta</Text>
              <TextInput
                style={styles.input}
                placeholder="Título da Meta"
                placeholderTextColor="#AAAAAA"
                value={newGoalTitle}
                onChangeText={(text) => setNewGoalTitle(text)}
              />
              <TextInputMask
                style={styles.input}
                type={'money'}
                placeholder='R$ 20,00'
                placeholderTextColor="#AAAAAA"
                options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }}
                value={newGoalTotal}
                onChangeText={(text) => setNewGoalTotal(text)}
              />
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={addGoal}>
                  <Text style={styles.modalButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#091440',
    paddingHorizontal: 10,
  },
  mainTitle: {
    fontSize: 28,
    color: '#ffe8d3',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mainDescription: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#00b9bd',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  goalTouchable: {
    marginRight: 12,
  },
  goalCard: {
    width: 200,
    backgroundColor: '#1A2B5C',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#eefffd',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text2: {
    color: '#eefffd',
    fontSize: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 18,
  },
  progressBar: {
    flex: 1,
    backgroundColor: '#555555',
    height: 20,
    borderRadius: 18,
    marginRight: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#fb6900',
    borderRadius: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressValue: {
    color: '#ffe8d3',
    fontWeight: 'bold',
    fontSize: 12,
  },
  amountContainer: {
    marginTop: 10,
    flexDirection: 'column',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#FFF',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    color: '#121212',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#121212',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#fb6900',
    marginRight: 5,
  },
  confirmButton: {
    backgroundColor: '#00b9bd',
    marginLeft: 5,
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Box;
