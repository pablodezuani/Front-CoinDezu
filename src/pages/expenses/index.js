import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedExpense, setSelectedExpense] = useState(null);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50, 70, 40, 60, 90, 100],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  const expensesData = {
    "Jan": [{ category: "Gastos", amount: 20 }, { category: "Cartão", amount: 15 }, { category: "Gas", amount: 10 }, { category: "Internet", amount: 5 }],
    "Feb": [{ category: "Gastos", amount: 25 }, { category: "Cartão", amount: 20 }, { category: "Gas", amount: 15 }, { category: "Internet", amount: 10 }],
    // Adicione mais dados conforme necessário
  };

  const expenseColors = {
    Gastos: {
      backgroundGradientFrom: '#4FE9C4',
      backgroundGradientTo: '#1D70C0',
      color: 'rgba(0, 123, 255, 1)',
    },
    Cartão: {
      backgroundGradientFrom: '#E2B94F',
      backgroundGradientTo: '#FD3E85',
      color: 'rgba(255, 235, 59, 1)',
    },
    Outros: {
      backgroundGradientFrom: '#FFDB0F',
      backgroundGradientTo: '#E87A10',
      color: 'rgba(220, 53, 69, 1)',
    },
    default: {
      backgroundGradientFrom: '#1c313a',
      backgroundGradientTo: '#4f9a94',
      color: 'rgba(134, 65, 244, 1)',
    }
  };

  const selectedColors = expenseColors[selectedExpense] || expenseColors.default;

  const filteredData = selectedExpense && selectedMonth === "All" ? {
    labels: data.labels,
    datasets: [
      {
        data: data.datasets[0].data,
        color: (opacity = 1) => selectedColors.color,
        strokeWidth: 2,
      }
    ]
  } : selectedExpense ? {
    labels: [selectedMonth],
    datasets: [
      {
        data: [data.datasets[0].data[data.labels.indexOf(selectedMonth)]],
        color: (opacity = 1) => selectedColors.color,
        strokeWidth: 2,
      }
    ]
  } : null;

  const handlePointClick = (pointData) => {
    const month = data.labels[pointData.index];
    const expenses = expensesData[month] || [];
    navigation.navigate('DetalhesDespesas', { month, expenses });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Despesas</Text>
      </View>

      <View style={styles.pickerRow}>
        <View style={styles.pickerWrapper}>
          <Text style={styles.title}>Ano</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={[
                { label: "2025", value: "2025" },
                { label: "2024", value: "2024" },
                { label: "2023", value: "2023" },
                { label: "2022", value: "2022" }
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "Selecione o ano", value: null }}
              Icon={() => <Icon name="calendar-today" size={24} color="#ffe8d3" />}
            />
          </View>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.title}>Despesa</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedExpense(value)}
              items={[
                { label: "Gastos", value: "Gastos" },
                { label: "Cartão", value: "Cartão" },
                { label: "Outros", value: "Outros" }
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "Selecione a despesa", value: null }}
              Icon={() => <Icon name="list" size={24} color="#ffe8d3" />}
            />
          </View>
        </View>
      </View>

      {filteredData && (
        <View style={styles.chartContainer}>
          <LineChart
            data={filteredData}
            width={Dimensions.get('window').width - 40}
            height={350}
            yAxisLabel="R$"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: selectedColors.backgroundGradientFrom,
              backgroundGradientFrom: selectedColors.backgroundGradientFrom,
              backgroundGradientTo: selectedColors.backgroundGradientTo,
              color: (opacity = 25) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 12) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "8",
                strokeWidth: "4",
                stroke: "#ffa726",
                fill: "#FFF",
              },
              propsForBackgroundLines: {
                stroke: "#121212",
                strokeDasharray: "",
              }
            }}
            bezier
            style={{
              marginVertical: 30,
              borderRadius: 14,
            }}
            xLabelsOffset={-1}
            onDataPointClick={handlePointClick}
          />
        </View>
      )}

    </ScrollView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ffe8d3',
    borderRadius: 4,
    color: '#ffe8d3',
    paddingRight: 30,
    backgroundColor: '#091440',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ffe8d3',
    borderRadius: 4,
    color: '#ffe8d3',
    paddingRight: 30,
    backgroundColor: '#091440',
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#091440',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  headerContainer: {
    backgroundColor: '#1c313a',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffe8d3',
    textAlign: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerWrapper: {
    width: '48%',
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'flex-start',
    color: '#ffe8d3',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
  }
});
