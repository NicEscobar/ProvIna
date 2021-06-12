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
                   onChangeText={loginText}>                  
                </TextInput>
    
                <TextInput
                   style={styles.BoxInput}
                   placeholder="Senha" 
                   placeholderTextColor="#FFF"
                   onChangeText={senhaText}>                  
                </TextInput>
            </View>

            <View style={styles.Buttonlogin}>
                <Button 
                onPress={()=> { navigation.navigate('Home')}}
                title="LOGIN"
                size="sm"
                type="outline"
                color="transparent"
                />
            </View>
            <View style={styles.Buttonlogin}>
                <Button 
                onPress={()=> { navigation.navigate('Register')}}
                title="CADASTRAR"
                type="outline"
                color="transparent"
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

export default Login;