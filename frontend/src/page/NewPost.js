import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Dropzone from "react-dropzone";
import api from '../api/api';
import Header from "../components/Header";

import "./NewPost.css";


const NewPost = () => {

  const history = useHistory();
  const [token, setToken] = useState([]);
  const [idAluno, setIdAluno] = useState([]);

  const [nomeArquivo, setNomeArquivo] = useState('');
  const [categoria, setCategoria] = useState('');
 
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState('');
  
  const handleFileInputChance = (e) => {
      
      const file = e.target.files[0];
      
      previewFile(file);

  }
  const previewFile = (file) => {
      const reader = new FileReader();

     // console.log("file",file)
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      } 
  }

  const handleSubmitFile  = (e) => {
    e.preventDefault();
    if(!previewSource) return;
    EnviarArquivo(previewSource);
  }

  async function EnviarArquivo(base64EncodedImage){

    try {
      
      setToken(localStorage.getItem('Token'));
      setIdAluno(localStorage.getItem('IdAluno'));
    
      await api.post('/arquivo',{
    
        headers:{
          'Authorization': token,
          'Content-type': 'application/json'
        },
  
          Data: base64EncodedImage,
          NomeArquivo: nomeArquivo,
          Categoria: categoria,
          IdAluno_Arquivos: idAluno
      
      }); 
      
      history.push('/');

    } catch (error) {
      console.error(error);
    }
    const history = useHistory();
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [nameCategory, setNameCategory] = useState("prova");
    
    function getFile(acceptedFile) {
      acceptedFile.preview = URL.createObjectURL(acceptedFile);
      setFile(acceptedFile);
    }    
    
  }

  return (
    <main>
    <section className="container flex flex--center">
      <article className="card ">
        <form className="menu-form">
          <div className="card flex flex--center">
            
            <input type="file" 
                    name = "image"
                    className="form-input"
                    onChange={handleFileInputChance}
                    value={fileInputState}>         
            </input>
      
          </div>
          {
            previewSource && 
            (
              <img src={previewSource} alt="Arquivo" style={{height: '200px', width: '200px'} }/>
            )
          }
          <ul>
            <li>
              <label>Nome do Arquivo</label>
            </li>
            <li>
              <input
                className="fileName"
                data-cy="nomeArquivo"
                type="text"
                id="fileName"
                name="fileName"
                value={nomeArquivo}
                onChange={(e) => setNomeArquivo(e.target.value)}
                placeholder="Prova 1"
              ></input>
            </li>
            <li>
              <label>Categoria</label>
            </li>
            <li>
              <input
                className="fileCategoria"
                type="text"
                data-cy="categoriaArquivo"
                id="fileCategoria"
                name="fileCategoria"
                placeholder="Cálculo"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              ></input>
            </li>
            <li>
              <button 
                onClick= {handleSubmitFile} 
                className="menu-item menu-item--green"
                data-cy="btn-enviar">
                ENVIAR
              </button>
            </li>
          </ul>
        </form>
      </article>
    </section>
  </main>
  );
};

export default NewPost;
