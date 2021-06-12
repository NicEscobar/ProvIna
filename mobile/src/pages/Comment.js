import React, { useState, useEffect } from "react";
import {StyleSheet, Text, View,SafeAreaView, TouchableOpacity, Image,Linking } from  'react-native';
import { set } from "react-native-reanimated";

import api from '../api/api';

function Comment({ navigation }){

    const [post, setPost] = useState([]);

    const { IdArquivos, IdAluno}  = navigation.state.params;
    
    const [comentario, setComentario] = useState('');
    const [todosComentarios, setTodosComentarios] = useState([]);

    async function SalvarComentario() {

        await api.post('/Comentario', {
    
          Texto: comentario,
          IdAluno: IdAluno,
          IdArquivo: IdArquivos
    
        });
      }
      
    useEffect(() => {
    
        async function BuscarArquivo() {
          const respArquivo = await api.get('/arquivo/' + IdArquivos, {});
          setPost(respArquivo.data[0]);
        }
    
        async function BuscarComentarios() {
    
          const respComent = await api.get('/Comentario/' + IdArquivos, {});
    
          setTodosComentarios(respComent.data);
        }
        
        BuscarArquivo();
        BuscarComentarios();

      }, [comentario, post.URLs]);



    return <View /> 
}

export default Comment;