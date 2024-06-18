import React, { useState } from 'react';
import {
  StyleSheet, Text, View, StatusBar, TextInput, Platform, Pressable, ScrollView,
  ActivityIndicator, Alert, Keyboard
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const Trips = () => {
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 54;
  const KEY_GPT = 'sk-proj-E7tlfYssXVYfZZ9V1AI8T3Blb3f232322f3332323f3f3ff3232f23fkFJirzrUDDZcFBvU1CIytwU'; // Insira sua chave GPT aqui

  const [city, setCity] = useState("");
  const [days, setDays] = useState(3);
  const [loading, setLoading] = useState(false);
  const [travel, setTravel] = useState("");

  async function handleGenerate() {
    if (city === "") {
      Alert.alert("Atenção", "Preencha o nome da cidade!");
      return;
    }

    setTravel("");
    setLoading(true);
    Keyboard.dismiss();

    const prompt = `Crie um roteiro detalhado para uma viagem de exatos ${days.toFixed(0)} dias na cidade de ${city}. O roteiro deve incluir:

    Lugares turísticos e os mais visitados.
    Informações sobre o nível de perigo de cada local.
    Valores médios de gastos em cada local.
    Cálculo do valor total estimado para todo o percurso.
    O roteiro deve ser fornecido em tópicos com o nome do local a ser visitado em cada dia. Limite o roteiro apenas à cidade fornecida.`;

    const fetchTravelPlan = async (retries) => {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${KEY_GPT}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.20,
            max_tokens: 500,
            top_p: 1,
          })
        });

        if (!response.ok) {
          if (response.status === 429 && retries > 0) {
            // Retentar após esperar algum tempo
            await new Promise(resolve => setTimeout(resolve, (2 ** (3 - retries)) * 1000)); // Backoff exponencial
            return fetchTravelPlan(retries - 1);
          } else {
            throw new Error(`Requisição à API falhou com status ${response.status}`);
          }
        }

        const data = await response.json();

        if (data.choices && data.choices[0] && data.choices[0].message) {
          console.log(data.choices[0].message.content);
          setTravel(data.choices[0].message.content);
        } else {
          throw new Error('Estrutura de resposta da API inesperada');
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelPlan(3); // Retentar até 3 vezes
  }

  const handleAddToGoals = () => {
    Alert.alert("Sucesso", "A meta foi adicionada com sucesso!");
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />
      <Text style={styles.heading}>Roteiro CoinDezu</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Cidade destino</Text>
        <TextInput
          placeholder="Ex: Campo Grande, MS"
          style={styles.input}
          value={city}
          onChangeText={(text) => setCity(text)}
          placeholderTextColor="black"
        />

        <View style={styles.daysContainer}>
          <Text style={styles.label}>Tempo de estadia:</Text>
          <Text style={styles.days}>{days.toFixed(0)} dias</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={7}
          minimumTrackTintColor="#ff7932"
          maximumTrackTintColor="#f63700"
          thumbTintColor="#f63700"
          value={days}
          onValueChange={(value) => setDays(value)}
        />
      </View>

      <Pressable style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Gerar roteiro</Text>
        <MaterialIcons name="travel-explore" size={24} color="#FFF" />
      </Pressable>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {loading && (
          <View style={styles.content}>
            <ActivityIndicator color="#4CAF50" size="large" />
            <Text style={styles.loadingText}>Gerando roteiro...</Text>
          </View>
        )}

        {travel !== "" && (
          <View style={styles.content}>
            <Text style={styles.title}>Roteiro da viagem</Text>
            <Text style={styles.travelText}>{travel}</Text>
            <Pressable onPress={handleAddToGoals} style={styles.addToGoalsButton}>
              <Text style={styles.addToGoalsText}>Adicionar à Meta</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004853',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  form: {
    width: '90%',
    backgroundColor: '#00b9bd',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004853',
  },
  input: {
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  days: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004853',
  },
  slider: {
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f63700',
    width: '90%',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 8,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  content: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  travelText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
  },
  addToGoalsButton: {
    marginTop: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    width: '100%',
  },
  addToGoalsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
});

export default Trips;
