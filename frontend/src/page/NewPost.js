import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setToken(localStorage.getItem('Token'));
    setIdAluno(localStorage.getItem('IdAluno'));
    console.log("idAluno", idAluno)
  }, [idAluno]);

  const handleFileInputChance = (e) => {

    const file = e.target.files[0];

    previewFile(file);

  }
  const previewFile = (file) => {

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  const handleSubmitFile = (e) => {
    e.preventDefault();

    if (!previewSource) return;
    EnviarArquivo(previewSource);
  }

  async function EnviarArquivo(base64EncodedImage) {

    try {

      await api.post('/arquivo', {

        headers: {
          'Authorization': token,
          'Content-type': 'application/json'
        },

        Data: base64EncodedImage,
        NomeArquivo: nomeArquivo,
        Categoria: categoria,
        IdAluno_Arquivos: idAluno

      });

    } catch (error) {
      console.error(error);
    }



  }

  return (
    <div className="new-post-page">
      <Header />
      <form>


        <div className="choose-file">
          <div className="new-file">
            <label class="custom-file-input" for="Upload" >
              <i className="fas fa-file-import" for="Upload" />
            </label>
            <input
              id="Upload"
              class="custom-file-input"
              type="file"
              name="image"
              className="form-input"
              onChange={handleFileInputChance}
              value={fileInputState}>
            </input>
            <label for="files" class="btn">Select File</label>
            {
              previewSource &&
              (
                <img src={previewSource} alt="Arquivo"/>
              )
            }

          </div>

        </div>

        <div className="choose-name">
          <label>Nome do Arquivo</label>


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


          <label>Categoria</label>


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


          <button
            onClick={handleSubmitFile}
            className="menu-item menu-item--green"
            data-cy="btn-enviar">
            ENVIAR
            </button>


        </div>
      </form>
    </div>
  );
};

export default NewPost;
