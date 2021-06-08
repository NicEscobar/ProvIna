import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Comment from "./page/Comment";
import NewPost from "./page/NewPost";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/posts">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/posts/:IdArquivos/comentario">
          <Comment />
        </Route>
        <Route path="/posts/new">
          <NewPost />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
