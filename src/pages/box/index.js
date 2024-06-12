import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput, ScrollView, FlatList } from 'react-native';
import { Button, Card, Title, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
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

  const totalSaved = goals.reduce((acc, goal) => acc + goal.saved, 0) + transfers.reduce((acc, transfer) => acc + transfer.amount, 0);

  const addGoal = () => {
    if (newGoalTitle && newGoalTotal) {
      setGoals([...goals, { title: newGoalTitle, total: parseInt(newGoalTotal.replace(/[^\d]+/g, '')), saved: 0 }]);
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
          <FlatList
            data={transfers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.transferCard}>
                <View style={styles.transferRow}>
                  <View style={styles.transferGoal}>
                    <Ionicons name="bookmark" size={20} color="#4CAF50" />
                    <Text style={styles.transferGoalText}>{item.goal}</Text>
                  </View>
                  <View style={styles.transferDetails}>
                    <Text style={styles.transferAmount}>{`R$ ${item.amount.toLocaleString('pt-BR')}`}</Text>
                    <Text style={styles.transferType}>{item.type}</Text>
                    <Text style={styles.transferDate}>{item.date}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-outline" size={32} color="#FFFFFF" />
        </TouchableOpacity>

        <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Adicionar Nova Meta</Text>
              <TextInput
                style={styles.input}
                placeholder="Título da Meta"
                value={newGoalTitle}
                onChangeText={(text) => setNewGoalTitle(text)}
              />
              <TextInputMask
                style={styles.input}
                type={'money'}
                placeholder='R$ 20,00'
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
    backgroundColor: '#126782',
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
  progressBarFill: {
    backgroundColor: '#127682',
    borderRadius: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressValue: {
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
    textAlign: 'left',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  transferCard: {
    backgroundColor: '#2E2E2E',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  transferRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferGoal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferGoalText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  transferDetails: {
    flex: 2,
    alignItems: 'flex-end',
  },
  transferAmount: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  transferType: {
    fontSize: 14,
    color: '#BBBBBB',
    fontStyle: 'italic',
  },
  transferDate: {
    fontSize: 12,
    color: '#BBBBBB',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
    color: 'black',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    color: 'black',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
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
    backgroundColor: '#ff6347',
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#127682',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Box;
