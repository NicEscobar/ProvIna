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

  const { IdArquivos, IdAluno } = navigation.state.params;

  const [comentario, setComentario] = useState("");
  const [todosComentarios, setTodosComentarios] = useState([]);

  async function SalvarComentario() {
    await api.post("/Comentario", {
      Texto: comentario,
      IdAluno: IdAluno,
      IdArquivo: IdArquivos,
    });
  }

  useEffect(() => {
    async function BuscarArquivo() {
      const respArquivo = await api.get("/arquivo/" + IdArquivos, {});
      setPost(respArquivo.data[0]);
    }

    async function BuscarComentarios() {
      const respComent = await api.get("/Comentario/" + IdArquivos, {});

      setTodosComentarios(respComent.data);
    }

    BuscarArquivo();
    BuscarComentarios();
    console.log(comentario);
  }, [comentario, post.URLs]);

  return (
    <ScrollView style={styles.commentPage}>
      <Card containerStyle={styles.cardBox}>
        <View style={styles.createCommentHeader}>
          <Text style={styles.titles}> Comente ! </Text>
        </View>
        <View style={styles.createCommentBody}>
          <TextInput
            style={styles.createCommentInput}
            multiline
            numberOfLines={4}
            value={comentario}
            onChangeText={setComentario}
          ></TextInput>
        </View>
        <View style={styles.createCommentFooter}>
          <Button onPress={SalvarComentario} title="Enviar"></Button>
        </View>
      </Card>

      
      {todosComentarios.map((coment) => {
        return (
          <Card containerStyle={styles.cardBox}>
            <View style={styles.commentHeader}></View>
            <View style={styles.commentBody}>
            <Text style={styles.titles}> {coment.Texto} </Text>
             
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
    width: 500,
    height: 150,
    width: "100%",
    alignItems: "center",
  },
  createCommentHeader: {
    flex: 1,
    padding: 2,
  },
  createCommentBody: {
    flex: 2,
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
});

export default Comment;
