import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export function MyList() {
  const myListData = [
    { id: 1, title: 'Filme 1' },
    { id: 2, title: 'Filme2' },
    { id: 3, title: 'FIlme 3' },
    // ... outros itens da sua lista
  ];

  const renderItem = ({ item }: { item: { id: number; title: string } }) => {
    return (
      <View style={styles.movieItem}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={myListData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#242A32', // Cor de fundo azul escura
  },
  list: {
    width: '100%',
  },
  movieItem: {
    backgroundColor: '#f9f9f9', // Cor de fundo cinza claro
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0296e5', // Cor da borda azul
  },
});

export default MyList;
