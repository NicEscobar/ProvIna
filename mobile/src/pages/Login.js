import React from 'react';
import {StyleSheet, Text, View, Button,SafeAreaView, TextInput} from  'react-native';


function Login({ navigation }){

    const [login, loginText] = React.useState('E-mail');
    const [senha, senhaText] = React.useState('Senha');
    

    return (

        <SafeAreaView style={styles.container}>

            <View >
                <TextInput
                   style={styles.BoxInput}
                   placeholder="Email" 
                   placeholderTextColor="#FFF"
                   onChangeText={loginText}
                   value={login}>                  
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
                
                title="ENTRAR"
                size="sm"
                type="outline"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                />
            </View>
            <View style={styles.Buttonlogin}>
                <Button 
                onPress={()=> { navigation.navigate('Register')}}
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

export default Login;