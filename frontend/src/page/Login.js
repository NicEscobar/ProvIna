import { React, useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import api from '../api/api';

import "./Login.css";

const Login = () => {

    const history = useHistory();
  
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
  
    const Logar  = (e) => {
      e.preventDefault();
      LogarAluno();
  
    }

    useEffect(() => {

      localStorage.clear();
    },[]);

    async function LogarAluno(){
      
      
      const login = await api.post('/Login',{
    
        Email: email,
        Senha: senha
    
      });
  
      console.log("login.data.auth",login.data.auth)
      if(login.data.auth === true){
        localStorage.setItem("Token", login.data.token);
        localStorage.setItem("IdAluno", login.data.IdAluno);
        history.push('/posts');
      }
      
    }
    return(
        <div className="login-page">
      <form className="box">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit"
              onClick= {Logar}  >Login</button>
        <p>
        Ainda não é cadastrado? <Link to="/register">Clique aqui</Link> para se
        cadastrar
      </p>
      </form>  
    </div>



    );
};

export default Login;