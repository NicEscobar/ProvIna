
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Comment from './pages/Comment';
import NewPost from './pages/NewPost';


const Routes = createAppContainer(
    createStackNavigator({
        Login:{
            screen: Login,
            navigationOptions: {
               title: 'Login' ,
               headerTitleAlign: 'center',
               headerShown:false
            },    

        },
        Home:{
            screen: Home,
            navigationOptions: {
               title: 'Home' ,
               headerTitleAlign: 'center',
            },    

        },
        Register:{
            screen: Register,
            navigationOptions: {
               title: 'Cadastro' ,
               headerTitleAlign: 'center'
            },    

        },
        Comment,
        NewPost,   
    },{
        defaultNavigationOptions:{ 
            headerTintColor: '#FFF',
            headerStyle: {
                shadowColor: "#00000000",
                backgroundColor: '#181818',
                elevation: 0,
                shadowOpacity: 0
            },


        },
    },)
);

export default Routes;