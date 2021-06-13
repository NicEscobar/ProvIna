import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { AsyncStorage } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import api from "../api/api";
import { color } from "react-native-elements/dist/helpers";

function Home({ navigation }) {
  const cloudinaryUrl = "https://res.cloudinary.com/provina/image/upload/";
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
    
  }, [posts]);

  return (
    <View style={styles.homePage}>
      <View style={styles.Buttonlogin}>
        <Button
          onPress={() => {
            navigation.navigate("NewPost", { IdAluno: IdAluno });
          }}
          title="Enviar Arquivo"
          size="sm"
          type="outline"
          color="(255, 255, 255, 0)"
        />
      </View>

      <ScrollView>
        {posts.map((m) => {
          return (
            <Card containerStyle={styles.cardBox}>
              <View style={styles.cardDesign}>
                <View style={styles.cardHeader}>
                  <Image
                    style={styles.postImage}
                    resizeMode="cover"
                    source={{ uri: cloudinaryUrl + m.URLs }}
                  />
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{m.NomeArquivo}</Text>
                    <Text style={styles.cardDate}>{m.DataCriacao}</Text>
                    <Text style={styles.cardCategory}>{m.Categoria}</Text>
                    <View style={styles.cardFooter}>
                      <View style={styles.actionButton}>
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
                            size={30}
                            color="#FFF"
                          ></FontAwesome>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.actionButton}>
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(
                              cloudinaryUrl + "/fl_attachment/" + m.URLs
                            )
                          }
                        >
                          <FontAwesome name="download" size={25} color="#FFF">
                            {" "}
                          </FontAwesome>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: "#000",
  },
  cardBox: {
    zIndex: 10,
    borderRadius: 4,
    borderColor: "#00000000",
    backgroundColor: "rgb(18,18,18)",
    padding: 0,
    margin: 0,
    width: 400,
    height: 200,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
  },
  cardBody: {
    flex: 1,
    //flexDirection: "column",
  },
  cardFooter: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  actionButton: {
    marginLeft: 10,
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
  postImage: {
    width: 200,
    height: 190,
    borderRadius: 2,
  },

  btnNewItemDesign: {
    color: "#FFF",
    zIndex: 10,
  },

  Buttonlogin: {
    borderWidth: 2,
    borderColor: "#03DAC6",
    color: "#00000000",
    justifyContent: "center",
    marginBottom: 10,
  },
  cardIcon: {
    flexDirection: "row",
    marginHorizontal: "60",
    paddingHorizontal: "60"
  },
});

export default Home;
