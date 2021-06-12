import React, { useState, useEffect } from "react";
import {StyleSheet, Text, View,SafeAreaView, TouchableOpacity, Image,Linking } from  'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import api from '../api/api';

function Home({ navigation }){

    const [posts, setPosts] = useState([]);
    const [IdAluno, setIdAluno] = useState([]);

    async function SQL_BuscarTodosArquivos() {
    
      api.get('/arquivoTodos', {
       }).then(Response => { setPosts(Response.data); }).catch((err) => {console.log("erro", err)})
       
     }

    useEffect(() => {

      
      SQL_BuscarTodosArquivos();
                  
      }, []);

    useEffect(() => {
    
    }, [posts]);

    return(
      <View>
        {posts.map(m => {  
          console.log("posts", m.IdArquivos);
          return (    
            <Card >
              <Card.Title>{m.NomeArquivo}</Card.Title>
              <Card.Divider/>
              <View >
                <Image
                  style={styles.arquivo}
                  resizeMode="cover"
                  source={{ uri: m.URLs}}
                />
                <Text style={styles.name}>{m.Categoria}</Text>
                <Text style={styles.name}>{m.DataCriacao}</Text>
                <TouchableOpacity 
                    style={styles.addPost} 
                    onPress={()=> { navigation.navigate('Comment',{ IdArquivos: m.IdArquivos })}}>
                        <FontAwesome name="align-justify" 
                          size={20} 
                          color="#FFF">
                          
                        </FontAwesome>
               </TouchableOpacity>
              </View>
            </Card>
        )})}
        <View>
          <TouchableOpacity style={styles.addPost} onPress={()=> { navigation.navigate('NewPost')}}>
            <FontAwesome name="plus-circle" size={20} color="#FFF"></FontAwesome>
          </TouchableOpacity>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      elevation: 8,
      justifyContent: 'center',
      backgroundColor: '#262626'
    },
    Buttonlogin: {
       // elevation:  8,
        borderRadius: 10,
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 40
    },
    addPost:{
      width: 50,
      height: 50,
      backgroundColor: '#000',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      //marginLeft: 60
    },

    arquivo:{
      width: 54,
      height: 54,
    },
    parentWrapper:{
      position: 'relative'
    }

})

export default Home;