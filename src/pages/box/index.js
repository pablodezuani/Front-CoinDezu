import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Button, Card, Title, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GoalItem = ({ title, total, saved, onPress }) => {
  const percentSaved = ((saved / total) * 100).toFixed(2);

  return (
    <TouchableOpacity onPress={onPress} style={styles.goalTouchable}>
      <Card style={styles.goalCard}>
        <Card.Content>
          <Title style={styles.title}>{title}</Title>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={{ width: `${percentSaved}%`, backgroundColor: '#127682', borderRadius: 5, height: '100%' }}>
                <Text style={styles.progressValue}>{percentSaved}%</Text>
              </View>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.text2}>Total: R$ {total.toLocaleString('pt-BR')}</Text>
            <Text style={styles.text2}>Guardado:</Text>
            <Text style={styles.savedAmount}>R$ {saved.toLocaleString('pt-BR')}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const Box = () => {
  const navigation = useNavigation();
  const [goals, setGoals] = useState([
    { title: 'Viagem', total: 5000, saved: 4000 },
    { title: 'Carro novo', total: 15000, saved: 5000 },
    { title: 'Casa própria', total: 100000, saved: 30000 },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTotal, setNewGoalTotal] = useState('');
  const [transfers, setTransfers] = useState([
    { goal: 'Viagem', amount: 2000, type: 'Depósito', date: '2023-05-01' },
    { goal: 'Carro novo', amount: 500, type: 'Depósito', date: '2023-04-25' },
    { goal: 'Casa própria', amount: 1000, type: 'Depósito', date: '2023-04-20' },
    { goal: 'Casa própria', amount: 1000, type: 'Depósito', date: '2023-04-20' },
  ]);

  const totalSaved = goals.reduce((acc, goal) => acc + goal.saved, 0) + transfers.reduce((acc, transfer) => acc + transfer.amount, 0);

  const addGoal = () => {
    if (newGoalTitle && newGoalTotal) {
      setGoals([...goals, { title: newGoalTitle, total: parseInt(newGoalTotal), saved: 0 }]);
      setModalVisible(false);
      setNewGoalTitle('');
      setNewGoalTotal('');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Minhas Metas</Text>
        <Text style={styles.mainDescription}>Acompanhe suas metas e veja o total guardado.</Text>
        <Text style={styles.totalSaved}>Total Guardado: R$ {totalSaved.toLocaleString('pt-BR')}</Text>

        <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
          {goals.map((goal, index) => (
            <GoalItem
              key={index}
              title={goal.title}
              total={goal.total}
              saved={goal.saved}
              onPress={() => navigation.navigate('GoalDetailScreen', { goal })}
            />
          ))}
        </ScrollView>

        <View style={styles.transfersContainer}>
          <Text style={styles.transfersTitle}>Últimas Transferências</Text>
          <ScrollView contentContainerStyle={styles.transfersContent}>
            {transfers.map((transfer, index) => (
              <View key={index} style={styles.transferRow}>
                <View style={styles.transferGoal}>
                  <Ionicons name="bookmark" size={20} color="#4CAF50" />
                  <Text style={styles.transferGoalText}>{transfer.goal}</Text>
                </View>
                <View style={styles.transferDetails}>
                  <Text style={styles.transferAmount}>{`R$ ${transfer.amount.toLocaleString('pt-BR')}`}</Text>
                  <Text style={styles.transferType}>{transfer.type}</Text>
                  <Text style={styles.transferDate}>{transfer.date}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-outline" size={32} color="#FFFFFF" />
        </TouchableOpacity>

        <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Adicionar Nova Meta</Text>
              <TextInput
                style={styles.input}
                placeholder="Título da Meta"
                value={newGoalTitle}
                onChangeText={(text) => setNewGoalTitle(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Valor Total"
                keyboardType="numeric"
                value={newGoalTotal}
                onChangeText={(text) => setNewGoalTotal(text)}
              />
              <Button mode="contained" onPress={addGoal} style={styles.modalAddButton}>
                Adicionar
              </Button>
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
    paddingTop: 20,
    backgroundColor: '#121212',
    paddingHorizontal: 10,
  },
  mainTitle: {
    fontSize: 28,
    color: '#FFFFFF',
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
  totalSaved: {
    fontSize: 18,
    color: '#127682',
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#127682',
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
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text2: {
    color: '#BBBBBB',
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
  progressValue: {
    position: 'absolute',
    right: 5,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  amountContainer: {
    marginTop: 10,
    flexDirection: 'column',
  },
  savedAmount: {
    color: '#4CAF50',
    fontSize: 12,
  },
  transfersContainer: {
    flex: 12,
    paddingHorizontal: 10,
  },
  transfersTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  transfersContent: {
    paddingBottom: 20,
  },
  transferRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#363636',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 5,
  },
  transferGoal: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  transferGoalText: {
    color: '#127682',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  transferDetails: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  transferAmount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transferType: {
    color: '#BBBBBB',
    fontSize: 14,
  },
  transferDate: {
    color: '#BBBBBB',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#127682',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#4E4A4A',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalAddButton: {
    backgroundColor: 'black',
    marginTop: 10,
  },
});

export default Box;
