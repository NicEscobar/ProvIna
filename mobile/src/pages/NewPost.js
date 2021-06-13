import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, TextInput,Button } from "react-native";

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

  async function limparPag() {}

  async function imagePickerCall() {
    
    if (Constants.platform.ios) {
       
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY);

      if (status !== "granted") { alert("Nós precisamos dessa permissão.");
        return;
      }
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true
    });
    console.log(data);

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setAvatar(data);
  }

  async function EnviarArquivo() {

    try {

     await api.post('/arquivo', {

        headers: {
          'Authorization': '',
          'Content-type': 'application/json'
        },

        Data: `data:image/jpg;base64,${avatar.base64}`,
        NomeArquivo: nomeArquivo,
        Categoria: categoria,
        IdAluno_Arquivos: IdAluno

      });

      navigation.navigate('Home',{IdAluno: IdAluno})

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    
    
  }, [avatar, nomeArquivo,categoria]);

  return (
    <View style={styles.container}>
      
      <View >
            <Image
              source={{
                uri: avatar
                  ? avatar.uri
                  : "https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png"
              }}
              style={styles.avatar}
            />
             </View>
             <View style={styles.buttonArquivo}>
                <Button 
                    onPress={()=> {imagePickerCall()}}
                    title="Escolher Arquivo"
                    size="sm"
                    type="outline"
                    color="(255, 255, 255, 0)"
                />
            </View>
            <View >
                <TextInput
                   style={styles.BoxInput}
                   placeholder="Nome do Arquivo" 
                   placeholderTextColor="#454545"
                   onChangeText={setNomeArquivo}
                   value={nomeArquivo} >          

                </TextInput>
    
                <TextInput
                   style={styles.BoxInput}
                   placeholder="Categoria" 
                   placeholderTextColor="#454545"
                   onChangeText={setCategoria}
                   value={categoria}>                  
                </TextInput>
            </View>

          

            <View style={styles.buttonText}>
                <Button 
                    onPress={()=> {EnviarArquivo()}}
                    title="Enivar Arquivo"
                    size="sm"
                    type="outline"
                    color="(255, 255, 255, 0)"
                />
            </View>
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
    borderWidth: 2,
    borderColor: '#03DAC6',
    color: "#00000000",
    justifyContent: 'center',
    marginHorizontal: 80,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  buttonArquivo: {
    color: "#00000000",
    justifyContent: 'center',
    marginHorizontal: 80,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 10
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