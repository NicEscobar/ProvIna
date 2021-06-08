import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../api/api';
import Header from "../components/Header";

import "./Comment.css";

const Comment = () => {

  const { IdArquivos } = useParams();

  const [post, setPost] = useState([]);

  const [idAluno, setidAluno] = useState('');
  const [comentario, setComentario] = useState('');
  const [todosComentarios, setTodosComentarios] = useState([]);

  async function SalvarComentario() {

    await api.post('/Comentario', {

      Texto: comentario,
      IdAluno: idAluno,
      IdArquivo: IdArquivos

    });
  }

  useEffect(() => {

    setidAluno(localStorage.getItem('IdAluno'));

    async function BuscarArquivo() {
      const arquivoId = await api.get('/arquivo/' + IdArquivos, {});
      setPost(arquivoId.data[0]);
    }

    async function BuscarComentarios() {

      const comentarios = await api.get('/Comentario/' + IdArquivos, {});

      setTodosComentarios(comentarios.data);
    }

    BuscarArquivo();
    BuscarComentarios();

  }, [IdArquivos, comentario, post.URLs]);

  return (
    <div className="comment-page">
      <Header />
      <div className="card-body">
        <ul>
          <li>
            <textarea       
              placeholder="Insira um comentário"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
            <div className="send-button">
              <button onClick={SalvarComentario} >Enviar</button>
            </div>
          </li>

        </ul>
      </div>

      <ul>
        {todosComentarios.map((coment) => {
          return (
            <li key={coment.IdComentario}>
              <div className="card-body">
                <div className="description">
                  <div className="description-header"></div>
                  <h1>{coment.Nome}</h1>
                  <p className="publicationDate">{coment.DataPostagem}</p>
                  <p>{coment.Texto}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Comment;
