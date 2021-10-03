import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Clipboard, Keyboard, TouchableWithoutFeedback } from 'react-native';

//https://cutt.ly/api/api.php?key=[API_KEY]&short=[URL_YOU_WANT_SHORTEN]&name=[CUSTOM_URL_ALIAS]

export default function App() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [urlFinal,setUrlFinal] = useState('');

  const short = async () => {
    if(url.includes('https://') || url.includes('http://')){
      await fetch(`https://cutt.ly/api/api.php?key=461b1596eca2c4950e985981f7f1fbbd&short=${url}&name=${name}}`)
      .then(async response => {
        const data = await response.json();

        if(data.url.status === 6)
        {
          alert('O link fornecido é de um domínio bloqueado');
          return;
        }

        else if(data.url.status === 4)
        {
          alert('Chave da API está inválida');
          return;
        }

        else if(data.url.status === 3)
        {
          alert('Esse nome já esta em uso');
          return;
        }

        else if(data.url.status == 2) 
        {
          alert('Url inválida');
          return;
        }
  
        else if(data.url.status == 1) 
        {
          alert('O link encurtado vem do domínio que encurta o link, ou seja, o link já foi encurtado');
          return;
        }

        console.log(data);

        setUrlFinal(data.url.shortLink);
        Keyboard.dismiss();
          
      })
    }
  }

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style = {styles.container}>
        
        <Text style = {styles.title}>Url
          <Text style = {{color: '#1076f7'}}>Sujeito</Text>
        </Text>

        <TextInput style = {styles.urlInput} onChangeText = { (texto) =>  setUrl(texto) } value = {url} placeholder = "Digite aqui..."/>
        
        <TextInput style = {styles.urlInput} onChangeText = { (texto) =>  setName(texto) } value = {name} placeholder = "Nome Personalizado"/>
        
        <TouchableOpacity onPress={ () => short() } style = {styles.shortBtn}>
          <Text style = {{ color: '#fff'}}>Encurtar</Text>  
        </TouchableOpacity>

        <Text style = {styles.finalUrl}>{urlFinal}</Text>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    color: '#21243d',
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 20,
  },
  urlInput:{
    height: 50,
    width: '80%',
    borderColor: '#21243d',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fafafa',
    marginBottom: 20,
    fontSize: 20,
  },
  shortBtn: {
    backgroundColor: '#ff7c7c',
    borderRadius: 20,
    height: 40,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  finalUrl: {
    height: 40,
    width: '80%',
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center'
  }

});
