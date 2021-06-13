import React from 'react';
import {StyleSheet, Text, View, Button,SafeAreaView, TextInput} from  'react-native';
import api from '../api/api';


function Register({navigation}){

    const [nome, nomeText] = React.useState('Nome');
    const [email, emailText] = React.useState('E-mail');
    const [senha, senhaText] = React.useState('Senha');

    async function Cadastrar(){
    
        const cadastro = await api.post('/Cadastro',{
      
          Nome: nome,
          Email: email,
          Senha: senha,
          
        });

        if (cadastro.data.FLAG === 0) {
            navigation.navigate('Login');
          }
          
          else console.log("nao entrou")
        
    }

    return (
        <SafeAreaView style={styles.container}>

        <View >
            <TextInput
               style={styles.BoxInput}
               placeholder="Nome" 
               placeholderTextColor="#454545"
               onChangeText={nomeText}>
                               
            </TextInput>

            <TextInput
               style={styles.BoxInput}
               placeholder="Email" 
               placeholderTextColor="#454545"
               onChangeText={emailText}>
                                 
            </TextInput>

            <TextInput
               style={styles.BoxInput}
               placeholder="Senha" 
               placeholderTextColor="#454545"
               onChangeText={senhaText}>
                              
            </TextInput>
        </View>

        <View style={styles.ButtonCadastro}>
            <Button 
            onPress={()=> { Cadastrar()}}
            title="CADASTRAR"
            type="outline"
            color="(255, 255, 255, 0)"
            accessibilityLabel="Learn more about this purple button"
            />
        </View>
        
</SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      elevation: 8,
      justifyContent: 'center',
      backgroundColor: '#181818'
    },
    ButtonCadastro: {
        borderWidth: 2,
        borderColor: '#03DAC6',
        color: 'transparent',
        justifyContent: 'center',
        marginHorizontal: 80,
        marginVertical: 20,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    BoxInput: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'rgb(187,134,252)',
        margin: '20',
        textAlign:'center',
        backgroundColor: 'none',
        color: 'white',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginHorizontal: 40,
        marginVertical: 20,
    }
})
export default Register                   ;