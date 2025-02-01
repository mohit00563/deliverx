import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const categories = ['Food', 'Groceries', 'Parcels', 'Medical'];

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Order', { category: item })}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
