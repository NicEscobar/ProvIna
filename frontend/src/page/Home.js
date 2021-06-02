import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from '../api/api';
import Header from "../components/Header";



import "./Home.css";

const Home = ({ url }) => {

  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState([]);


  useEffect(() => {

    setToken(localStorage.getItem('Token'));

    async function SQL_BuscarTodosArquivos() {

      const RespArquivos = await api.get('/arquivoTodos', {
        headers: { 'Authorization': token }
      });

      setPosts(RespArquivos.data);
      console.log("arquivos",RespArquivos.data)
    }

    SQL_BuscarTodosArquivos();
    

  }, [token, url])

  return (
    <div className="home-page">
      <Header />

      <ul>
        {posts.map((post) => {
          return (
            <li key={post.IdArquivos}>
              <div className="card-body">
              <img src={post.URLs} alt={post.NomeArquivo}/>
                <div className="description">
                  <h1>{post.NomeArquivo}</h1>
                  <p>{post.Categoria || "sem categoria"}</p>
                </div>
              </div>
              <div className="card-footer">
                <div className="icons">
                  <Link to={`/Comentario/' + ${post.IdArquivos}`}>
                    <i className="fas fa-comments" />
                    <label>totalComents</label>
                  </Link>
                  <a href={post.url} download>
                    <label>Baixar</label>
                    <i className="fas fa-download" />
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="btn-new-item">
        <Link to="/items/new">
          <i className="fas fa-plus-circle" />
          teste
        </Link>
      </div>
    </div>
  );
}

export default Home;