import React, { useEffect, useState } from "react";
//import { find } from "../api/api";
import { useParams } from "react-router-dom";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from '../api/api'

const Post = () => {
  
  const { id } = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    
    async function BuscarArquivo(){
      
      const arquivoId = await api.get('/arquivo/' + id,{});
     
      setPost(arquivoId.data[0]);
     
    
    }
    BuscarArquivo();
    //find(`/posts/${id}`, setPost);

  
    console.log("arquivoId",post)
  }, [id]);

  return (
    <main>
      <div className="container flex flex--center">
        <article className="card post">
          <h1 className="card__title">{post.NomeArquivo} - {post.NomeAluno}</h1>
          <p className="card__text">{post.Body}</p>
          
          <button className="menu-item menu-item--purple">
              <FontAwesomeIcon icon={faFileDownload} /> BAIXAR 
          </button>
        </article>
      </div>
      <div className="container flex flex--center">
      <article className="card post">
      <h2 className="card__title">Escrever comentário</h2>
      <form>
        <textarea id="textarea" name="textarea" rows="4" cols="50">
        </textarea>
        <button className="menu-item menu-item--purple"> Enviar </button>
      </form>

      </article>
      </div>
      
    </main>
  );
};

export default Post;
