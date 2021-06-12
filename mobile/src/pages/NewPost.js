import React, { useState, useEffect } from "react";
import {StyleSheet, Text, View,SafeAreaView, TouchableOpacity, Image,Linking } from  'react-native';

import api from '../api/api';

function NewPost({ navigation }){

    const { IdAluno}  = navigation.state.params;

    const [nomeArquivo, setNomeArquivo] = useState('');
    const [categoria, setCategoria] = useState('');

    const [selectedFile, setSelectedFile] = useState('');
    const [previewSource, setPreviewSource] = useState();
    const [fileInputState, setFileInputState] = useState('');

    const handleSubmitFile = (e) => {
        e.preventDefault();
    
        if (!previewSource) return;
        EnviarArquivo(previewSource);
    }



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


    return <View />
}

export default NewPost;