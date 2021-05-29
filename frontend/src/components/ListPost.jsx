import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
//import { find } from '../api/api'
import api from '../api/api'


const ListPost = ( { url } ) => { 

const [posts, setPosts] = useState([])
const [token, setToken] = useState([]);

useEffect(() => {
  
  setToken(localStorage.getItem('Token'));

  async function SQL_BuscarTodosArquivos(){

    const RespArquivos = await api.get('/arquivoTodos',{
      headers:{'Authorization': token}
    });
   
    setPosts(RespArquivos.data);
    console.log("teset",RespArquivos.data)
  }
  
  SQL_BuscarTodosArquivos();
  
  //find(url, setPosts)


}, [token, url])

  return(
    <section className="posts container">
      { 
       posts.map((post)=> (
         <Link className={`card-post card-post--${post.Categoria}`} to={`/posts/${post.IdArquivos}`}>
           <article key={post.IdArquivos}>
              <h3 className="card-post__title">
                {post.NomeArquivo}
              </h3>
              <p className="card-post__meta">{post.DataCriacao}</p>
           </article> 
         </Link>
       ))
       
      }
    </section>
  )
}

export default ListPost