import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Animated, Easing } from 'react-native';
import { TextInput, Button, Card, Title, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import MaskInput, { Masks } from 'react-native-mask-input';

const box = () => {
  const [amount, setAmount] = useState('');
  const [goal, setGoal] = useState('');
  const scaleAnim = useState(new Animated.Value(0))[0];

  const handleSaveMoney = () => {
    if (amount && goal) {
      Alert.alert('Sucesso!', `Você guardou ${amount} para ${goal}.`);
      setAmount('');
      setGoal('');
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Animated.View style={{ ...styles.animatedView, transform: [{ scale: scaleAnim }] }}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Guardar Dinheiro</Title>
              <MaskInput
                style={styles.input}
                mask={Masks.BRL_CURRENCY}
                placeholder="R$ 0,00"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                render={(props) => (
                  <TextInput
                    {...props}
                    mode="outlined"
                    label="Digite o valor"
                    left={<TextInput.Icon name={() => <Ionicons name="cash-outline" size={20} />} />}
                  />
                )}
              />
              <TextInput
                mode="outlined"
                label="Digite o objetivo"
                placeholder="Ex: Viagem"
                value={goal}
                onChangeText={setGoal}
                left={<TextInput.Icon name={() => <Ionicons name="flag-outline" size={20} />} />}
                style={styles.input}
              />
              <Button
                mode="contained"
                onPress={handleSaveMoney}
                style={styles.button}
                icon="check-circle-outline"
              >
                Guardar
              </Button>
            </Card.Content>
          </Card>
        </Animated.View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  backgroundColor:'#171615'
  },
  animatedView: {
    alignItems: 'center',
  },
  card: {
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    backgroundColor:'#126782',

  },
});

export default box;
