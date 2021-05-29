import { React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import api from '../api/api'
import { useHistory } from 'react-router-dom';

import "../assets/css/components/card.css";

const Register = () => {

  const history = useHistory();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function CadastrarAluno(){

    const cadastro = await api.post('/Cadastro',{
  
      Nome: nome,
      Senha: email,
      Email: senha,
  
    });

    if (cadastro.data === 0) {
      console.log("cadastrou",cadastro.data)
    }
    else console.log("existe",cadastro.data)
    
    history.push('/login');
  }
     
  return (
    <main>
      <section className="container flex flex--center">
        <article className="card">
          <form className="menu-form">
            <ul>
            <li>
                <label>Nome </label>
              </li>
              <li>
                <input className="mytext"
                  type="text"
                  id="nameText"
                  name="nameText"
                  placeholder="Fulano"
                  value = {nome}
                  onChange={(e) => setNome(e.target.value)}
                ></input>
              </li>
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
              </li>
              <li>
                
                <button onClick= {CadastrarAluno} className="menu-item menu-item--green">
                  CADASTRAR
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

export default Register;

/*
<Link to="/login" className="menu-item menu-item--green">
                  <h3>Cadastrar</h3>
                </Link>
                */