import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Button, Card, Title, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const GoalItem = ({ title, total, saved }) => {
  const percentSaved = ((saved / total) * 100).toFixed(2);

  return (
    <Card style={styles.goalCard}>
      <Card.Content>
        <Title style={styles.title}>{title}</Title>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={{ width: `${percentSaved}%`, backgroundColor: '#4CAF50', borderRadius: 5, height: '100%' }}>
              <Text style={styles.progressValue}>{percentSaved}%</Text>
            </View>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.text2}>Total: {total}</Text>
          <Text style={styles.text2}>Guardado: {saved}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const Box = () => {
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
  ]);

  const addGoal = () => {
    if (newGoalTitle && newGoalTotal) {
      setGoals([...goals, { title: newGoalTitle, total: parseInt(newGoalTotal), saved: 0 }]);
      setModalVisible(false);
      setNewGoalTitle('');
      setNewGoalTotal('');
    }
  };

  const totalSaved = goals.reduce((acc, goal) => acc + goal.saved, 0);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Minhas Metas</Text>
        <Text style={styles.mainDescription}>Acompanhe suas metas e veja o total guardado.</Text>
        <Text style={styles.totalSaved}>Total Guardado: {totalSaved}</Text>
        
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={40} color="#FFFFFF" />
        </TouchableOpacity>
        
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          {goals.map((goal, index) => (
            <GoalItem key={index} title={goal.title} total={goal.total} saved={goal.saved} />
          ))}
        </ScrollView>
        
        <View style={styles.transfersContainer}>
          <Text style={styles.transfersTitle}>Últimas Transferências</Text>
          <View style={styles.transfersHeader}>
            <Text style={styles.transferColumn}>Meta</Text>
            <Text style={styles.transferColumn}>Valor</Text>
            <Text style={styles.transferColumn}>Tipo</Text>
            <Text style={styles.transferColumn}>Data</Text>
          </View>
          <ScrollView>
            {transfers.map((transfer, index) => (
              <View key={index} style={styles.transferRow}>
                <View style={styles.transferGoal}>
                  <Ionicons name="bookmark" size={20} color="#4CAF50" />
                  <Text style={styles.transferText}>{transfer.goal}</Text>
                </View>
                <Text style={styles.transferText}>{`R$ ${transfer.amount}`}</Text>
                <Text style={styles.transferText}>{transfer.type}</Text>
                <Text style={styles.transferText}>{transfer.date}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
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
            <Button mode="contained" onPress={addGoal} style={styles.addButton}>
              Adicionar
            </Button>
          </View>
        </View>
      </Modal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#171615',
    paddingHorizontal: 10,
  },
  mainTitle: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  mainDescription: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  totalSaved: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  scrollViewContent: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
   
  },
 goalCard: {
    marginTop: 50,
    width: 250,
    height: 150,
    marginRight: 10,
    backgroundColor: '#126782',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  text2: {
    color: '#FFF',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 18,
  },
  progressBar: {
    flex: 1,
    backgroundColor: '#555',
    height: 20,
    borderRadius: 18,
    marginRight: 5,
  },
  progressText: {
    color: '#FFFFFF',
  },
  amountContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transfersContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  transfersTitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  transfersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
    paddingBottom: 5,
  },
  transferColumn: {
    flex: 1,
    color: '#FFF',
    textAlign: 'center',
  },
  transferRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  transferGoal: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  transferText: {
    color: '#FFF',
    textAlign: 'center',
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
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
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Box;