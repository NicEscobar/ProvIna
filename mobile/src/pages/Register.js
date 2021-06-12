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
               placeholderTextColor="#FFF"
               onChangeText={nomeText}
               value={nome}>                  
            </TextInput>

            <TextInput
               style={styles.BoxInput}
               placeholder="Email" 
               placeholderTextColor="#FFF"
               onChangeText={emailText}
               value={email}>                  
            </TextInput>

            <TextInput
               style={styles.BoxInput}
               placeholder="Senha" 
               placeholderTextColor="#FFF"
               onChangeText={senhaText}
               value={senha}>                  
            </TextInput>
        </View>

        <View style={styles.Buttonlogin}>
            <Button 
            onPress={()=> { Cadastrar()}}
            title="CADASTRAR"
            type="outline"
            color="#841584"
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
      backgroundColor: '#262626'
    },
    Buttonlogin: {
        borderWidth: 2,
        borderColor: '#FFF',
        backgroundColor: '#262626',
        justifyContent: 'center',
        marginHorizontal: 120,
        marginVertical: 20
    },
    BoxInput: {
        borderWidth: 2,
        borderColor: '#FFF',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginHorizontal: 40,
        marginVertical: 20,
    }
})
export default Register                   ;