import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Balance({ saldo, gastos }) {
  const [showValues, setShowValues] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Saldo</Text>
        <View style={styles.content}>
          <Text style={styles.currencySymbol}>R$</Text>
          <View style={styles.content}>
            {showValues ? (
              <Text style={styles.balance}>{saldo}</Text>
            ) : (
              <View style={styles.ocultar}></View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.item}>
        <Text style={styles.itemTitle}>Gastos</Text>
        <View style={styles.content}>
          <Text style={styles.currencySymbol}>R$</Text>
          <View style={styles.content}>
            {showValues ? (
              <Text style={styles.gastos}>{gastos}</Text>
            ) : (
              <View style={styles.ocultar}></View>
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => setShowValues(!showValues)}>
        <Icon name={showValues ? "eye" : "eye-off"} size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#006170',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingStart: 18,
    paddingEnd: 18,
    marginTop: -30,
    marginStart: 14,
    margin: 14,
    borderRadius: 8,
    paddingTop: 22,
    paddingBottom: 40,
    zIndex: 99,
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 18,
    color: '#ffe8d3',
    marginBottom:8,
  },
  content: {
    flexDirection: 'row',
    alignItems: "center",
  },
  currencySymbol: {
    color: '#DADADA',
    marginRight: 6,
  },
  balance: {
    fontSize: 18,
    color: '#007e80',
  },
  gastos: {
    fontSize: 18,
    color: '#e74c3c',
  },
  ocultar: {
    width: 54,
    height: 22,
    backgroundColor: '#DADADA',
    borderRadius: 8,
  },
});
