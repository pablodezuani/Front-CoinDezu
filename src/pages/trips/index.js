import React, { useState } from 'react';
import {
  StyleSheet, Text, View, StatusBar, TextInput, Platform, Pressable, ScrollView,
  ActivityIndicator, Alert, Keyboard
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const Trips = () => {
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 54;
  const KEY_GPT = 'sk-proj-E7tlfYssXVYfZZ9V1AI8T3BlbkFJirzrUDDZcFBvU1CIytwU'; // Insira sua chave GPT aqui

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
        />

        <Text style={styles.label}>Tempo de estadia: <Text style={styles.days}> {days.toFixed(0)} </Text> dias</Text>
        <Slider
          minimumValue={1}
          maximumValue={7}
          minimumTrackTintColor="#009688"
          maximumTrackTintColor="#000000"
          value={days}
          onValueChange={(value) => setDays(value)}
        />
      </View>

      <Pressable style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Gerar roteiro</Text>
        <MaterialIcons name="travel-explore" size={24} color="#FFF" />
      </Pressable>

      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }} style={styles.containerScroll} showsVerticalScrollIndicator={false} >
        {loading && (
          <View style={styles.content}>
            <Text style={styles.title}>Carregando roteiro...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {travel && (
          <View style={styles.content}>
            <Text style={styles.title}>Roteiro da viagem 👇</Text>
            <Text style={styles.travelText}>{travel}</Text>
            <Pressable onPress={handleAddToGoals}>
              <Text style={styles.addToGoals}>Adicionar à Meta</Text>
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
    backgroundColor: '#171615',
    alignItems: 'center',
    paddingTop: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 54,
    color: '#FFFF',
  },
  form: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#94a3b8',
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  days: {
    backgroundColor: '#F1F1F1',
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#126782',
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#FFF',
    padding: 16,
    width: '100%',
    marginTop: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
    color: '#333',
  },
  travelText: {
    lineHeight: 24,
    color: '#333',
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
  },
  addToGoals: {
    marginTop: 10,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    backgroundColor: '#126782',
    width:'100%',
    borderRadius:8,
    height:36,
    padding:5,

  },
})

export default Trips;
