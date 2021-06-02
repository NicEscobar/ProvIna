import { React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import api from '../api/api'
import { useHistory } from 'react-router-dom';

import "./Register.css";


const Register = () => {

  const history = useHistory();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const CadastrarAluno  = (e) => {
    e.preventDefault();
    Cadastrar();

  }
  async function Cadastrar(){

    console.log("nada")
    
    const cadastro = await api.post('/Cadastro',{
  
      Nome: nome,
      Email: email,
      Senha: senha,
      
    });

    console.log("cadastro",cadastro.data.Parametro)

    if (cadastro.data.Parametro === 0) {
      history.push('/');
    }
    
    else console.log("nao entrou")

    
  }
     
  return (
    <div className="register-page">
    <form className="box">
      <h1>Register</h1>
      <input
        data-cy="name"
        type="text"
        placeholder="Username"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        data-cy="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        data-cy="password"
        type="password"
        placeholder="Password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button data-cy="register"
              onClick= {CadastrarAluno}  
              type="submit"> Register
      </button>
    </form>
  </div>
   );
};

export default Register;
