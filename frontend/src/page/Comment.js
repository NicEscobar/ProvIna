import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../api/api';
import Header from "../components/Header";

import "./Comment.css";

const Comment = () => {
  
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const [comentario, setComentario] = useState('');
  const [todosComentarios, setTodosComentarios] = useState([]);

  

  async function SalvarComentario(){
      
    api.post('/Comentario',{

      Texto: comentario,  
      IdAluno: post.IdAluno_Arquivos,
      IdArquivo: id

    }); 
  }

  useEffect(() => {
    
    async function BuscarArquivo(){
      
      const arquivoId = await api.get('/arquivo/' + id,{});
      
      setPost(arquivoId.data[0]); 
    }

    async function BuscarComentarios(){
      
      const comentarios = await api.get('/Comentario/' + id,{});
     
      setTodosComentarios(comentarios.data); 
    }

    BuscarArquivo();
    BuscarComentarios();

    console.log("url", post.URLs)

  }, [comentario, id]);

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
          </li>
          <div className="send-button">
            <button  onClick= {SalvarComentario} >Enviar</button>
          </div>
        </ul>
      </div>

      <ul>
        {todosComentarios.map((coment) => {
          return (
            <li key={coment.id}>
              <div className="card-body">
                <div className="description">
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
