import React, { useState, useEffect } from "react";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { set } from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";


import api from '../api/api';

function NewPost({ navigation }) {
  const { IdAluno } = navigation.state.params;

  const [nomeArquivo, setNomeArquivo] = useState("");
  const [categoria, setCategoria] = useState("");

  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState("");

                               
    async function EnviarArquivo(base64EncodedImage) {

        try {
    
          await api.post('/arquivo', {
    
            headers: {
              'Authorization': '',
              'Content-type': 'application/json'
            },
    
            Data: base64EncodedImage,
            NomeArquivo: nomeArquivo,
            Categoria: categoria,
            IdAluno_Arquivos: IdAluno
    
          });
    
        } catch (error) {
          console.error(error);
        } 
    
    }

  return (
    <View style={styles.newPostPage}>
      <Card containerStyle={styles.cardBox}>
        <View style={styles.newPostHeader}>
          <Text style={styles.titles}>Nova Postagem</Text>
        </View>
        <View style={styles.newPostBody}>
          <View style={styles.sendFileButton}>
            <TouchableOpacity
              onPress={() => {
              }}
            >
              <FontAwesome
                name="download"
                size={90}
                style={styles.btnNewItemDesign}
                color= "#FFF"
              ></FontAwesome>
              <Text style={styles.titles}>Selecione o Arquivo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.newPostFooter}>
          <Button title="Enviar"></Button>
        </View>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  newPostPage: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#000",
  },
  cardBox: {
    borderRadius: 4,
    borderColor: "trasparent",
    backgroundColor: "rgb(18,18,18)",
    padding: 0,
  },
  newPostHeader: {
    flex: 1,
    alignItems: "center",
    padding: 5,
  },
  sendFileButton: {
    backgroundColor: "#000",
  },
  newPostBody: {
    flex: 2,
    padding: 5,
  },
  newPostFooter: {
    flex: 1,
    alignItems: "flex-end",
    padding: 5,
  },
  titles: {
    fontSize: 30,
    color: "#fff",
  },
});

export default NewPost;
