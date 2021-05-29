import { React, useState, useEffect} from 'react';

import { Link, useHistory } from "react-router-dom";
import api from '../api/api'

import "../assets/css/components/card.css";

const Login = () => {

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function Logar(){

    const login = await api.post('/Login',{
  
      Email: email,
      Senha: senha
  
    });

    if(login.data.auth === true){
      localStorage.setItem("Token", login.data.token);
      history.push('/');
    }
    
  }

  return (
    <main>
      <section className="container flex flex--center">
        <article className="card">
          <form className="menu-form">
            <ul>
              <li>
                <label>Email </label>
              </li>
              <li>
                <input className="mytext"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@email.com"
                  value = {email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </li>
              <li>
                <label>Senha </label>
              </li>
              <li>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  value = {senha}
                  onChange={(e) => setSenha(e.target.value)}
                ></input>
              </li>
              <li>
              <Link to="/register">
                  <h3>Não possui conta? Clique aqui para cadastrar!</h3>
                </Link>
              </li>
              <li>
                <button onClick= {Logar} className="menu-item menu-item--green">
                  ENTRAR
                </button> 
              </li>              
            </ul>
            <Link></Link>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Login;

/*
<Link to="/login" className="menu-item menu-item--green">
                  <h3>Entrar</h3>
                </Link>
*/