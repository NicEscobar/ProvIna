import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { AsyncStorage } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import api from "../api/api";
import { color } from "react-native-elements/dist/helpers";

function Home({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { IdAluno } = navigation.state.params;

  async function SQL_BuscarTodosArquivos() {
    api
      .get("/arquivoTodos", {})
      .then((Response) => {
        setPosts(Response.data);
      })
      .catch((err) => {
        console.log("erro", err);
      });
  }

  useEffect(() => {
    SQL_BuscarTodosArquivos();
    console.log(posts);
  }, []);

  return (
    <View style={styles.homePage}>
      {posts.map((m) => {
        return (
          <Card containerStyle={styles.cardBox}>
            <View>
              <View>
                <View style={styles.cardHeader}>
                  <Image
                    style={styles.postImage}
                    resizeMode="cover"
                    source={{ uri: m.URLs }}
                  />
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{m.NomeArquivo}</Text>
                    <Text style={styles.cardDate}>{m.DataCriacao}</Text>
                    <Text style={styles.cardCategory}>{m.Categoria}</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Comment", {
                        IdArquivos: m.IdArquivos,
                        IdAluno: IdAluno,
                      });
                    }}
                  >
                    <FontAwesome
                      name="comments"
                      size={25}
                      color="#FFF"
                    ></FontAwesome>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Comment");
                    }}
                  >
                    <FontAwesome
                      name="download"
                      size={25}
                      color="#FFF"
                    >onPress={() => {
                      navigation.navigate("Comment");
                    }} </FontAwesome>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card>
        );
      })}
      <View style={styles.btnNewItem}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NewPost",{IdAluno: IdAluno});
          }}
        >
          <FontAwesome name="plus-circle"  size={60} style={styles.btnNewItemDesign}></FontAwesome>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#000",
  },
  btnNewItem: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    zIndex: 10,
  },
  btnNewItemDesign: {
    color: "#FFF",
    zIndex: 10
  },
  cardBox: {
    borderRadius: 4,
    borderColor: "#00000000",
    backgroundColor: "rgb(18,18,18)",
    padding: 0,
  },
  cardTitle: {
    color: "white",
    fontSize: 35,
    marginLeft: 3,
  },
  cardDate: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 3,
  },
  cardCategory: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 3,
  },
  Buttonlogin: {
    // elevation:  8,
    borderRadius: 10,
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  postImage: {
    width: "50%",
    borderRadius: 2,
  },
  parentWrapper: {
    position: "relative",
  },

  cardHeader: {
    flex: 2,
    flexDirection: "row",
  },
  cardBody: {
    flex: 2,
    flexDirection: "column",
  },

  cardFooter: {
    flex: 1,
    margin: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
});

export default Home;
