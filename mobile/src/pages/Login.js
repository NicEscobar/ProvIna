import React from 'react';
import {StyleSheet, Text, View, Button,SafeAreaView, TextInput} from  'react-native';
import api from '../api/api';



function Login({ navigation }){

    const [email, setEmailText] = React.useState('');
    const [senha, senhaText] = React.useState('');
    

    async function LogarAluno(){
        
      const login = await api.post('/Login',{
      
          Email: email,
          Senha: senha
      
        });

        if(login.data.auth === true){
           navigation.navigate('Home',{IdAluno: login.data.IdAluno})
        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <View >
                <TextInput
                   style={styles.BoxInput}
                   placeholder="Email" 
                   placeholderTextColor="#454545"
                   onChangeText={setEmailText} >          

                </TextInput>
    
                <TextInput
                   style={styles.BoxInput}
                   placeholder="Senha" 
                   placeholderTextColor="#454545"
                   onChangeText={senhaText}>                  
                </TextInput>
            </View>

            <View style={styles.Buttonlogin}>
                <Button 
                    onPress={()=> {LogarAluno()}}
                    title="LOGIN"
                    size="sm"
                    type="outline"
                    color="(255, 255, 255, 0)"
                />
            </View>
            <View style={styles.ButtonCadastro}>
                <Button 
                    onPress={() => {navigation.navigate('Register')}}
                    title="CADASTRAR"
                    size="sm"
                    type="outline"
                    color="(255, 255, 255, 0)"
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
    Buttonlogin: {
        borderWidth: 2,
        borderColor: '#03DAC6',
        color: "#00000000",
        justifyContent: 'center',
        marginHorizontal: 80,
        marginVertical: 20,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    ButtonCadastro: {
        color: "#00000000",
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
        margin: 20,
        textAlign:'center',
        color: 'white',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginHorizontal: 40,
        marginVertical: 20,
    },
})

export default Login;