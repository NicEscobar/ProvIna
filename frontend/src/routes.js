
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import SendFile from './pages/SendFile';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/Login' exact component={Login}/>
                <Route path='/Resgister' exact component={Register}/>
                <Route path='/SendFile' exact component={SendFile}/>
                <Route path='/Post' exact component={Post}/>
                <Route path='/' exact component={Home}/>
            </Switch>
        </BrowserRouter>
    );
}