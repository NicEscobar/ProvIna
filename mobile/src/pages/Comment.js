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
  ScrollView,
} from "react-native";
import { set } from "react-native-reanimated";

import api from "../api/api";

function Comment({ navigation }) {
  const [post, setPost] = useState([]);

  const { IdArquivos, IdAluno, Url } = navigation.state.params;
  const cloudinaryUrl = 'https://res.cloudinary.com/provina/image/upload/';
  const [comentario, setComentario] = useState("");
  const [todosComentarios, setTodosComentarios] = useState([]); 
 
  async function BuscarArquivo() {
    const respArquivo = await api.get("/arquivo/" + IdArquivos, {});
    setPost(respArquivo.data[0]);
  }

  async function BuscarComentarios() {
    const respComent = await api.get("/Comentario/" + IdArquivos, {});

    setTodosComentarios(respComent.data);
  }
  useEffect(() => {

  },[comentario,todosComentarios,post]);
  
  useEffect(() => {
    BuscarArquivo();
    BuscarComentarios();
  }, []);

  async function SalvarComentario() {
    await api.post("/Comentario", {
      Texto: comentario,
      IdAluno: IdAluno,
      IdArquivo: IdArquivos,
    });
    BuscarComentarios();
  }

  return (
    <ScrollView style={styles.commentPage}>
      <Card containerStyle={styles.cardBox}>
        <View style={styles.createCommentHeader}>
          <Image
                      style={styles.postImage}
                      resizeMode="cover"
                      source={{uri: cloudinaryUrl + Url }}
                    />
        </View>
        <View style={styles.createCommentBody}>
          <TextInput
            style={styles.createCommentInput}
            multiline
            placeholder="Deixe o seu comentário aqui"
            placeholderTextColor="#454545" 
            numberOfLines={4}
            value={comentario}
            onChangeText={setComentario}
          ></TextInput>
        </View>
        <View style={styles.createCommentFooter}>
          <Button 
            onPress={SalvarComentario} 
            title="Enviar"
            size="sm"
            type="outline"
            color="(255, 255, 255, 0)"
          ></Button>
        </View>
      </Card>

      {todosComentarios.map((coment) => {
        return (
          <Card containerStyle={styles.cardBox}>
            <View style={styles.commentHeader}></View>
              <View >
                <View style={styles.commentBody}>
                  <Text style={styles.titles}> {coment.Texto} </Text> 
                </View> 
                <View style={styles.commentName} >
                  <Text style={styles.titles}> {coment.Nome} </Text> 
                  <Text style={styles.titles}> {coment.DataPostagem} </Text>   
                </View>    
              </View>
            <View style={styles.commentFooter}></View>
          </Card>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  commentPage: {
    flex: 1,
    backgroundColor: "#000",
    textAlign: "center",
  },
  cardBox: {
    borderRadius: 4,
    borderColor: "#00000000",
    backgroundColor: "rgb(18,18,18)",
    padding: 0,
    //width: 500,
    //height: 150,
    //width: "100%",
    alignItems: "center",
  },
  createCommentHeader: {
    flex: 1,
    padding: 2,
    marginRight: 5,
  },
  createCommentBody: {
    flex: 1,
    width: "100%",
    padding: 0,
    margin: 2,
  },
  createCommentFooter: {
    flex: 1,
    padding: 10,
  },
  createCommentInput: {
    borderRadius: 4,
    backgroundColor: "#000",
    borderColor: "#00000000",
    color: "#fff",
  },
  titles: {
    fontSize: 30,
    color: "#fff",
  },
  postImage: {
    width: 200,
    height: 150,
    borderRadius: 2,
  },
  commentName: {
    fontSize: 5,
    color: "#fff",
  },
});

export default Comment;
