import React, { useState, useRef } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard} from 'react-native';
import { getAppInfo } from 'react-native/Libraries/LogBox/Data/LogBoxData';
import api from './src/services/api';

export default function App(){
  const [zipCode, setZipCode] = useState('');
  const inputRef = useRef(null);
  const [zipCodeUser, setZipCodeUser] = useState(null);

  async function find() {
    if(zipCode == ''){
      alert('Digite um cep valido');
      zipCode('');
      return;
    }

    try{
      const response = await api.get(`/${zipCode}/json/`);
      console.log(response.data)
      setCepUser(response.data)
      Keyboard.dismiss();
    } catch(error){
      console.log('ERRO: ' + error);
    }

  }

  function clean() {
    setZipCode('')
    setZipCodeUser(null)
    inputRef.current.focus();
    
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. 79003241"
          value={zipCode} 
          onChangeText={ (text) => setZipCodeUser(text) }
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#1d75cd' }]} onPress={ find }>
            <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#cd3e1d' }]} onPress={ clean }>
            <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>

    { zipCodeUser &&
      <View style={styles.result}>
        <Text style={styles.itemText}>CEP: {zipCodeUser.cep}</Text>
        <Text style={styles.itemText}>Logradouro: {zipCodeUser.logradouro}</Text>
        <Text style={styles.itemText}>Bairro: {zipCodeUser.bairro}</Text>
        <Text style={styles.itemText}>Cidade: {zipCodeUser.localidade}</Text>
        <Text style={styles.itemText}>Estado: {zipCodeUser.uf}</Text>
      </View>
    }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF'
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 22
  }
});