/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/iframe-has-title */
import {React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api, { STORAGE_URL } from '../api/api';
import Header from "../components/Header";
import LogoPdF from "../assets/img/pdf.png";


import "./Home.css";

const Home = ({ url }) => {

  const cloudinaryUrl = 'https://res.cloudinary.com/provina/image/upload/';
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState([]);
  const [IdAluno, setIdAluno] = useState([]);
  const [curtida, setCurtida] = useState(0);


  useEffect(() => {

    setToken(localStorage.getItem('Token'));
    setIdAluno(localStorage.getItem('IdAluno'));

    async function SQL_BuscarTodosArquivos() {

      const RespArquivos = await api.get('/arquivoTodos', {
        headers: { 'Authorization': token }
      });

      setPosts(RespArquivos.data);
    }

    SQL_BuscarTodosArquivos();

  }, [IdAluno, token])

  //const handleToggleFavorite = () => {setCurtida((previous) => !previous)};

  return (
    <div className="home-page">
      <Header />

      <ul>
        {posts.map((post) => {
          console.log(post);
          return (
            <li key={post.IdArquivos}>
              
              <div className="card-body">
                {
                  post.Tipo === 'pdf' ? <img src={LogoPdF} alt="Pdf" /> :
                  <img src={cloudinaryUrl + post.URLs} alt={post.NomeArquivo} />
           
                }

                <div className="description">
                  <h1>{post.NomeArquivo}</h1>
                  <p>{post.Categoria || "sem categoria"}</p>
                </div>
              </div>
              <div className="card-footer">
                <div className="icons">

                  <Link to={`/posts/${post.IdArquivos}/comentario`}>
                    <i className="fas fa-comments" />
                    <label>totalComents</label>

                  </Link>
                  <a href={cloudinaryUrl + "/fl_attachment/" +post.URLs}>
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
        <Link to="/posts/new">
          <i className="fas fa-plus-circle" />
        </Link>
      </div>
    </div>
  );
}

export default Home;

/*
<Link onClick={handleToggleFavorite}>
<i className={curtida ? "fas fa-heart" : "far fa-heart"} id={post.IdArquivos}></i>
<label>Curtidas</label>
</Link>*/