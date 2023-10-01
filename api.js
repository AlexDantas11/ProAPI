import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

export const Api = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchDataFromAPI = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`https://api.attackontitanapi.com/titans?name=${inputValue}`);
      setData(response.data.results);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setData([]);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: 'black' }}>
      <Text style={{ color: 'white' }}>Nome da Dupla: [Jose Clebson] e [Alexsandro Oliveira]</Text>
      {loading ? (
        <ActivityIndicator size="large" color="white" style={{ marginTop: 20 }} />
      ) : (
        data && data.length > 0 ? (
          <View style={{ marginTop: 20 }}>
            {data.map((item) => (
              <View key={item.id}>
                <Text style={{ color: 'white' }}>Nome: {item.name}</Text>
                <Text style={{ color: 'white' }}>Altura: {item.height}</Text>
                <Image source={{ uri: item.img }} style={{ width: 100, height: 100 }} />
              </View>
            ))}
          </View>
        ) : (
          <ActivityIndicator size="large" color="white" style={{ marginTop: 20 }} />
        )
      )}
      <TextInput
        placeholder="Digite um valor para consulta"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
        style={{
          color: 'white',
          marginTop: 10,
          width: 200,
          height: 30,
          borderWidth: 1,
          borderColor: 'white',
          padding: 5,
          textAlign: 'center', // Centraliza o texto horizontalmente
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#b81500',
          padding: 10,
          marginTop: 10,
          alignItems: 'center',
          width: 200, // Define a largura do botão
        }}
        onPress={fetchDataFromAPI}
      >
        <Text style={{ color: 'white' }}>Consultar API</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#b81500',
          padding: 10,
          marginTop: 10,
          alignItems: 'center',
          width: 200, // Define a largura do botão
        }}
        onPress={clearData}
      >
        <Text style={{ color: 'white' }}>Limpar Dados</Text>
      </TouchableOpacity>
    </View>
  );
};
