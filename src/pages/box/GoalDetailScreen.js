import React from 'react';
import { View, Text } from 'react-native';

const GoalDetailScreen = ({ route }) => {
  const { title, total, saved } = route.params.goal;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>{title}</Text>
      <Text>Total: {total}</Text>
      <Text>Guardado: {saved}</Text>
    </View>
  );
};

export default GoalDetailScreen;
