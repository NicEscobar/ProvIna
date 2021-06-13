import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, TextInput } from "react-native";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { Avatar } from "react-native-elements/dist/avatar/Avatar";

import api from "../api/api";

export default function Upload({ navigation }) {
  
  const [avatar, setAvatar] = useState();

  const [nomeArquivo, setNomeArquivo] = useState('');
  const [categoria, setCategoria] = useState('');

  const { IdAluno } = navigation.state.params;

  async function imagePickerCall() {
    
    if (Constants.platform.ios) {
       
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        alert("Nós precisamos dessa permissão.");
        return;
      }
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All
    });

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setAvatar(data);
  }

  async function EnviarArquivo() {

    console.log("avatar", avatar.uri)

    
    try {

      await api.post('/arquivo', {

        headers: {
          'Authorization': '',
          'Content-type': 'application/json'
        },

        Data: avatar.uri,
        NomeArquivo: nomeArquivo,
        Categoria: categoria,
        IdAluno_Arquivos: IdAluno

      });

    } catch (error) {
      console.error(error);
    }
  }

  async function uploadImage() {

    console.log("avatar", avatar.uri)
    //await Axios.post("http://localhost:3333/files", data);
  }

  return (
    <View style={styles.container}>
      <View >
                <TextInput
                   style={styles.BoxInput}
                   placeholder="Nome do Arquivo" 
                   placeholderTextColor="#454545"
                   onChangeText={setNomeArquivo} >          

                </TextInput>
    
                <TextInput
                   style={styles.BoxInput}
                   placeholder="Categoria" 
                   placeholderTextColor="#454545"
                   onChangeText={setCategoria}>                  
                </TextInput>
            </View>
      <Image
        source={{
          uri: avatar
            ? avatar.uri
            : "https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png"
        }}
        style={styles.avatar}
      />

      <TouchableOpacity style={styles.button} onPress={imagePickerCall}>
        <Text style={styles.buttonText}>Escolher imagem</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={EnviarArquivo}>
        <Text style={styles.buttonText}>Enviar imagem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 8,
    justifyContent: 'center',
    backgroundColor: '#181818',
    alignItems: "center"
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 3,
    backgroundColor: "#7159c1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  buttonText: {
    color: "#fff"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  BoxInput: {
        
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(187,134,252)',
    margin: 20,
    textAlign:'center',
    color: 'white',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 40,
    marginVertical: 20,
},
});